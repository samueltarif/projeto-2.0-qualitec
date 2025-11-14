<template>
  <button
    type="button"
    :class="btnClass"
    @click="handleClick"
    aria-label="Carrinho"
    title="Carrinho"
  >
    <!-- Ícone de carrinho (SVG) -->
    <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3h2l2 12h10l2-8H6" stroke="#60A5FA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="9" cy="19" r="1.7" fill="#93C5FD" />
      <circle cx="17" cy="19" r="1.7" fill="#93C5FD" />
    </svg>
    <!-- Badge de quantidade em vermelho -->
    <span v-if="count > 0" class="absolute -top-2 -right-2 min-w-[22px] h-5 px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md">{{ count }}</span>
  </button>
  <!-- Modal de Carrinho -->
  <CartModal :visible="showCart" @close="showCart = false" />
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart';
import CartModal from '~/components/CartModal.vue';
import { ref, computed } from 'vue';

interface Props {
  to?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{ (e: 'click'): void }>();
const { count } = useCart();
const showCart = ref(false);

const baseClass = 'relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-white/40 dark:border-neutral-800/50 bg-white/60 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md transition-colors flex-none shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.55)] dark:shadow-[0_0_16px_#39FF14] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_0_20px_#39FF14] transition-shadow';
const btnClass = computed(() => [baseClass, props.class].filter(Boolean).join(' '));

function handleClick() {
  // Sempre abre o popup do carrinho
  showCart.value = true;
}
</script>

<style scoped>
</style>