<template>
  <UiModal
    :visible="visible"
    :with-backdrop="true"
    :close-on-backdrop="true"
    :close-on-esc="true"
    :show-close-button="true"
    close-button-label="×"
    aria-label="Detalhes do Produto"
    :panel-class="'w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md'"
    :affects-header="false"
    @close="emitClose"
  >
    <div class="space-y-6">
      <!-- Cabeçalho -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Detalhes do Produto</h2>
      </div>

      <!-- Identificação -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <div class="text-neutral-500 dark:text-neutral-400">SKU:</div>
          <div class="mt-1 font-medium text-neutral-800 dark:text-neutral-100">{{ product.part_number || product.id }}</div>
        </div>
        <div>
          <div class="text-neutral-500 dark:text-neutral-400">Categoria:</div>
          <div class="mt-1">
            <span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300">
              {{ product.categoria || '—' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Título/Descrição simples -->
      <div class="text-sm text-neutral-700 dark:text-neutral-200">
        {{ product.tipo_medicao || product.fabricante || '—' }}
      </div>

      <!-- Especificações Técnicas -->
      <div>
        <div class="text-base font-semibold text-neutral-900 dark:text-neutral-100">Especificações Técnicas</div>
        <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <SpecRow label="Faixa de Pressão" :value="product.faixa_trabalho" />
          <SpecRow label="Diâmetro" :value="product.diametro_montagem" />
          <SpecRow label="Conexão" :value="product.conexao_instrumento" />
          <SpecRow label="Precisão" :value="product.classe_exatidao" />
          <SpecRow label="Tipo de Medição" :value="product.tipo_medicao" />
          <SpecRow label="Posição de Montagem" :value="product.posicao_montagem" />
          <SpecRow label="Visor" :value="product.visor" />
          <SpecRow label="Material dos Internos" :value="product.material_internos" />
          <SpecRow label="Unidade de Leitura" :value="product.unidade_leitura" />
          <SpecRow label="Enchimento de Glicerina" :value="formatBool(product.glicerina)" />
          <SpecRow label="Tubo Sifão" :value="formatBool(product.tubo_sifao)" />
          <SpecRow label="Contato Elétrico" :value="formatBool(product.contato_eletrico)" />
          <SpecRow label="Selo Diafragma" :value="formatBool(product.selo_diafragma)" />
          <SpecRow label="Válvula de Isolamento" :value="formatBool(product.valvula_isolamento)" />
          <SpecRow label="Certificados" :value="formatCerts(product.certificados)" />
        </div>
      </div>

      <!-- Quantidade e Ações -->
      <div>
        <div class="text-base font-semibold text-neutral-900 dark:text-neutral-100">Quantidade</div>
        <div class="mt-2 flex items-center gap-3">
          <div class="flex items-center gap-2">
            <button type="button" class="rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" @click="decrement">−</button>
            <input
              type="number"
              min="1"
              :value="qty"
              @input="onQtyInput($event)"
              class="w-24 text-center rounded-md border px-2 py-1 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
            <button type="button" class="rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800" @click="increment">+</button>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-sm"
            @click="emitAddToCart"
            aria-label="Adicionar ao Carrinho"
          >
            <span class="i-lucide-shopping-cart"></span>
            Adicionar ao Carrinho
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            @click="emitDownloadPdf"
            aria-label="Download PDF Técnico"
          >
            <span class="i-lucide-file-down"></span>
            Download PDF Técnico
          </button>
        </div>
      </div>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import UiModal from '~/components/ui/UiModal.vue';

interface Props { visible: boolean; product: any }
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'add-cart', qty: number): void; (e: 'download-pdf'): void }>();

const qty = ref(1);
function increment() { qty.value = Math.min(9999, qty.value + 1); }
function decrement() { qty.value = Math.max(1, qty.value - 1); }
function onQtyInput(e: Event) {
  const val = Number((e.target as HTMLInputElement).value || '1');
  qty.value = isNaN(val) ? 1 : Math.max(1, Math.min(9999, Math.floor(val)));
}

function formatBool(v: any) { return Number(v) === 1 ? 'SIM' : 'NÃO'; }
function formatCerts(certs: any) {
  try {
    if (!certs) return '—';
    const arr = Array.isArray(certs) ? certs : JSON.parse(String(certs));
    return Array.isArray(arr) && arr.length ? arr.join(', ') : '—';
  } catch { return '—'; }
}

function emitClose() { emit('close'); }
function emitAddToCart() { emit('add-cart', qty.value); }
function emitDownloadPdf() { emit('download-pdf'); }

// Componente row reutilizável
import { defineComponent, h, ref } from 'vue';

const SpecRow = defineComponent({
  name: 'SpecRow',
  props: { label: { type: String, required: true }, value: { type: String, default: '—' } },
  setup(p) {
    return () => h('div', null, [
      h('label', { class: 'block text-xs text-neutral-500 dark:text-neutral-400' }, p.label),
      h('div', { class: 'mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100' }, p.value || '—')
    ]);
  }
});
</script>

<style scoped>
</style>