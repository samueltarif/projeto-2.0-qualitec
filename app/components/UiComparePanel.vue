<template>
  <div :class="outerClasses">
    <ClientOnly v-if="withSilk">
      <SilkBg
        class="absolute inset-0 z-0 pointer-events-none"
        :hue="hue"
        :saturation="saturation"
        :brightness="brightness"
        :speed="speed"
      />
    </ClientOnly>
    <div :class="innerClasses">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import SilkBg from '~/components/SilkBg.vue';

interface Props {
  class?: HTMLAttributes['class'];
  withSilk?: boolean;
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
  padded?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  withSilk: false,
  hue: 300,
  saturation: 0.5,
  brightness: 1,
  speed: 1,
  padded: false,
});

const baseOuter = 'relative w-full overflow-hidden';
const outerClasses = [baseOuter, props.class].filter(Boolean).join(' ');

const baseInner = 'relative z-10';
const innerClasses = [baseInner, props.padded ? 'px-4 py-8' : ''].filter(Boolean).join(' ');
</script>

<style scoped>
</style>
<style>
/* Global glow animation for cells that differ from the majority in a row */
@keyframes pulseRedGlow {
  0% { opacity: 0.35; }
  50% { opacity: 0.95; }
  100% { opacity: 0.35; }
}

.diff-glow-red {
  position: relative;
}

.diff-glow-red::after {
  content: '';
  position: absolute;
  inset: -1px;
  pointer-events: none;
  border: 1px solid rgba(255, 64, 64, 0.55);
  box-shadow: 0 0 0.8rem rgba(255, 64, 64, 0.55), inset 0 0 0.5rem rgba(255, 64, 64, 0.35);
  animation: pulseRedGlow 1.6s ease-in-out infinite;
}

/* Bold text with red outline for differing cells */
.diff-text-red {
  font-weight: 700;
  color: #fff;
  -webkit-text-stroke: 0.6px rgba(255, 64, 64, 0.85);
  text-shadow:
    0 0 2px rgba(255, 64, 64, 0.6),
    0 0 6px rgba(255, 64, 64, 0.35);
}
</style>