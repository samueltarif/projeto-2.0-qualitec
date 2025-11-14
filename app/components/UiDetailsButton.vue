<template>
  <button
    type="button"
    :class="classes"
    @click="openDetails"
    :aria-label="ariaLabel"
    :title="ariaLabel"
  >
    <slot>{{ label }}</slot>
  </button>

  <!-- Modal de Detalhes do Produto -->
  <ProductDetailsModal
    v-if="product"
    :visible="visible"
    :product="product"
    @close="visible = false"
    @add-cart="onAddCart"
    @download-pdf="onDownloadPdf"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { ref } from 'vue';
import ProductDetailsModal from '~/components/ProductDetailsModal.vue';
import { useCart } from '~/composables/useCart';

interface ProductLike { id?: string|number; part_number?: string; fabricante?: string; categoria?: string; titulo?: string; nome?: string; descricao?: string }

interface Props {
  label?: string;
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
  item?: ProductLike;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Detalhes',
  ariaLabel: 'Ver detalhes',
});

const emit = defineEmits<{ (e: 'click'): void }>();

const classes = [
  'text-blue-600 hover:text-blue-700 dark:text-blue-400',
  'text-sm transition-colors',
  props.class || '',
].join(' ');

const visible = ref(false);
const product = ref<any | null>(null);
const loading = ref(false);
const { add: addCart } = useCart();

async function openDetails() {
  emit('click');
  const id = props.item?.id;
  const part = props.item?.part_number;
  if (id == null && !part) return;
  loading.value = true;
  try {
    const data: any = await $fetch('/api/produtos/details', { params: { id, part_number: part } });
    if (data?.item) {
      product.value = data.item;
      visible.value = true;
    }
  } catch (_) {
    // silencioso
  } finally {
    loading.value = false;
  }
}

function onAddCart(qty: number) {
  if (!product.value) return;
  const p = product.value;
  const id = p.id ?? p.part_number;
  const title = p.titulo ?? p.nome ?? p.descricao ?? p.part_number ?? `Produto ${id ?? ''}`;
  const brand = p.fabricante ?? 'QUALITEC';
  addCart({ id, title, brand, categoria: p.categoria, diametro_montagem: p.diametro_montagem, conexao_instrumento: p.conexao_instrumento, faixa_trabalho: p.faixa_trabalho, unidade_leitura: p.unidade_leitura }, Math.max(1, qty));
}

function onDownloadPdf() {
  try {
    const imgs = product.value?.imagens;
    const parsed = Array.isArray(imgs) ? imgs : (imgs ? JSON.parse(String(imgs)) : []);
    const pdfUrl = Array.isArray(parsed) ? parsed.find((x: any) => typeof x === 'string' && x.toLowerCase().endsWith('.pdf')) : parsed?.pdf;
    if (pdfUrl) {
      window.open(String(pdfUrl), '_blank');
    }
  } catch (_) {
    // ignora
  }
}
</script>

<style scoped>
</style>