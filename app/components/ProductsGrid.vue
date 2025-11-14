<template>
  <UiPanel class="flex-1" variant="accent">
    <h1 class="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Catálogo</h1>
    <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Resultados atuais conforme filtros.</p>

    <div class="mt-4">
      <div class="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <div>
          Categoria: <span class="font-medium">{{ selectedCategory }}</span>
          · Página {{ currentPage }} de {{ totalPages }}
        </div>
        <div>
          {{ resultsCount }} produtos
        </div>
      </div>

      <!-- Grid de Cards -->
      <div class="mt-4">
        <div v-if="loading" class="py-3 text-neutral-600 dark:text-neutral-300">Carregando...</div>
        <div v-else-if="items.length === 0" class="py-3 text-neutral-600 dark:text-neutral-300">Nenhum produto encontrado.</div>
        <!-- Wrapper para glow neon verde atrás do grid -->
        <div v-else class="neon-green-wrap">
          <div class="grid grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-8">
          <div v-for="item in items" :key="item.id" class="rounded-xl overflow-hidden border border-white/25 dark:border-white/10 shadow-lg bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md">
            <!-- Cabeçalho visual do card: galeria com miniaturas e modal -->
            <div class="relative group">
              <img
                :src="imagesFor(item)[0]"
                class="h-28 w-full object-cover"
                alt="Imagem do produto"
                @error="onImgError"
                @click="openGallery(item, 0)"
              />
              <div class="absolute bottom-2 right-2 flex gap-2">
                <button
                  v-for="(img, i) in imagesFor(item).slice(1, 3)"
                  :key="'thumb-' + i"
                  type="button"
                  class="h-9 w-9 rounded-md overflow-hidden shadow-sm ring-1 ring-white/40 dark:ring-neutral-700/60"
                  @click.stop="openGallery(item, i + 1)"
                  :aria-label="'Abrir imagem ' + (i + 2)"
                >
                  <img :src="img" class="h-full w-full object-cover" alt="Miniatura" @error="onImgError" />
                </button>
              </div>
            </div>

            <!-- Conteúdo do card (componente reutilizável) -->
            <ProductCardContent
              :item="item"
              @details="emit('details', item)"
              @compare="emit('compare', item)"
              @cart="emit('cart', item)"
            />
          </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <UiPrevButton :disabled="currentPage <= 1 || loading" @click="emit('prev')" />
        <UiNextButton :disabled="currentPage >= totalPages || loading" @click="emit('next')" />
      </div>
      <!-- Faixa de informação também no rodapé -->
      <div class="mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <div>
          Categoria: <span class="font-medium">{{ selectedCategory }}</span>
          · Página {{ currentPage }} de {{ totalPages }}
        </div>
        <div>
          {{ resultsCount }} produtos
        </div>
      </div>
    </div>
  </UiPanel>

  <!-- Modal de imagens (lightbox) -->
  <UiModal
    :visible="showGallery"
    :with-backdrop="true"
    :close-on-backdrop="true"
    :close-on-esc="true"
    :show-close-button="true"
    close-button-placement="left"
    :panel-class="'w-screen h-screen p-0 bg-transparent'"
    @close="closeGallery"
  >
    <div ref="galleryEl" class="relative w-full h-full">
      <img :src="currentImage" class="max-h-full h-full w-auto max-w-full mx-auto object-contain" alt="Imagem ampliada" @error="onImgError" />
      <button
        type="button"
        class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl"
        @click="prevImage"
        aria-label="Imagem anterior"
      >
        <
      </button>
      <button
        type="button"
        class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl"
        @click="nextImage"
        aria-label="Próxima imagem"
      >
        >
      </button>
      <div class="absolute top-2 right-2 flex items-center gap-3">
        <button
          type="button"
          class="rounded-md bg-white/80 dark:bg-neutral-800/80 px-3 py-1 text-sm shadow"
          @click="enterFullscreen"
        >
          Tela cheia
        </button>
      </div>
    </div>
    <div class="mt-3 text-center">
      <a
        v-if="currentOriginal && isIbb(currentOriginal)"
        :href="currentOriginal"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        Abrir imagem original
      </a>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { toRefs, ref, computed, nextTick, watch } from 'vue';
