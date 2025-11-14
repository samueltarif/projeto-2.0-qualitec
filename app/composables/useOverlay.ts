import { ref, computed, watch } from 'vue';

// Controla visibilidade global de overlays/modais para ocultar o cabeçalho
const counter = ref(0);

const isOpen = computed(() => counter.value > 0);

function open() {
  counter.value += 1;
}

function close() {
  counter.value = Math.max(0, counter.value - 1);
}

function set(openState: boolean) {
  counter.value = openState ? Math.max(1, counter.value) : 0;
}

// Classe no body para possíveis estilos globais quando overlay estiver aberto
watch(isOpen, (v) => {
  try {
    const cls = 'overlay-open';
    if (v) document.body.classList.add(cls);
    else document.body.classList.remove(cls);
  } catch (_) {
    // ambiente sem DOM (SSR)
  }
});

export function useOverlay() {
  return { overlayOpen: isOpen, open, close, set };
}