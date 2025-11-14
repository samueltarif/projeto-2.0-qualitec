<template>
  <UiPanel class="w-full md:w-48 lg:w-60 xl:w-[17rem]" align="start" variant="glass">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
        Comparar Produtos ({{ count }}/{{ MAX_ITEMS }})
      </h2>
      <button
        v-if="count > 0"
        type="button"
        class="text-sm text-red-500 hover:text-red-600"
        @click="clear()"
      >
        Limpar
      </button>
    </div>

    <div class="mt-3 space-y-3">
      <template v-if="items.length === 0">
        <div class="rounded-lg border border-dashed border-neutral-300/70 dark:border-neutral-700/70 h-40 md:h-48 flex items-center justify-center text-neutral-500 dark:text-neutral-400">
          Nenhum produto selecionado
        </div>
        <div class="hidden md:block text-xs text-neutral-500 dark:text-neutral-400">
          Dica: clique em “Comparar” nos cards para adicionar aqui.
        </div>
      </template>

      <template v-else>
        <div
          v-for="p in items"
          :key="p.id"
          class="flex items-start gap-3 rounded-lg border border-neutral-300/70 dark:border-neutral-700/70 bg-neutral-50 dark:bg-neutral-800/40 px-3 py-3"
        >
          <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-blue-600/10 text-blue-600">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M3 7h18M3 12h18M3 17h18" stroke-linecap="round" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="text-sm font-medium text-neutral-800 dark:text-neutral-100 leading-snug">{{ p.title }}</div>
            <div v-if="p.brand" class="text-xs text-neutral-600 dark:text-neutral-300">{{ p.brand }}</div>
          </div>
          <button
            type="button"
            class="ml-auto text-neutral-500 hover:text-red-600"
            @click="remove(p.id)"
            aria-label="Remover"
            title="Remover"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6">
              <path d="M6 6l12 12M18 6l-12 12" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <RainbowButton
          type="button"
          :class="[
            'w-full mt-2 gap-2 text-sm !text-black dark:!text-white',
            shouldPulse ? 'pulse-strong ring-2 ring-yellow-400 shadow-xl shadow-yellow-300/50 dark:ring-yellow-300 dark:shadow-yellow-300/40' : ''
          ]"
          :disabled="!canCompare"
          @click="compare()"
          aria-label="Comparar Produtos"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M6 12h12M6 7h12M6 17h12" stroke-linecap="round" />
          </svg>
          Comparar Produtos
        </RainbowButton>
      </template>
    </div>
  </UiPanel>
</template>

<script setup lang="ts">
import UiPanel from './UiPanel.vue';
import { useCompare } from '~/composables/useCompare';
import { useRouter } from 'vue-router';
import RainbowButton from '~/components/ui/RainbowButton.vue';
import { computed } from 'vue';

const { items, count, MAX_ITEMS, clear, remove, canCompare } = useCompare();
const router = useRouter();

function compare() {
  if (!canCompare.value) return;
  const ids = items.value.map((i) => String(i.id)).join(',');
  // Rota futura: ajustaremos quando a página de comparação estiver pronta
  router.push({ path: '/comparar', query: { ids } }).catch(() => {});
}

// Pulse quando houver mais de 1 item para comparar (destacado)
const shouldPulse = computed(() => count.value > 1);
</script>

<style scoped>
@keyframes pulseStrong {
  0%, 100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.03);
    filter: brightness(1.15);
  }
}

.pulse-strong {
  animation: pulseStrong 900ms ease-in-out infinite;
}

/* Neon verde no botão de recolher (ícone SVG do header) */
@keyframes neonPulseGreen {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 0px rgba(34, 197, 94, 0));
    opacity: 1;
  }
  50% {
    transform: scale(1.06);
    filter: drop-shadow(0 0 4px rgba(34, 197, 94, 0.9))
            drop-shadow(0 0 10px rgba(34, 197, 94, 0.7));
    opacity: 0.95;
  }
}

/* Aplica o pulso neon apenas ao ícone do botão de recolher dentro do header */
:deep(.flex.items-center.justify-between button svg[aria-hidden="true"]) {
  color: #22c55e; /* green-600 */
  stroke: currentColor;
  animation: neonPulseGreen 1100ms ease-in-out infinite;
  will-change: filter, transform;
}
</style>