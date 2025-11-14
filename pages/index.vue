<script setup>
// Redirect root to login to avoid Nuxt splash page
navigateTo('/login', { replace: true })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <span class="text-gray-500">Redirecionando para login…</span>
  </div>
</template>