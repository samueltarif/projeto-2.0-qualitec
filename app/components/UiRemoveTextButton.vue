<template>
  <button
    type="button"
    :class="classes"
    @click="emit('click')"
    :aria-label="ariaLabel"
    :title="ariaLabel"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface Props {
  label?: string;
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Remover',
  ariaLabel: 'Remover item',
});

const emit = defineEmits<{ (e: 'click'): void }>();

const classes = [
  'text-red-500 hover:text-red-600',
  'text-sm transition-colors',
  props.class || '',
].join(' ');
</script>

<style scoped>
</style>