<template>
  <button
    class="inline-block rounded-t-lg border-b-2 p-4"
    :id="id"
    :data-tabs-target="target"
    type="button"
    role="tab"
    :aria-controls="ariaControls"
    :aria-selected="selected ? 'true' : 'false'"
    :class="[selected ? activeClass : inactiveClass, attention ? 'attention-anim' : '']"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  id: string;
  target: string; // e.g. #login
  ariaControls?: string; // defaults from target without '#'
  selected?: boolean;
  label?: string;
  attention?: boolean; // quando true, pisca e dá um leve salto
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
  attention: false,
});

const controls = computed(() => props.ariaControls || props.target.replace('#', ''));

const activeClass =
  'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500';
const inactiveClass =
  'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300 text-gray-500 dark:text-gray-400';

// Sync aria-controls with computed value
const ariaControls = computed(() => controls.value);
</script>

<style scoped>
@keyframes attentionBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
@keyframes attentionJump {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.attention-anim {
  animation: attentionBlink 0.9s ease-in-out 2, attentionJump 0.9s ease-in-out 2;
}
</style>