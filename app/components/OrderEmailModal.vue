<template>
  <UiModal
    :visible="visible"
    :with-backdrop="true"
    :close-on-backdrop="true"
    :close-on-esc="true"
    :show-close-button="true"
    close-button-label="×"
    aria-label="Enviar por Email"
    :panel-class="'w-full max-w-md p-4 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md'"
    @close="emitClose"
  >
    <div class="space-y-4 text-sm">
      <h2 class="text-lg font-semibold">Enviar por Email</h2>

      <!-- Aviso de envio automático -->
      <div class="rounded-md border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30 p-3">
        <div class="flex items-start gap-2">
          <span class="i-lucide-info text-blue-600 dark:text-blue-300 mt-0.5"></span>
          <div>
            <div class="font-semibold text-blue-700 dark:text-blue-300">Envio Automático</div>
            <p class="mt-1 text-blue-700/90 dark:text-blue-200/90">
              O pedido será enviado automaticamente para
              <span class="font-medium">vendas2@qualitec.ind.br</span>
              com os dados de login da sua empresa. Você pode adicionar destinatários extras abaixo.
            </p>
          </div>
        </div>
      </div>

      <!-- Destinatários extras -->
      <div>
        <label class="mb-1 block text-xs label">Destinatários Extras (opcional, até 9 adicionais, separados por vírgula)</label>
        <UiInput v-model="extras" placeholder="email1@exemplo.com, email2@exemplo.com (opcional)" />
      </div>

      <!-- Assunto -->
      <div>
        <label class="mb-1 block text-xs label">Assunto</label>
        <UiInput v-model="subject" placeholder="Pedido Qualitec" />
      </div>

      <!-- Mensagem -->
      <div>
        <label class="mb-1 block text-xs label">Mensagem</label>
        <UiTextarea v-model="message" :rows="4" placeholder="Digite sua mensagem..." />
      </div>

      <!-- Nota sobre PDF -->
      <div class="rounded-md border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30 p-3 text-green-700 dark:text-green-300">
        <div class="flex items-center gap-2">
          <span class="i-lucide-check-circle"></span>
          <span>PDF do pedido anexado neste email</span>
        </div>
      </div>

      <!-- Ações -->
      <div class="mt-2 flex justify-end gap-2">
        <button type="button" class="px-3 py-2 rounded-md border text-sm" @click="emitClose" :disabled="loading">Cancelar</button>
        <RainbowButton
          type="button"
          @click="onSend"
          :disabled="loading"
          :class="'inline-flex items-center gap-2 h-10 px-4 rounded-md before:hidden !text-black dark:!text-white shadow-sm hover:shadow-md'"
          aria-label="Enviar Email"
        >
          <span v-if="!loading" class="i-lucide-send"></span>
          <span v-else class="i-lucide-loader-2 animate-spin"></span>
          <span class="font-medium">{{ loading ? 'Enviando...' : 'Enviar Email' }}</span>
        </RainbowButton>
      </div>

      <div v-if="feedback" class="text-xs" :class="feedback.success ? 'text-green-700' : 'text-red-700'">
        {{ feedback.message }}
      </div>
    </div>
  </UiModal>
  
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import UiModal from '~/components/ui/UiModal.vue';
import UiTextarea from '~/components/ui/UiTextarea.vue';
import RainbowButton from '~/components/ui/RainbowButton.vue';
import UiInput from '~/components/ui/Input.vue';

type CartItem = {
  id: string | number;
  title?: string;
  brand?: string;
  quantity: number;
  categoria?: string;
  diametro_montagem?: string;
  conexao_instrumento?: string;
  faixa_trabalho?: string;
  unidade_leitura?: string;
  notes?: string;
};

const props = defineProps<{ visible: boolean; orderPayload?: { items: CartItem[]; user: { email?: string; fullName?: string; sector?: string; whatsapp?: string }; empresaId?: number | null } }>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'sent', payload: { success: boolean; message: string } | null): void }>();

const subject = ref('Pedido Qualitec');
const message = ref('Segue o pedido Qualitec em anexo.');
const extras = ref('');
const loading = ref(false);
const feedback = ref<{ success: boolean; message: string } | null>(null);
const autoSent = ref(false);

function emitClose() { emit('close'); }

async function onSend() {
  feedback.value = null;
  const s = subject.value.trim();
  const m = message.value.trim();
  if (!s || !m) {
    feedback.value = { success: false, message: 'Preencha o assunto e a mensagem.' };
    emit('sent', feedback.value);
    return;
  }
  loading.value = true;
  try {
    // Monta lista de destinatários: fixo + extras (se houver)
    const base = 'vendas2@qualitec.ind.br';
    const extra = extras.value.trim();
    const to = extra ? `${base}, ${extra}` : base;
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-key': 'qualitec-admin-2024'
      },
      body: JSON.stringify({ subject: s, message: m, to, order: props.orderPayload })
    });
    const data = await res.json();
    if (data.success) {
      feedback.value = { success: true, message: 'Email enviado com sucesso!' };
      // Opcional: limpar campos
      // subject.value = 'Pedido Qualitec';
      // message.value = '';
      // extras.value = '';
    } else {
      feedback.value = { success: false, message: data.message || 'Falha ao enviar email.' };
    }
    emit('sent', feedback.value);
  } catch (e: any) {
    feedback.value = { success: false, message: e?.message || 'Erro ao enviar.' };
    emit('sent', feedback.value);
  } finally {
    loading.value = false;
  }
}

// Envio automático ao abrir o modal
watch(() => props.visible, async (isOpen) => {
  if (!isOpen || autoSent.value) return;
  autoSent.value = true; // evita múltiplos envios em reaberturas
  feedback.value = null;
  const s = subject.value.trim() || 'Pedido Qualitec';
  const m = message.value.trim() || 'Segue o pedido Qualitec em anexo.';
  try {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-admin-key': 'qualitec-admin-2024'
      },
      body: JSON.stringify({ subject: s, message: m, to: 'vendas2@qualitec.ind.br', order: props.orderPayload })
    });
    const data = await res.json();
    if (data.success) {
      feedback.value = { success: true, message: 'Enviado automaticamente para vendas2@qualitec.ind.br.' };
      emit('sent', feedback.value);
    } else {
      feedback.value = { success: false, message: data.message || 'Falha no envio automático.' };
    }
  } catch (e: any) {
    feedback.value = { success: false, message: e?.message || 'Erro no envio automático.' };
  }
});
</script>

<style scoped>
.label { color: var(--muted); }
</style>