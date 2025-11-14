<template>
  <button
    v-bind="$attrs"
    :type="props.type"
    :disabled="props.disabled"
    @click="$emit('click')"
    :class="
      cn(
        'inline-flex items-center justify-center bg-transparent p-0 m-0 disabled:opacity-60 disabled:cursor-not-allowed',
        props.class,
      )
    "
  >
    <UiSpan class="inline-flex items-center">
      <slot />
    </UiSpan>
  </button>
</template>

<script lang="ts" setup>
import { cn } from '../../lib/utils';
import { computed } from 'vue';

interface GradientButtonProps { 
  borderWidth?: number; 
  colors?: string[]; 
  duration?: number; 
  borderRadius?: number; 
  blur?: number; 
  class?: string; 
  bgColor?: string; 
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
} 

const props = withDefaults(defineProps<GradientButtonProps>(), { 
  colors: () => [ 
    '#FF0000', 
    '#FFA500', 
    '#FFFF00', 
    '#008000', 
    '#0000FF', 
    '#4B0082', 
    '#EE82EE', 
    '#FF0000', 
  ], 
  duration: 2500, 
  borderWidth: 2, 
  borderRadius: 8, 
  blur: 4, 
  bgColor: 'rgba(0, 0, 0, 1)', 
  type: 'button',
}); 

const durationInMilliseconds = computed(() => `${props.duration}ms`); 
const allColors = computed(() => props.colors.join(', ')); 
const borderWidthInPx = computed(() => `${props.borderWidth}px`); 
const borderRadiusInPx = computed(() => `${props.borderRadius}px`); 
const blurPx = computed(() => `${props.blur}px`); 
defineEmits(['click']);
</script>

<style scoped>
</style>