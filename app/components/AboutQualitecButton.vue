<template>
  <RainbowButton
    :class="cn('h-11 min-w-36 !text-black dark:!text-white', $props.class)"
    @click="handleClick"
  >
    {{ labelText }}
  </RainbowButton>
  
</template>

<script setup lang="ts">
import RainbowButton from './ui/RainbowButton.vue';
import { cn } from '../../lib/utils';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
const emit = defineEmits<{ (e: 'click'): void }>();

interface Props {
  label?: string;
  to?: string;
  href?: string;
  class?: string;
  duration?: number;
  borderWidth?: number;
  borderRadius?: number;
  blur?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  duration: 2500,
  borderWidth: 2,
  borderRadius: 8,
  blur: 4,
});

const router = useRouter();
const labelText = computed(() => props.label ?? 'Sobre a Qualitec');

function handleClick() {
  if (props.to) {
    router.push(props.to);
  } else if (props.href) {
    if (typeof window !== 'undefined') window.open(props.href, '_blank');
  } else {
    // Sem destino: emite clique para que o pai abra um popup
    emit('click');
  }
}
</script>