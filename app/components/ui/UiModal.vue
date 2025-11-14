<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
      >
        <!-- Backdrop -->
        <div
          v-if="withBackdrop"
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="onBackdropClick"
        ></div>

        <!-- Painel -->
        <Transition name="scale">
          <div :class="panelClasses" @click.stop>
            <button
              v-if="showCloseButton"
              type="button"
              :class="closeButtonClasses"
              @click="emitClose"
            >
              {{ closeButtonLabel }}
            </button>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue';
import { useOverlay } from '~/composables/useOverlay';

// Evita que atributos desconhecidos (como classes ou props não declaradas)
// sejam aplicados ao Teleport, o que pode causar erros de patch do DOM.
defineOptions({ inheritAttrs: false });

interface Props {
  visible: boolean;
  withBackdrop?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
  closeButtonPlacement?: 'left' | 'right';
  ariaLabel?: string;
  panelClass?: string;
  // Controla se este modal deve afetar a visibilidade do cabeçalho
  affectsHeader?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  withBackdrop: true,
  closeOnBackdrop: true,
  closeOnEsc: true,
  showCloseButton: true,
  closeButtonLabel: 'Fechar',
  closeButtonPlacement: 'right',
  ariaLabel: 'Modal',
  affectsHeader: true,
});

const emit = defineEmits<{ (e: 'close'): void }>();

function onBackdropClick() {
  if (props.closeOnBackdrop) emit('close');
}
function emitClose() {
  emit('close');
}

function onKeydown(e: KeyboardEvent) {
  if (props.closeOnEsc && e.key === 'Escape') emitClose();
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
});

// Painel padrão sem largura/altura fixas para se ajustar ao conteúdo.
// Tamanhos específicos (ex.: w-[90vw] h-[80vh]) devem ser passados via `panelClass`.
const defaultPanel = 'relative z-10 bg-white dark:bg-neutral-900 shadow-xl rounded-lg border border-neutral-200 dark:border-neutral-800';
const panelClasses = [defaultPanel, props.panelClass].filter(Boolean).join(' ');

// Classe do botão de fechar com posicionamento configurável
const closePos = props.closeButtonPlacement === 'left' ? 'left-3' : 'right-3';
const closeButtonClasses = ['absolute', 'top-3', closePos, 'z-50', 'rounded-md', 'px-3', 'py-1', 'text-sm', 'bg-neutral-100', 'dark:bg-neutral-800', 'hover:bg-neutral-200', 'dark:hover:bg-neutral-700'].join(' ');

// Ocultar cabeçalho quando qualquer modal estiver visível
const { open: overlayOpen, close: overlayClose } = useOverlay();
watch(() => props.visible, (v) => {
  // Apenas afeta header se explicitamente habilitado
  if (!props.affectsHeader) return;
  if (v) overlayOpen();
  else overlayClose();
}, { immediate: true });
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scale-enter-active, .scale-leave-active { transition: transform .2s ease, opacity .2s ease; }
.scale-enter-from, .scale-leave-to { transform: scale(0.95); opacity: 0; }
</style>