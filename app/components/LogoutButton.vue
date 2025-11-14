<template>
  <RainbowButton
    type="button"
    :class="cn('inline-flex items-center gap-2 px-3 py-2 text-sm !text-black dark:!text-white', props.class)"
    @click="handleClick"
    aria-label="Sair"
  >
    <span class="flex items-center">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 17l-5-5 5-5" stroke="#F87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 12H6" stroke="#F87171" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="16" y="5" width="3" height="14" rx="1.5" fill="#FCA5A5"/>
      </svg>
    </span>
    <span class="font-medium">{{ props.label }}</span>
  </RainbowButton>
</template>

<script setup lang="ts">
import RainbowButton from './ui/RainbowButton.vue';
import { cn } from '../../lib/utils';
import { useRouter } from 'vue-router';
const emit = defineEmits<{ (e: 'logout'): void }>();

interface Props {
  label?: string;
  to?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Sair',
  to: '/login',
});

const router = useRouter();

function handleClick() {
  // Notificar parent para fechar modais/overlays antes de navegar
  try { emit('logout'); } catch (_) {}
  router.push(props.to);
}
</script>