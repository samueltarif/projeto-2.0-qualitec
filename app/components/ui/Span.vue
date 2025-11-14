<template>
  <component :is="is" :class="computedClass">
    <template v-if="variant === 'themeIcon'">
      <span class="flex items-center">
        <svg
          v-if="currentTheme !== 'dark'"
          class="h-5 w-5 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.55)]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#FDBA74" />
              <stop offset="100%" stop-color="#F59E0B" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="5" fill="url(#sunGrad)" />
          <g stroke="#FDBA74" stroke-linecap="round" stroke-width="1.5">
            <path d="M12 1.5v3" />
            <path d="M12 19.5v3" />
            <path d="M1.5 12h3" />
            <path d="M19.5 12h3" />
            <path d="M4.22 4.22l2.12 2.12" />
            <path d="M17.66 17.66l2.12 2.12" />
            <path d="M19.78 4.22l-2.12 2.12" />
            <path d="M6.34 17.66l-2.12 2.12" />
          </g>
        </svg>

        <svg
          v-else
          class="h-5 w-5 transition-transform duration-300 dark:drop-shadow-[0_0_14px_#39FF14]"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="moonGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#A7F3D0" />
              <stop offset="100%" stop-color="#22D3EE" />
            </radialGradient>
          </defs>
          <path
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            fill="url(#moonGrad)"
          />
          <g fill="#CFFAFE">
            <circle cx="7" cy="7" r="0.8" />
            <circle cx="16" cy="5" r="0.6" />
            <circle cx="18" cy="13" r="0.5" />
          </g>
        </svg>
      </span>
    </template>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from '~/composables/useTheme';

interface UiSpanProps {
  is?: string;
  size?: 'sm' | 'md' | 'lg';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  class?: string;
  variant?: 'default' | 'themeIcon';
}

const props = withDefaults(defineProps<UiSpanProps>(), {
  is: 'span',
  size: 'md',
  weight: 'medium',
  variant: 'default',
});

const { currentTheme } = useTheme();

const sizeClasses: Record<Required<UiSpanProps>['size'], string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const weightClasses: Record<Required<UiSpanProps>['weight'], string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const computedClass = computed(() => {
  return [
    'inline-flex items-center',
    sizeClasses[props.size],
    weightClasses[props.weight],
    props.class || '',
  ].join(' ');
});
</script>