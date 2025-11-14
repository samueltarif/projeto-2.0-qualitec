<template>
  <component
    :is="is"
    :type="type"
    :class="
      cn(
        'rainbow-button',
        // Layout básico e visual de botão
        'group relative inline-flex h-11 cursor-pointer select-none items-center justify-center rounded-xl px-8 py-2 font-medium',
        // Borda gradiente e preenchimento claro/escuro
        'bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]',
        'bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]',
        'dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]',
        // Texto
        'text-neutral-900 dark:text-neutral-100',
        // Feedback visual: sombra, transição e hover/active
        'shadow-sm transition-transform transition-shadow ease-out duration-200',
        'hover:shadow-md hover:-translate-y-[1px] active:translate-y-[1px] hover:brightness-110',
        // Acessibilidade
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400',
        // Estados
        'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
        // Glow inferior sutil
        'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]',
        props.class,
      )
    "
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '../../../lib/utils';
import { computed } from 'vue';

interface RainbowButtonProps {
  class?: string;
  is?: string;
  speed?: number;
  type?: 'button' | 'submit' | 'reset';
}

const props = withDefaults(defineProps<RainbowButtonProps>(), {
  speed: 2,
  is: 'button',
  type: 'button',
});

const speedInSeconds = computed(() => `${props.speed}s`);
</script>

<style scoped>
.rainbow-button {
  --color-1: hsl(0 100% 63%);
  --color-2: hsl(270 100% 63%);
  --color-3: hsl(210 100% 63%);
  --color-4: hsl(195 100% 63%);
  --color-5: hsl(90 100% 63%);
  --speed: v-bind(speedInSeconds);
  animation: rainbow var(--speed) infinite linear;
}

.rainbow-button:before {
  animation: rainbow var(--speed) infinite linear;
}

@keyframes rainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 200%;
  }
}
</style>