import UiPanel from './UiPanel.vue';
import UiPrevButton from './UiPrevButton.vue';
import UiNextButton from './UiNextButton.vue';
import ProductCardContent from './ProductCardContent.vue';
import UiModal from './ui/UiModal.vue';

interface Props {
  items: any[];
  loading: boolean;
  resultsCount: number;
  selectedCategory: string;
  currentPage: number;
  totalPages: number;
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'details', item: any): void;
  (e: 'compare', item: any): void;
  (e: 'cart', item: any): void;
  (e: 'prev'): void;
  (e: 'next'): void;
}>();

const { items, loading, resultsCount, selectedCategory, currentPage, totalPages } = toRefs(props);

// Galeria de imagens (páginas do ImgBB)
const GALLERY_PAGES = [
  'https://ibb.co/cKQDTSdv',
  'https://ibb.co/B2kWrRJ6',
  'https://ibb.co/xqCRsnQF',
];
const showGallery = ref(false);
const galleryImages = ref<string[]>([]);
const galleryOriginals = ref<string[]>([]);
const activeImageIndex = ref(0);
const galleryEl = ref<HTMLElement | null>(null);

function toProxy(url: string): string {
  return url.startsWith('https://ibb.co/') ? `/api/imgbb?u=${encodeURIComponent(url)}` : url;
}

function imagesFor(item: any): string[] {
  // Usa proxy interno para evitar ORB e servir imagem com MIME correto
  return GALLERY_PAGES.map(toProxy);
}

function onImgError(e: Event) {
  const target = e.target as HTMLImageElement | null;
  if (target) target.src = '/manometro.png';
}

function openGallery(item: any, index = 0) {
  galleryImages.value = imagesFor(item);
  galleryOriginals.value = GALLERY_PAGES.slice();
  activeImageIndex.value = index;
  showGallery.value = true;
}

function closeGallery() {
  showGallery.value = false;
}

const currentImage = computed(() => {
  const imgs = galleryImages.value;
  if (!imgs || !imgs.length) return '/manometro.png';
  return imgs[Math.max(0, Math.min(activeImageIndex.value, imgs.length - 1))];
});

function nextImage() {
  const imgs = galleryImages.value;
  if (!imgs || !imgs.length) return;
  activeImageIndex.value = (activeImageIndex.value + 1) % imgs.length;
}

function prevImage() {
  const imgs = galleryImages.value;
  if (!imgs || !imgs.length) return;
  activeImageIndex.value = (activeImageIndex.value + imgs.length - 1) % imgs.length;
}

function isIbb(url: string) {
  return typeof url === 'string' && url.startsWith('https://ibb.co/');
}

const currentOriginal = computed(() => {
  const origs = galleryOriginals.value;
  if (!origs || !origs.length) return '';
  return origs[Math.max(0, Math.min(activeImageIndex.value, origs.length - 1))];
});

function enterFullscreen() {
  try {
    const el: any = galleryEl.value as any;
    if (el && el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el && el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  } catch (e) {
    // Silencia falhas por restrições de gesto do usuário
  }
}

function onKey(e: KeyboardEvent) {
  if (!showGallery.value) return;
  if (e.key === 'ArrowRight') {
    nextImage();
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  }
}

watch(showGallery, (open) => {
  if (open) {
    window.addEventListener('keydown', onKey);
  } else {
    window.removeEventListener('keydown', onKey);
  }
});
</script>

<style scoped>
/* Glow neon verde atrás do grid de produtos */
.neon-green-wrap {
  position: relative;
}
.neon-green-wrap::before {
  content: "";
  position: absolute;
  inset: -12px;
  border-radius: 18px;
  pointer-events: none;
  /* Gradiente suave com blur para efeito neon */
  background: radial-gradient(50% 50% at 50% 50%, rgba(34, 197, 94, 0.22) 0%, rgba(34, 197, 94, 0.12) 45%, transparent 75%);
  filter: blur(18px);
  opacity: 0.9;
  z-index: 0;
}
.neon-green-wrap > .grid {
  position: relative;
  z-index: 1;
}
</style>