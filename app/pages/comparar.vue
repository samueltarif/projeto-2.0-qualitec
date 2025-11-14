<template>
  <UiComparePanel class="min-h-screen w-full">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div class="min-w-0">
          <h1 class="text-2xl font-bold text-black dark:text-neutral-100">Comparação de Produtos</h1>
          <p class="text-sm text-black dark:text-neutral-300">Compare as especificações dos produtos selecionados</p>
        </div>
        <BackToProductsButton class="self-start md:self-auto shrink-0" />
      </div>

      <div v-if="items.length < 2" class="mt-6 text-black dark:text-neutral-200">
        Selecione ao menos 2 produtos para comparar.
      </div>

      <div v-else class="mt-6">
        <!-- Cabeçalho com resumo dos produtos e remover -->
        <div class="relative -mx-4 md:mx-0 overflow-x-auto">
          <div class="grid gap-0 min-w-max" :style="gridTemplate">
            <!-- Coluna de especificações (header vazio) -->
            <div class="sticky left-0 z-10 rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-semibold border border-neutral-700/60 backdrop-blur-md">Especificação</div>
            <div v-for="p in items" :key="p.id" class="rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm border border-neutral-700/60 min-w-[12rem]">
              <div class="flex items-center justify-between">
                <div>
                  <div class="text-black dark:text-neutral-100 font-semibold truncate">{{ p.part_number || p.id }}</div>
                  <div class="text-[11px] md:text-xs text-black dark:text-blue-300 uppercase">{{ p.categoria || '—' }}</div>
                  <div class="text-[11px] md:text-xs text-black dark:text-neutral-300">{{ p.fabricante || 'QUALITEC' }}</div>
                </div>
                <UiRemoveButton
                  size="sm"
                  class="bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-md shadow-sm dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 dark:border-red-700"
                  @click="handleRemove(p.id)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Tabela de especificações -->
        <div class="relative -mx-4 md:mx-0 overflow-x-auto">
          <div class="grid gap-0 min-w-max" :style="gridTemplate">
            <template v-for="spec in specs" :key="spec.key">
              <div class="sticky left-0 z-10 bg-neutral-900/50 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-300 font-medium border border-neutral-700/60 backdrop-blur-md">{{ spec.label }}</div>
              <div
                v-for="p in items"
                :key="p.id + '-' + spec.key"
                :class="['bg-emerald-900/30 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-100 border border-neutral-700/60 min-w-[12rem]', isDifferent(p, spec) ? 'md:diff-glow-red border-red-500/40 bg-red-50/20 dark:bg-red-900/10' : '']"
              >
                <span :class="isDifferent(p, spec) ? 'diff-text-red md:diff-text-red' : ''">
                  {{ formatValue(p[spec.key], spec) }}
                </span>
              </div>
            </template>
          </div>
        </div>

        <!-- Ações -->
        <div class="relative -mx-4 md:mx-0 overflow-x-auto">
          <div class="grid gap-0 min-w-max" :style="gridTemplate">
            <div class="sticky left-0 z-10 bg-neutral-900/60 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-medium border border-neutral-700/60 backdrop-blur-md">Ações</div>
            <div v-for="p in items" :key="p.id + '-actions'" class="bg-neutral-900/60 p-2 md:p-4 border border-neutral-700/60 min-w-[12rem]">
              <div class="flex items-center gap-3">
                <UiAddButton @click="addToCart(p)" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <UiClearCompareButton size="sm" @click="handleClear()" />
        </div>
      </div>
    </div>
  </UiComparePanel>
</template>

<script setup lang="ts">
import BackToProductsButton from '~/components/BackToProductsButton.vue';
import UiComparePanel from '~/components/UiComparePanel.vue';
import UiAddButton from '~/components/UiAddButton.vue';
import UiClearCompareButton from '~/components/UiClearCompareButton.vue';
import UiRemoveButton from '~/components/UiRemoveButton.vue';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useCompare } from '~/composables/useCompare';

const route = useRoute();
const { items: compareItems, remove, clear } = useCompare();
const items = ref<any[]>([]);

