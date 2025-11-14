<template>
  <aside class="self-start w-full md:w-40 lg:w-48 xl:w-[14rem] bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md shadow-lg rounded-xl border border-white/25 dark:border-white/10 px-4 sm:px-5 py-4 sm:py-5 md:sticky md:top-20" style="margin-top: 5cm;">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Filtros</h2>
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="toggleCollapse"
          :aria-expanded="!isCollapsed"
          aria-controls="filters-panel"
          class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 flex items-center gap-1"
        >
          <span class="hidden sm:inline">{{ collapseLabel }}</span>
          <svg :class="['h-4 w-4 transition-transform', isCollapsed ? 'rotate-180 neon-green-pulse' : 'rotate-0']" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" @click="handleClear" class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-red-600 flex items-center gap-1">
          <span class="hidden sm:inline">Limpar</span>
          <span aria-hidden>🗑️</span>
        </button>
      </div>
    </div>

    <div id="filters-panel" v-show="!isCollapsed" class="transition-opacity duration-200">
      <!-- Contador de resultados (por props, sem simulação) -->
      <div class="text-xs text-neutral-600 dark:text-neutral-300 mb-4">
        {{ resultsCount }} produtos encontrados — Página {{ currentPage }} de {{ totalPages }}
      </div>
      <!-- Debug: mostrar estado do painel -->
      <div v-if="true" class="text-xs text-blue-600 mb-2">
        Painel visível: {{ !isCollapsed }}, Filtros ativos: {{ activeFilters.length }}
      </div>

      <!-- Categoria -->
      <label class="block text-sm font-bold text-neutral-700 dark:text-neutral-200 mb-2">Categoria</label>
      <select v-model="selectedCategory" class="w-full rounded-md border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 mb-4">
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <!-- Filtros dinâmicos padronizados: exibição com expansão progressiva -->
      <div v-if="showCategoryFilters" class="space-y-4">
        <div v-for="filter in visibleFilters" :key="filter.key">
          <label class="block text-sm font-bold text-neutral-700 dark:text-neutral-200 mb-1">{{ filter.label }}</label>
          <!-- Renderização inline para evitar divergências de hidratação -->
          <div v-if="filter.type === 'text'" class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.5" />
              <line x1="21" y1="21" x2="16.5" y2="16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <input v-model="filtersState[filter.key]" :placeholder="filter.placeholder || ''" class="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 py-2.5 pl-10 pr-3" />
          </div>
          <div v-else class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 5a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V9zm0 5a1 1 0 011-1h5a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" />
            </svg>
            <select v-model="filtersState[filter.key]" class="w-full appearance-none rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 py-2.5 pl-10 pr-10">
              <option value="">
                {{ (filter.firstOption || 'Todos') }}
                {{ facetTotals[filter.key] != null ? ` (${facetTotals[filter.key]})` : '' }}
              </option>
              <option v-for="opt in filter.options" :key="opt" :value="opt">
                {{ opt }}
                {{ countsMap[filter.key]?.[opt] != null ? ` (${countsMap[filter.key][opt]})` : '' }}
              </option>
            </select>
            <svg class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 dark:text-neutral-500 pointer-events-none" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.27a.75.75 0 01-.02-1.06z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div class="pt-2 flex items-center gap-3">
          <button
            v-if="canExpand"
            type="button"
            class="text-sm font-medium text-blue-600 hover:text-blue-700"
            @click="expandMore"
          >
            Expandir filtros
          </button>
          <button
            v-if="canCollapse"
            type="button"
            class="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-700"
            @click="collapseDefault"
          >
            Mostrar menos
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch, onMounted } from 'vue';

type FilterType = 'select' | 'boolean' | 'text';
interface FilterDef {
  key: string;
  label: string;
  type: FilterType;
  options?: string[];
  placeholder?: string;
  firstOption?: string;
}

const categories = ref<string[]>(["Todas as categorias", "Manômetros"]);
const selectedCategory = ref<string>("Manômetros");

// Colapso/expansão do painel de filtros
const isCollapsed = ref(false);
const collapseLabel = computed(() => (isCollapsed.value ? 'Expandir' : ''));
function toggleCollapse() { 
  isCollapsed.value = !isCollapsed.value; 
  console.log('Painel colapsado:', isCollapsed.value);
}

