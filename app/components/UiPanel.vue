<template>
  <div :class="classes" :style="panelStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

interface Props {
  class?: HTMLAttributes['class'];
  variant?: 'default' | 'accent' | 'glass';
  align?: 'start' | 'stretch' | 'auto';
}

const props = withDefaults(defineProps<Props>(), { variant: 'default', align: 'start' });

// Superfície base
const surfaceDefault = ['bg-white/80 dark:bg-neutral-900/80', 'backdrop-blur-sm'];
const surfaceAccent = [
  'bg-gradient-to-b',
  'from-neutral-50/95 to-neutral-100/70',
  'dark:from-neutral-800/75 dark:to-neutral-900/85',
  'backdrop-blur-sm'
];
const surfaceGlass = ['bg-white/60 dark:bg-neutral-900/40', 'backdrop-blur-md'];

// Box styles
const boxDefault = ['rounded-xl', 'shadow-md', 'border', 'border-neutral-200/70', 'dark:border-neutral-800/70'];
const boxAccent = ['rounded-2xl', 'shadow-lg', 'ring-1', 'ring-neutral-200/60', 'dark:ring-neutral-700/50'];
const boxGlass = ['rounded-xl', 'shadow-lg', 'border', 'border-white/25', 'dark:border-white/10'];

// Espaçamentos
const paddingDefault = ['px-5 sm:px-6', 'py-4 sm:py-5'];
const paddingAccent = ['px-6 sm:px-8', 'py-5 sm:py-6'];

const base = [
  ...(props.variant === 'accent' ? surfaceAccent : props.variant === 'glass' ? surfaceGlass : surfaceDefault),
  ...(props.variant === 'accent' ? boxAccent : props.variant === 'glass' ? boxGlass : boxDefault),
  ...(props.variant === 'accent' ? paddingAccent : paddingDefault),
].join(' ');

const alignClass = props.align === 'stretch' ? 'self-stretch' : props.align === 'auto' ? '' : 'self-start';

const classes = [base, alignClass, props.class].filter(Boolean).join(' ');

// Deslocamento solicitado: 5cm
const panelStyle = { marginTop: '5cm' };
</script>

<style scoped>
</style>