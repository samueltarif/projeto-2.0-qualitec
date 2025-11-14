<template>
  <transition name="fade-scale">
    <div v-if="visible" class="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-[90vw] max-w-md rounded-2xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-neutral-900/80 p-6 shadow-xl">
        <div class="flex items-center justify-center gap-3">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="gradCheck" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stop-color="#3B82F6" />
                <stop offset="50%" stop-color="#A855F7" />
                <stop offset="100%" stop-color="#10B981" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" stroke="url(#gradCheck)" stroke-width="1.5" />
            <path d="M16 9l-5.5 6L8 12.5" stroke="url(#gradCheck)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h2 class="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-fuchsia-500 to-emerald-400">
            {{ message }}
          </h2>
        </div>

        <p class="mt-3 text-center text-sm text-neutral-800 dark:text-neutral-200">
          {{ subtext }}
        </p>

        <div class="mt-4 flex items-center justify-center">
          <span class="inline-block h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-emerald-400"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  visible?: boolean;
  message?: string;
  subtext?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
});

const visible = props.visible;
const message = computed(() => props.message ?? 'Seja Bem-Vindo!');
const subtext = computed(() => props.subtext ?? 'Login realizado com sucesso.');
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity 300ms ease, transform 300ms ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>