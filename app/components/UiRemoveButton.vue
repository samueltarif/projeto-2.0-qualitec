<template>
  <button
    type="button"
    :class="classes"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    @click="emit('click')"
  >
    <span :class="iconClassComputed"></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  ariaLabel?: string;
  class?: string;
  size?: 'xs' | 'sm' | 'md';
  iconClass?: string; // i-<pack>:<icon> ou i-lucide-*
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Remover',
  size: 'sm',
  // Padrão confiável (Lucide) já usado no projeto
  iconClass: 'i-lucide-x',
});

const emit = defineEmits<{ (e: 'click'): void }>();

const sizeClasses: Record<Required<Props>['size'], string> = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
};

const classes = computed(() => [
  'inline-flex items-center justify-center rounded-md',
  'text-red-400 hover:text-red-500',
  'transition-colors',
  sizeClasses[props.size],
  props.class || '',
].join(' '));

const iconClassComputed = computed(() => [props.iconClass, 'h-4 w-4'].join(' '));
</script>

<style scoped>
</style>