<template>
  <button
    type="button"
    :aria-label="ariaLabel"
    :title="title"
    :aria-pressed="isActive ? 'true' : 'false'"
    :class="buttonClass"
    @click="onClick"
  >
    <svg :class="iconClass" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 17.27l5.18 3.04-1.64-5.81L20.9 9.5l-6-.19L12 3.5 9.1 9.31l-6 .19 5.36 4.99-1.64 5.81L12 17.27z"></path>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Props {
  active?: boolean;
  ariaLabel?: string;
  title?: string;
  size?: string; // dimensões do botão, ex: 'w-9 h-9'
  class?: string; // classes adicionais
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
  ariaLabel: 'Favoritos',
  title: 'Favoritos',
  size: 'w-9 h-9',
});

const emit = defineEmits<{ (e: 'click'): void; (e: 'update:active', value: boolean): void; (e: 'toggle', value: boolean): void }>();

const isActive = ref(!!props.active);
watch(() => props.active, (val) => { isActive.value = !!val; });

function onClick() {
  isActive.value = !isActive.value;
  emit('update:active', isActive.value);
  emit('toggle', isActive.value);
  emit('click');
}

const buttonClass = computed(() => [
  'inline-flex items-center justify-center flex-none shrink-0',
  props.size,
  'rounded-xl border border-white/40 dark:border-neutral-800/50',
  'bg-white/60 dark:bg-neutral-800/40',
  isActive.value ? 'text-yellow-600 dark:text-yellow-300' : 'text-yellow-500 dark:text-yellow-400',
  'hover:text-yellow-600 dark:hover:text-yellow-300',
  'backdrop-blur-md transition-colors',
  // Neon glow: preto no tema claro, verde fluorescente no tema escuro
  'shadow-[0_0_10px_rgba(0,0,0,0.55)] dark:shadow-[0_0_16px_#39FF14] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_0_20px_#39FF14] transition-shadow',
  props.class,
].filter(Boolean).join(' '));

const iconClass = computed(() => 'h-5 w-5');
</script>

<style scoped>
</style>