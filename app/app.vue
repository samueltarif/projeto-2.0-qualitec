<template>
  <div>
    <header v-show="!hideHeader" class="fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-4 py-3">
      <HeaderButtons :isLoginPage="isLoginPage" @open-favorites="showFavorites = true" />
    </header>
    <NuxtRouteAnnouncer />
    <main class="pt-20 md:pt-24">
      <NuxtPage />
    </main>
    <FavoritesModal :visible="showFavorites" @close="showFavorites = false" />
  </div>
</template>

<script setup lang="ts">
import HeaderButtons from '~/components/HeaderButtons.vue';
import FavoritesModal from './components/FavoritesModal.vue';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { useOverlay } from '~/composables/useOverlay';

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
const { overlayOpen } = useOverlay();
const hideHeader = computed(() => overlayOpen.value || route.path === '/comparar');
const showFavorites = ref(false);
</script>
