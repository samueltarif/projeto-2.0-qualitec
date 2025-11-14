<template>
  <div :class="containerClass">
    <RainbowButton
      v-if="showDetails"
      type="button"
      :class="rainbowClass"
      @click="emitDetails"
      aria-label="Detalhes"
    >
      <span class="i-lucide-info"></span>
      {{ detailsLabel }}
    </RainbowButton>

    <RainbowButton
      v-if="showCompare"
      type="button"
      :class="rainbowClass"
      @click="emitCompare"
      aria-label="Comparar"
    >
      <span class="i-lucide-scale"></span>
      {{ compareLabel }}
    </RainbowButton>

    <RainbowButton
      v-if="showApplications"
      type="button"
      :class="rainbowClass"
      @click="emitApplications"
      aria-label="Aplicações"
    >
      <span class="i-lucide-layers"></span>
      {{ applicationsLabel }}
    </RainbowButton>

    <RainbowButton
      v-if="showTechInfo"
      type="button"
      :class="rainbowClass"
      @click="emitTechInfo"
      aria-label="Info. Técnicas"
    >
      <span class="i-lucide-file-text"></span>
      {{ techInfoLabel }}
    </RainbowButton>

    <RainbowButton
      v-if="showCart"
      type="button"
      :class="rainbowClass"
      @click="emitCart"
      aria-label="Carrinho"
    >
      <span class="i-lucide-shopping-cart"></span>
      {{ cartLabel }}
    </RainbowButton>
  </div>
  <!-- Modal de Detalhes reutilizando o mesmo componente do carrinho -->
  <ProductDetailsModal
    v-if="visible && product"
    :visible="visible"
    :product="product"
    @close="visible = false"
    @add-cart="onAddCart"
    @download-pdf="onDownloadPdf"
  />
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, ref } from 'vue';
import { useCompare } from '~/composables/useCompare';
import { useCart } from '~/composables/useCart';
import RainbowButton from '~/components/ui/RainbowButton.vue';
import ProductDetailsModal from '~/components/ProductDetailsModal.vue';

interface Props {
  item?: any;
  class?: HTMLAttributes['class'];
  orientation?: 'vertical' | 'horizontal';
  fullWidth?: boolean;
  showDetails?: boolean;
  showCompare?: boolean;
  showCart?: boolean;
  showApplications?: boolean;
  showTechInfo?: boolean;
  detailsLabel?: string;
  compareLabel?: string;
  cartLabel?: string;
  applicationsLabel?: string;
  techInfoLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
  fullWidth: true,
  showDetails: true,
  showCompare: true,
  showCart: true,
  showApplications: true,
  showTechInfo: true,
  detailsLabel: 'Detalhes',
  compareLabel: 'Comparar Produtos',
  cartLabel: 'Carrinho',
  applicationsLabel: 'Aplicações',
  techInfoLabel: 'Info. Técnicas',
});

const emit = defineEmits<{
  (e: 'details', payload?: any): void;
  (e: 'compare', payload?: any): void;
  (e: 'cart', payload?: any): void;
  (e: 'applications', payload?: any): void;
  (e: 'techInfo', payload?: any): void;
}>();

const { add } = useCompare();
const { add: addCart } = useCart();

// Estado do modal de detalhes (reutiliza o mesmo popup do carrinho)
const visible = ref(false);
const product = ref<any | null>(null);
const loading = ref(false);

const containerClass = computed(() => {
  const base =
    props.orientation === 'vertical'
      ? 'mt-2 space-y-2 flex flex-col items-center justify-center'
      : 'mt-2 flex items-center justify-center gap-2';
  return [base, props.class].filter(Boolean).join(' ');
});

// Classes adicionais para o RainbowButton (largura e ajuste de conteúdo)
const rainbowClass = computed(() => {
  const width = props.fullWidth ? 'w-3/4' : '';
  // Reduz altura, padding e tamanho de fonte em ~50% para compactar os botões
  return [width, 'h-6 px-4 py-1 gap-1 text-xs !text-black dark:!text-white pointer-events-auto']
    .filter(Boolean)
    .join(' ');
});

async function emitDetails() {
  // Emite para quem escuta externamente
  emit('details', props.item);
  // Abre o mesmo popup de detalhes do carrinho
  const id = props.item?.id;
  const part = props.item?.part_number ?? props.item?.codigo ?? props.item?.sku;
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

function emitCompare() {
  // Envia para o comparador global
  const item = props.item || {};
  const id = item.id ?? item.part_number ?? item.codigo ?? item.sku;
  const title =
    item.nome ?? item.descricao ?? item.titulo ?? item.part_number ?? `Produto ${id ?? ''}`;
  const brand = item.fabricante ?? item.marca ?? 'QUALITEC';

  if (id != null) {
    add({ id, title, brand });
  }
  // Mantém o evento para quem já escuta externamente
  emit('compare', props.item);
}

function emitCart() {
  // Adiciona ao carrinho com id/título/marca básicos
  const item = props.item || {};
  const id = item.id ?? item.part_number ?? item.codigo ?? item.sku;
  const title =
    item.nome ?? item.descricao ?? item.titulo ?? item.part_number ?? `Produto ${id ?? ''}`;
  const brand = item.fabricante ?? item.marca ?? 'QUALITEC';
  // Campos extras para exibição no modal do carrinho
  const categoria = item.categoria;
  const diametro_montagem = item.diametro_montagem;
  const conexao_instrumento = item.conexao_instrumento;
  const faixa_trabalho = item.faixa_trabalho;
  const unidade_leitura = item.unidade_leitura;
  if (id != null) {
    addCart({ id, title, brand, categoria, diametro_montagem, conexao_instrumento, faixa_trabalho, unidade_leitura }, 1);
  }
  // Mantém o evento externo
  emit('cart', props.item);
}

function emitApplications() {
  emit('applications', props.item);
}

function emitTechInfo() {
  emit('techInfo', props.item);
}

// Handlers do modal de detalhes
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
/* Nenhum estilo adicional necessário; utiliza utilitários do Tailwind */
</style>