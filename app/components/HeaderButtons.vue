<template>
  <div class="flex items-center gap-3">
    <CartIconButton v-if="!isLoginPage" />
    <ThemeToggle />
    <ProfileIconButton v-if="!isLoginPage" />
    <FavoriteIconButton v-if="!isLoginPage" size="w-8 h-8 sm:w-9 sm:h-9" @click="emit('open-favorites')" />
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '~/components/ui/ThemeToggle.vue';
import CartIconButton from '~/components/CartIconButton.vue';
import FavoriteIconButton from '~/components/FavoriteIconButton.vue';
import ProfileIconButton from '~/components/ProfileIconButton.vue';

interface Props { isLoginPage?: boolean }
const props = withDefaults(defineProps<Props>(), { isLoginPage: false });
const emit = defineEmits<{ (e: 'open-favorites'): void }>();
</script>

<style scoped>
</style>