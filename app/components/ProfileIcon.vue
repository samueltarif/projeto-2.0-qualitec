<template>
  <svg
    :class="sizeClass"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="8" r="3.2" :stroke="strokeColor" stroke-width="1.6"></circle>
    <path
      d="M4.5 19c1.8-3.5 5-5 7.5-5s5.7 1.5 7.5 5"
      :stroke="strokeColor"
      stroke-width="1.6"
      stroke-linecap="round"
    ></path>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  size?: string; // classes de tamanho, ex: 'h-5 w-5'
  strokeColor?: string; // cor do traço; usa 'currentColor' por padrão
  class?: string; // classes adicionais
}

const props = withDefaults(defineProps<Props>(), {
  size: 'h-5 w-5',
  strokeColor: 'currentColor',
});

const sizeClass = computed(() => [
  props.size,
  props.class,
  // Neon glow diretamente no SVG via drop-shadow
  'drop-shadow-[0_0_8px_rgba(0,0,0,0.55)] dark:drop-shadow-[0_0_14px_#39FF14] transition-all'
].filter(Boolean).join(' '));
</script>

<style scoped>
</style>