<template>
  <RainbowButton
    :is="'button'"
    :disabled="disabled"
    :class="classes"
    @click="handleClick"
    aria-label="Próxima"
  >
    {{ label }}
  </RainbowButton>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import RainbowButton from '~/components/ui/RainbowButton.vue';

interface Props {
  disabled?: boolean;
  class?: HTMLAttributes['class'];
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: 'Próxima',
});

const emit = defineEmits<{ (e: 'click'): void }>();

const base = 'px-3 py-1 text-sm !text-black dark:!text-white';
const classes = [base, props.class].filter(Boolean).join(' ');

function handleClick() {
  if (!props.disabled) emit('click');
}
</script>

<style scoped>
</style>