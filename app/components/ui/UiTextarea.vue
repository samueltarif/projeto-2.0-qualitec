<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">{{ label }}</label>
    <textarea
      :rows="rows"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :maxlength="maxLength"
      class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      :aria-label="ariaLabel"
    ></textarea>
    <div v-if="maxLength" class="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">{{ (modelValue?.length || 0) }} / {{ maxLength }}</div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
interface Props {
  modelValue?: string;
  placeholder?: string;
  rows?: number;
  label?: string;
  disabled?: boolean;
  maxLength?: number;
  class?: HTMLAttributes['class'];
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  rows: 3,
  disabled: false,
  ariaLabel: 'Campo de observações',
});

const wrapperClass = ['w-full', props.class].filter(Boolean).join(' ');
defineEmits<{ (e: 'update:modelValue', v: string): void }>();
</script>

<style scoped>
</style>