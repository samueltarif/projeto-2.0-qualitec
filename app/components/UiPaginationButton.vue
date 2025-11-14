<template>
  <button
    type="button"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface Props {
  label: string;
  disabled?: boolean;
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const emit = defineEmits<{ (e: 'click'): void }>();

const base = 'px-3 py-1 rounded-md border text-sm disabled:opacity-50';
const classes = [base, props.class].filter(Boolean).join(' ');

function handleClick() {
  if (!props.disabled) emit('click');
}
</script>

<style scoped>
</style>