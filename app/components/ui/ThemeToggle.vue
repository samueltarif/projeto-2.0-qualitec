<template>
  <GradientButton
    type="button"
    @click="toggleTheme()"
    class="inline-flex items-center gap-2 px-3 py-2 text-sm"
    :aria-pressed="currentTheme === 'dark'"
    aria-label="Alternar tema"
  >
    <!-- Ícone de tema via UiSpan -->
    <UiSpan :size="'md'" :weight="'medium'" :class="'flex items-center'" variant="themeIcon" />

    <!-- Remover texto para foco no ícone; manter acessibilidade via aria-label -->
  </GradientButton>
</template>

<script setup lang="ts">
import { useTheme } from '~/composables/useTheme';
import GradientButton from '~/components/GradientButton.vue';
import UiSpan from '~/components/ui/Span.vue';

const { toggleTheme, currentTheme } = useTheme();
</script>