// Grid com 1 coluna de especificações + N produtos (ajuste para mobile)
const gridTemplate = computed(() => {
  const cols = Math.max(2, Math.min(3, items.value.length));
  return `grid-template-columns: minmax(12rem, 0.9fr) repeat(${cols}, minmax(12rem, 1fr))`;
});

const specs = [
  { label: 'CATEGORIA', key: 'categoria' },
  { label: 'TIPO DE MEDIÇÃO', key: 'tipo_medicao' },
  { label: 'DIÂMETRO DE MONTAGEM', key: 'diametro_montagem' },
  { label: 'POSIÇÃO DE MONTAGEM', key: 'posicao_montagem' },
  { label: 'CONEXÃO DO INSTRUMENTO', key: 'conexao_instrumento' },
  { label: 'MATERIAL DO INVÓLUCRO', key: 'material_involucro' },
  { label: 'MATERIAL DOS INTERNOS', key: 'material_internos' },
  { label: 'VISOR', key: 'visor' },
  { label: 'CLASSE DE EXATIDÃO', key: 'classe_exatidao' },
  { label: 'UNIDADE DE LEITURA', key: 'unidade_leitura' },
  { label: 'FAIXA DE TRABALHO', key: 'faixa_trabalho' },
  { label: 'ENCHIMENTO DE GLICERINA', key: 'glicerina', type: 'bool' },
  { label: 'CERTIFICADOS', key: 'certificados', type: 'json' },
  { label: 'TUBO SIFÃO', key: 'tubo_sifao', type: 'bool' },
  { label: 'SELO DIAFRAGMA', key: 'selo_diafragma', type: 'bool' },
  { label: 'CONTATO ELÉTRICO', key: 'contato_eletrico', type: 'bool' },
  { label: 'VÁLVULA DE ISOLAMENTO', key: 'valvula_isolamento', type: 'bool' },
];

function formatValue(v: any, spec: any) {
  if (spec.type === 'bool') return v ? 'Sim' : 'Não';
  if (spec.type === 'json') {
    try {
      const arr = Array.isArray(v) ? v : JSON.parse(v || '[]');
      return Array.isArray(arr) && arr.length ? arr.join(', ') : '—';
    } catch {
      return '—';
    }
  }
  return v ?? '—';
}

function normalizeSpecValue(v: any, spec: any): string {
  if (spec.type === 'bool') return v ? 'sim' : 'não';
  if (spec.type === 'json') {
    try {
      const arr = Array.isArray(v) ? v : JSON.parse(v || '[]');
      return Array.isArray(arr) && arr.length ? String(arr.join(', ')).trim().toLowerCase() : '';
    } catch {
      return '';
    }
  }
  if (v == null) return '';
  return String(v).trim().toLowerCase();
}

function mode(values: string[]): string {
  const freq: Record<string, number> = {};
  let best = '';
  let bestCount = 0;
  for (const val of values) {
    if (!val) continue;
    const count = (freq[val] || 0) + 1;
    freq[val] = count;
    if (count > bestCount) {
      best = val;
      bestCount = count;
    }
  }
  return best;
}

function isDifferent(p: any, spec: any): boolean {
  const values = items.value.map((i) => normalizeSpecValue(i[spec.key], spec));
  const baseline = mode(values);
  if (!baseline) return false;
  const current = normalizeSpecValue(p[spec.key], spec);
  return current !== baseline;
}

function addToCart(p: any) {
  console.log('Adicionar ao carrinho:', p.id);
}

onMounted(async () => {
  // Fonte dos ids: query (?ids=) ou estado do comparador
  let idsParam = String(route.query.ids || '');
  if (!idsParam) {
    idsParam = compareItems.value.map((i) => i.id).join(',');
  }
  if (!idsParam) return;
  try {
    const res = await $fetch<{ items: any[]; error?: string }>(`/api/produtos/get-by-ids`, { params: { ids: idsParam } });
    if (res?.items) items.value = res.items;
  } catch (e) {
    // silencioso
  }
});

function handleRemove(id: any) {
  remove(id);
  items.value = items.value.filter((p) => p.id !== id);
}

function handleClear() {
  clear();
  items.value = [];
}
</script>

<style scoped>
/* Usa utilitários Tailwind; cores próximas ao seu tema */
</style>