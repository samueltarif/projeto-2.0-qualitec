<template>
  <div class="mt-2 modal p-3 text-sm">
    <p class="font-semibold">Precisa de ajuda?</p>
    <ul class="mt-1 list-disc pl-5">
      <li>Envie um e-mail para nossa equipe.</li>
    </ul>
    <div class="mt-3 rounded border p-3 space-y-3" :style="{ borderColor: 'var(--border)' }">
      <p class="mb-2 font-semibold">Enviar e-mail</p>
      <div class="mb-2">
        <label class="mb-1 block text-xs label">Assunto</label>
        <UiInput v-model="subject" placeholder="Assunto" />
      </div>
      <div class="mb-2">
        <label class="mb-1 block text-xs label">Mensagem</label>
        <UiTextarea v-model="message" :rows="4" />
      </div>
      <div class="mb-2 text-xs" :style="{ color: 'var(--muted)' }">Destinatário: {{ recipient }}</div>
      <div class="mt-2 flex justify-center">
        <RainbowButton
          type="button"
          @click="onSend"
          :disabled="loading"
          :class="'inline-flex items-center gap-2 h-11 px-5 rounded-full bg-none bg-black !text-white hover:bg-neutral-900 shadow-sm hover:shadow-md before:hidden'"
          aria-label="Enviar e-mail"
        >
          <span v-if="!loading" class="i-lucide-send"></span>
          <span v-else class="i-lucide-loader-2 animate-spin"></span>
          <span class="font-medium">{{ loading ? '...' : 'Enviar e-mail' }}</span>
        </RainbowButton>
      </div>
      <div v-if="feedback" class="mt-2 text-xs" :class="feedback.success ? 'text-green-700' : 'text-red-700'">
        {{ feedback.message }}
      </div>
    </div>
    <div v-if="showCloseButton" class="mt-3 flex justify-center">
      <RainbowButton type="button" @click="emitClose" :class="'!text-black dark:!text-white'">Fechar</RainbowButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  recipient: string;
  showCloseButton?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'sent', payload: { success: boolean; message: string } | null): void;
}>();

const subject = ref('');
const message = ref('');
const loading = ref(false);
const feedback = ref<{ success: boolean; message: string } | null>(null);

const emitClose = () => emit('close');

const onSend = async () => {
  feedback.value = null;
  if (!subject.value.trim() || !message.value.trim()) {
    feedback.value = { success: false, message: 'Preencha o assunto e a mensagem' };
    emit('sent', feedback.value);
    return;
  }
  loading.value = true;
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-key': 'qualitec-admin-2024'
      },
      body: JSON.stringify({ subject: subject.value, message: message.value, to: props.recipient })
    });
    const data = await res.json();
    if (data.success) {
      feedback.value = { success: true, message: 'E-mail enviado com sucesso' };
      subject.value = '';
      message.value = '';
    } else {
      feedback.value = { success: false, message: data.message || 'Falha ao enviar e-mail' };
    }
    emit('sent', feedback.value);
  } catch (e: any) {
    feedback.value = { success: false, message: e?.message || 'Erro ao enviar e-mail' };
    emit('sent', feedback.value);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
</style>