<template>
  <div class="min-h-screen grid place-items-center bg-[var(--bg)] text-[var(--text)] p-6">
    <div class="w-full max-w-2xl rounded-2xl border p-6 shadow-sm" style="border-color: var(--border)">
      <h1 class="text-2xl font-semibold">Ocorreu um erro</h1>
      <p class="mt-2 text-sm text-[var(--muted)]">Desculpe, algo inesperado aconteceu. Veja os detalhes abaixo.</p>

      <div class="mt-4 grid gap-2 text-sm">
        <div>
          <span class="font-medium">Código:</span>
          <span>{{ displayStatusCode }}</span>
        </div>
        <div v-if="error?.statusMessage">
          <span class="font-medium">Status:</span>
          <span>{{ error.statusMessage }}</span>
        </div>
        <div v-if="errorMessage">
          <span class="font-medium">Mensagem:</span>
          <span>{{ errorMessage }}</span>
        </div>
      </div>

      <div v-if="isDev && error?.stack" class="mt-4">
        <details class="rounded-md bg-[var(--surface)]/60 p-3">
          <summary class="cursor-pointer text-sm font-medium">Ver stack trace (dev)</summary>
          <pre class="mt-2 overflow-auto text-xs"><code>{{ error.stack }}</code></pre>
        </details>
      </div>

      <div class="mt-6 flex flex-wrap gap-2">
        <button type="button" class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style="border-color: var(--border)" @click="goHome">
          Voltar para a página inicial
        </button>
        <button type="button" class="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm" style="border-color: var(--border)" @click="copyDetails">
          Copiar detalhes do erro
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports';
import { clearError } from '#app/composables/error';

const props = defineProps<{ error?: any }>();
const error = props.error || {};

const isDev = process.env.NODE_ENV !== 'production';
const displayStatusCode = error?.statusCode ?? 500;
const errorMessage = error?.message || error?.statusMessage || 'Erro no aplicativo';

function goHome() {
  clearError({ redirect: '/' });
}

async function copyDetails() {
  const details = JSON.stringify({
    statusCode: displayStatusCode,
    statusMessage: error?.statusMessage,
    message: errorMessage,
    stack: error?.stack,
  }, null, 2);
  try {
    await navigator.clipboard.writeText(details);
    // opcional: feedback simples via alert
    alert('Detalhes copiados para a área de transferência.');
  } catch (e) {
    alert('Falha ao copiar detalhes.');
  }
}
</script>

<style>
:root {
  --bg: #ffffff;
  --text: #0a0a0a;
  --muted: #6b7280;
  --border: #e5e7eb;
  --surface: #f9fafb;
}
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0a0a0a;
    --text: #f6f6f6;
    --muted: #a1a1aa;
    --border: #262626;
    --surface: #171717;
  }
}
</style>