// Opções dinâmicas preenchidas via API
const optionsMap = reactive<Record<string, string[]>>({
  part_number: [], faixa_trabalho: [], fabricante: [], tipo_medicao: [], diametro_montagem: [], posicao_montagem: [],
  conexao_instrumento: [], visor: [], classe_exatidao: [], material_involucro: [], material_internos: [], unidade_leitura: [],
  glicerina: ['Sim', 'Não'], certificados: [], tubo_sifao: ['Sim', 'Não'], selo_diafragma: ['Sim', 'Não'], contato_eletrico: ['Sim', 'Não'], valvula_isolamento: ['Sim', 'Não'],
});

// Contagens por opção (atualizadas conforme filtros)
const countsMap = reactive<Record<string, Record<string, number>>>({});
const facetTotals = reactive<Record<string, number>>({});

// Ordem exata (exclui: ncm, preço, imagens, estoque, codigo_erp)
const manometrosFilters = computed<FilterDef[]>(() => [
  { key: 'part_number', label: 'Part Number', type: 'text', placeholder: 'Digite o part number...' },
  { key: 'faixa_trabalho', label: 'Faixa de Trabalho', type: 'select', options: optionsMap.faixa_trabalho, firstOption: 'Todas as faixas' },
  { key: 'fabricante', label: 'Fabricante', type: 'select', options: optionsMap.fabricante },
  { key: 'tipo_medicao', label: 'Tipo de Medição', type: 'select', options: optionsMap.tipo_medicao },
  { key: 'diametro_montagem', label: 'Diâmetro de Montagem', type: 'select', options: optionsMap.diametro_montagem },
  { key: 'posicao_montagem', label: 'Posição de Montagem', type: 'select', options: optionsMap.posicao_montagem },
  { key: 'conexao_instrumento', label: 'Conexão do Instrumento', type: 'select', options: optionsMap.conexao_instrumento },
  { key: 'visor', label: 'Visor', type: 'select', options: optionsMap.visor },
  { key: 'classe_exatidao', label: 'Classe de Exatidão', type: 'select', options: optionsMap.classe_exatidao },
  { key: 'material_involucro', label: 'Material do Invólucro', type: 'select', options: optionsMap.material_involucro },
  { key: 'material_internos', label: 'Material dos Internos', type: 'select', options: optionsMap.material_internos },
  { key: 'unidade_leitura', label: 'Unidade de Leitura', type: 'select', options: optionsMap.unidade_leitura },
  { key: 'glicerina', label: 'Enchimento de Glicerina', type: 'select', options: optionsMap.glicerina },
  { key: 'certificados', label: 'Certificados', type: 'select', options: optionsMap.certificados },
  { key: 'tubo_sifao', label: 'Tubo Sifão', type: 'select', options: optionsMap.tubo_sifao },
  { key: 'selo_diafragma', label: 'Selo Diafragma', type: 'select', options: optionsMap.selo_diafragma },
  { key: 'contato_eletrico', label: 'Contato Elétrico', type: 'select', options: optionsMap.contato_eletrico },
  { key: 'valvula_isolamento', label: 'Válvula de Isolamento', type: 'select', options: optionsMap.valvula_isolamento },
]);

const filtersSchema = computed<Record<string, FilterDef[]>>(() => ({
  'Manômetros': manometrosFilters.value,
}));

const filtersState = reactive<Record<string, string | null>>({});

// Lista de filtros ativos na categoria
const activeFilters = computed(() => filtersSchema.value[selectedCategory.value] || []);
const showCategoryFilters = computed(() => selectedCategory.value !== 'Todas as categorias');

// Debug: verificar filtros ativos
watch(activeFilters, (newFilters) => {
  console.log('Filtros ativos para', selectedCategory.value, ':', newFilters);
}, { immediate: true });

