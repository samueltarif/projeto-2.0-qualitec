<template>
  <button
    :type="type"
    :class="computedClass"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="$emit('click', $event)"
  >
    <span v-if="$slots.icon" class="mr-2 inline-flex">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useAttrs } from 'vue';

interface Props {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  block?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  size: 'sm',
  block: false,
  disabled: false,
});

defineEmits(['click']);

const variantClasses: Record<Required<Props>['variant'], string> = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  outline:
    'inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400',
  ghost:
    'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors bg-transparent hover:bg-[var(--input-bg)]',
};

const sizeClasses: Record<Required<Props>['size'], string> = {
  xs: 'px-2 py-1 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

const attrs = useAttrs();

const computedClass = computed(() => {
  return [
    'focus:outline-none focus:ring-2 shadow-sm hover:shadow-md',
    variantClasses[props.variant],
    sizeClasses[props.size],
    props.block ? 'w-full justify-center' : 'justify-center',
    (attrs.class as string) || '',
  ].join(' ');
});
</script>