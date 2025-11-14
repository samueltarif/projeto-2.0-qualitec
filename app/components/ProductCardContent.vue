<template>
  <div class="px-4 pb-4 pt-6 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md">
    <div class="flex items-center justify-between w-full">
      <div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
        {{ item.fabricante || 'QUALITEC' }}
      </div>
      <div class="ml-auto flex items-center gap-2">
        <FavoriteIconButton
          :active="isFav"
          size="w-7 h-7"
          aria-label="Favoritar"
          title="Favoritar"
          @toggle="onToggleFav"
        />
        <button
          type="button"
          class="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          aria-label="Ajuda"
          @click="openHelp"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8" />
            <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            <circle cx="12" cy="17" r="1" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
    <div class="mt-2 space-y-1 text-sm">
      <div class="flex justify-between">
        <span class="text-neutral-500 dark:text-neutral-400">Diâmetro:</span>
        <span class="font-medium text-neutral-800 dark:text-neutral-100">{{ item.diametro_montagem }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-500 dark:text-neutral-400">Conexão:</span>
        <span class="font-medium text-neutral-800 dark:text-neutral-100">{{ item.conexao_instrumento }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-500 dark:text-neutral-400">Faixa de Pressão:</span>
        <span class="font-medium text-neutral-800 dark:text-neutral-100">{{ faixaFormatada }}</span>
      </div>
    </div>

    <ProductActionButtons
      class="mt-4"
      :item="item"
      @details="emit('details', item)"
      @compare="emit('compare', item)"
      @cart="emit('cart', item)"
    />

    <!-- Help Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showHelp" class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="closeHelp"></div>

          <Transition name="scale">
            <div class="relative z-10 mx-4 w-full max-w-[calc(42rem+10cm)] rounded-2xl bg-white/90 dark:bg-neutral-900/80 shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
              <div class="flex items-center justify-between px-5 py-4 border-b border-neutral-200/70 dark:border-neutral-800">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">O que é um medidor (Manômetro) de pressão?</h3>
                <button type="button" class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Fechar" @click="closeHelp">
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>

              <div class="px-5 py-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 max-h-[70vh] overflow-y-auto">
                <p>Os manômetros são instrumentos para medir e exibir a pressão de um meio. Os manômetros são instrumentos de medição de pressão com elementos de pressão elásticos, que foram usados milhões de vezes em várias aplicações industriais. Dependendo da área de aplicação do manômetro, os tubos Bourdon, elementos de diafragma ou elementos de cápsula são usados como elementos de pressão.</p>

                <h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Quais pressões são medidas pelos manômetros?</h4>
                <p>Os manômetros medem a pressão manométrica, a pressão absoluta e a pressão diferencial. Além disso, os manômetros Qualitec podem ser usados não apenas para medir a pressão manométrica positiva, mas também para medir a pressão manométrica negativa.</p>

                <h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">Como funciona um medidor de pressão?</h4>
                <p>Os manômetros funcionam de forma diferente dependendo do tipo. Na tecnologia de medição industrial, são usados dois tipos diferentes de manômetros - manômetros com tubo Bourdon e manômetros com diafragma. Eles têm princípios funcionais diferentes e, portanto, são adequados para diferentes aplicações.</p>
                <p>Nos manômetros com tubo Bourdon, a pressão é medida por um tubo Bourdon que transmite a pressão diretamente ao ponteiro. Dentro da caixa há um tubo curvo, no qual o meio entra e faz com que o tubo Bourdon se estique. Esse estiramento é transmitido ao movimento por meio de um segmento dentado e é exibido no mostrador como a deflexão correspondente.</p>
                <p>Os manômetros de tubo Bourdon podem ser usados de várias maneiras e abrangem a maioria das aplicações. Entretanto, quando atingem seus limites, são usados manômetros de diafragma. Nos manômetros de diafragma, a pressão é transmitida por meio de um diafragma em forma de onda para um elo. Isso transfere a pressão para o movimento.</p>

                <h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">De que material deve ser feito o meu manômetro?</h4>
                <p>A Qualitec oferece todas as formas comuns de caixas. Para aplicações padrão, uma versão de plástico com um sistema de medição de liga de cobre é suficiente para meios neutros, como ar comprimido, água ou óleo. Para aplicações hidráulicas, recomendamos uma caixa cromada robusta com um enchimento de glicerina que amortece o sistema de medição contra vibrações e, portanto, garante uma boa legibilidade do instrumento.</p>
                <p>Para tarefas de medição em substâncias agressivas, não altamente viscosas e não cristalizantes, mesmo em ambientes agressivos, as variantes do manômetro feitas de aço inoxidável são adequadas. O sistema de medição também pode ser revestido com um material especial, como PTFE, ouro, Hastelloy e muitos outros. Isso protege o instrumento de meios agressivos.</p>

                <h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">O que significa a classe de precisão de um medidor de pressão?</h4>
                <p>No mostrador de um medidor de pressão, sempre encontramos uma indicação da classe de precisão. A classe de precisão de um medidor de pressão define o desvio permitido do mostrador em porcentagem do valor total da escala. Para caixas de plástico, esse desvio é de 4% ou 2,5%, enquanto para instrumentos de aço cromado ou aço inoxidável é de 1,6% ou 1,0%.</p>
                <p>Para manômetros de teste, a classe de precisão é de 0,6%, 0,25% ou até 0,1%, dependendo da faixa de exibição usada. O que isso significa na prática? Com uma faixa de medição de 0 a 100 bar e uma classe de precisão de 1,0%, o desvio permitido é de 1 bar em toda a faixa de medição.</p>

                <div class="mt-3 flex justify-end gap-2">
                  <button type="button" class="px-3 py-2 text-sm font-medium rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90" @click="closeHelp">Entendi</button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ProductActionButtons from './ProductActionButtons.vue';
import FavoriteIconButton from './FavoriteIconButton.vue';
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useFavorites } from '~/composables/useFavorites';

interface Props {
  item: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'details', payload?: any): void;
  (e: 'compare', payload?: any): void;
  (e: 'cart', payload?: any): void;
}>();

const faixaFormatada = computed(() => {
  const faixa = props.item?.faixa_trabalho ? String(props.item.faixa_trabalho) : '';
  const unidade = props.item?.unidade_leitura ? String(props.item.unidade_leitura) : '';
  return `${faixa}${unidade ? ' ' + unidade : ''}`;
});

// Favoritos: id/título/marca derivado do item
const { has, toggle } = useFavorites();
const favId = computed(() => {
  const i: any = props.item || {};
  return i.id ?? i.part_number ?? i.codigo ?? i.sku;
});
const favTitle = computed(() => {
  const i: any = props.item || {};
  const id = favId.value;
  return i.nome ?? i.descricao ?? i.titulo ?? i.part_number ?? (id != null ? `Produto ${id}` : 'Produto');
});
const favBrand = computed(() => {
  const i: any = props.item || {};
  return i.fabricante ?? i.marca ?? 'QUALITEC';
});
const isFav = computed(() => {
  const id = favId.value;
  return id != null ? has(id) : false;
});
function onToggleFav() {
  const id = favId.value;
  if (id == null) return;
  toggle({ id, title: favTitle.value, brand: favBrand.value });
}

const showHelp = ref(false);
const openHelp = () => { showHelp.value = true; };
const closeHelp = () => { showHelp.value = false; };

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeHelp();
};

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: transform .2s ease, opacity .2s ease; }
.scale-enter-from, .scale-leave-to { transform: scale(0.95); opacity: 0; }
</style>