<template>
  <RainbowButton
    :is="'button'"
    :type="type"
    :disabled="disabled || loading"
    :class="computedClass"
    @click="emit('click')"
    aria-label="Limpar Carrinho"
  >
    <span v-if="showIcon && !loading" class="i-lucide-recycle"></span>
    <span v-else-if="loading" class="i-lucide-loader-2 animate-spin"></span>
    <span class="font-medium">{{ label }}</span>
  </RainbowButton>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import RainbowButton from '~/components/ui/RainbowButton.vue';

interface Props {
  label?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  showIcon?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Limpar Carrinho',
  type: 'button',
  disabled: false,
  loading: false,
  showIcon: true,
});

const emit = defineEmits<{ (e: 'click'): void }>();

const computedClass = computed(() => [
  'inline-flex items-center gap-2 px-4 py-2 text-sm !text-black dark:!text-white',
  'disabled:opacity-60 disabled:cursor-not-allowed',
  props.class || '',
].join(' '));
</script>

<style scoped>
</style>