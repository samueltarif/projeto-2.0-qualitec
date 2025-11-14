<template>
  <RainbowButton
    type="button"
    :class="cn('inline-flex items-center gap-2 px-3 py-2 text-sm !text-black dark:!text-white', props.class)"
    @click="handleClick"
    :aria-label="props.label"
  >
    <span v-if="props.showIcon" class="i-lucide-arrow-left"></span>
    <slot>{{ props.label }}</slot>
  </RainbowButton>
  
</template>

<script setup lang="ts">
import RainbowButton from './ui/RainbowButton.vue';
import { cn } from '../../lib/utils';
import { useRouter } from 'vue-router';

interface Props {
  label?: string;
  to?: string;
  class?: string;
  showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Voltar aos Produtos',
  to: '/produtos',
  showIcon: true,
});

const emit = defineEmits<{ (e: 'click'): void }>();
const router = useRouter();

function handleClick() {
  if (props.to) {
    const current = router.currentRoute?.value?.path;
    if (current !== props.to) {
      router.replace(props.to).catch(() => {});
    }
  } else {
    emit('click');
  }
}
</script>

<style scoped>
</style>