// Exibição progressiva: 7 inicialmente, expande +3 até o total
const DEFAULT_VISIBLE = 7;
const STEP = 3;
const visibleCount = ref<number>(DEFAULT_VISIBLE);
const visibleFilters = computed(() => {
  const filters = activeFilters.value.slice(0, visibleCount.value);
  console.log('Filtros visíveis:', filters);
  return filters;
});
const canExpand = computed(() => visibleCount.value < activeFilters.value.length);
const canCollapse = computed(() => activeFilters.value.length > DEFAULT_VISIBLE && visibleCount.value > DEFAULT_VISIBLE);

function expandMore() {
  visibleCount.value = Math.min(visibleCount.value + STEP, activeFilters.value.length);
}
function collapseDefault() {
  visibleCount.value = Math.min(DEFAULT_VISIBLE, activeFilters.value.length);
}

// Removidos componentes inline com template-string para evitar dependência do compilador em runtime.

function handleClear() {
  Object.keys(filtersState).forEach(k => { filtersState[k] = null; });
}

// Props para contagem externa (sem simulação)
const props = withDefaults(defineProps<{ resultsCount?: number; currentPage?: number; pageSize?: number }>(), {
  resultsCount: 0,
  currentPage: 1,
  pageSize: 12,
});

const resultsCount = computed(() => props.resultsCount ?? 0);
const currentPage = computed(() => props.currentPage ?? 1);
const totalPages = computed(() => Math.max(1, Math.ceil(resultsCount.value / (props.pageSize ?? 12))));

// Inicializa estado de filtros ao trocar categoria
const emit = defineEmits<{ (e: 'filters-change', payload: { category: string; filters: Record<string, string | null> }): void }>();

watch(selectedCategory, async () => {
  Object.keys(filtersState).forEach(k => { filtersState[k] = null; });
  await fetchOptions();
  await fetchFacetCounts();
  // Reset exibição ao trocar categoria
  visibleCount.value = Math.min(DEFAULT_VISIBLE, activeFilters.value.length);
  emit('filters-change', { category: selectedCategory.value, filters: { ...filtersState } });
});

watch(filtersState, () => {
  emit('filters-change', { category: selectedCategory.value, filters: { ...filtersState } });
  // Atualiza contagens reativas ao mudar filtros
  fetchFacetCounts();
}, { deep: true });

// Componentes inline removidos.

// Busca dinâmica de opções a partir do backend
async function fetchOptions() {
  try {
    const data: any = await $fetch('/api/produtos/distinct', { params: { categoria: selectedCategory.value, limit: 500 } });
    if (data && data.values) {
      Object.assign(optionsMap, data.values);
      console.log('Filtros carregados:', data.values);
    }
  } catch (e) {
    console.error('Erro ao carregar filtros:', e);
  }
}

// Busca contagens por facet considerando filtros atuais (exclui o próprio facet)
async function fetchFacetCounts() {
  try {
    const payload = { categoria: selectedCategory.value, filters: JSON.stringify({ ...filtersState }) } as any;
    const data: any = await $fetch('/api/produtos/facet-counts', { params: payload });
    if (data && data.counts && data.totals) {
      Object.assign(countsMap, data.counts);
      Object.assign(facetTotals, data.totals);
      console.log('Contagens de filtros carregadas:', data);
    }
  } catch (e) {
    console.error('Erro ao carregar contagens:', e);
  }
}

onMounted(async () => {
  if (selectedCategory.value !== 'Todas as categorias') {
    await fetchOptions();
    await fetchFacetCounts();
  }
  visibleCount.value = Math.min(DEFAULT_VISIBLE, activeFilters.value.length);
  // Emite estado inicial para sincronizar a página de produtos
  emit('filters-change', { category: selectedCategory.value, filters: { ...filtersState } });
});
</script>

<style scoped>
/* Efeito neon verde pulsante para a seta do botão "Expandir" quando colapsado */
.neon-green-pulse {
  color: #22c55e; /* tailwind emerald-500 */
  animation: neonPulseGreen 1.8s ease-in-out infinite;
  will-change: filter, opacity;
}

@keyframes neonPulseGreen {
  0% {
    filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0));
    opacity: 0.9;
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.9))
            drop-shadow(0 0 12px rgba(34, 197, 94, 0.6));
    opacity: 1;
  }
  100% {
    filter: drop-shadow(0 0 0 rgba(34, 197, 94, 0));
    opacity: 0.9;
  }
}
</style>