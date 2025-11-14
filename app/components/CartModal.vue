<template>
  <UiModal
    :visible="visible"
    :with-backdrop="true"
    :close-on-backdrop="true"
    :close-on-esc="true"
    :show-close-button="true"
    close-button-label="Fechar"
    aria-label="Carrinho de Produtos"
    :panel-class="'w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md'"
    @close="emitClose"
  >
  <div class="space-y-6">
      <!-- Cabeçalho -->
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Carrinho de Produtos</h2>
        <span class="mt-[1cm] text-sm text-neutral-600 dark:text-neutral-300" v-if="count > 0">{{ count }} itens</span>
      </div>

      <!-- Lista de itens -->
      <div v-if="items.length > 0" class="space-y-6">
        <div
          v-for="p in items"
          :key="p.id"
          class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-800/40 shadow-sm">
          <div class="px-4 py-4 flex items-start justify-between">
            <div>
              <div class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{{ p.title || ('Produto ' + p.id) }}</div>
              <div class="text-xs text-neutral-600 dark:text-neutral-300">Categoria: {{ p.categoria || '—' }}</div>
            </div>
            <div class="flex items-center gap-4">
              <UiDetailsButton :item="p" />
              <UiRemoveTextButton @click="onRemove(p.id)" />
            </div>
          </div>

          <div class="px-4 pb-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Quantidade -->
              <div>
                <label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Quantidade</label>
                <input
                  type="number"
                  min="1"
                  :value="p.quantity"
                  @input="onQtyInput(p.id, $event)"
                  class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              <!-- Observações -->
              <UiTextarea
                label="Observações"
                :modelValue="p.notes || ''"
                placeholder="Adicione observações sobre este item..."
                :rows="3"
                @update:modelValue="onNotesUpdate(p.id, $event)"
              />
              </div>

            <!-- Especificações técnicas (somente leitura) -->
            <div class="mt-6">
              <div class="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">Especificações Técnicas</div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-neutral-500 dark:text-neutral-400">Diâmetro</label>
                  <div class="mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100">
                    {{ p.diametro_montagem || '—' }}
                  </div>
                </div>
                <div>
                  <label class="block text-xs text-neutral-500 dark:text-neutral-400">Conexão</label>
                  <div class="mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100">
                    {{ p.conexao_instrumento || '—' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vazio -->
      <div v-else class="rounded-lg border border-dashed border-neutral-300/70 dark:border-neutral-700/70 h-40 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
        Seu carrinho está vazio.
      </div>

      <!-- Ações -->
      <div class="flex flex-wrap items-center gap-3 pt-2">
        <UiClearCartButton @click="onClear()" />
        <UiSendOrderButton @click="sendOrder()" />
        <UiDownloadButton @click="download()" />
        <RainbowButton type="button" :class="'gap-2 text-sm !text-black dark:!text-white'" @click="goBackToProducts" aria-label="Voltar aos Produtos">
          <span class="i-lucide-arrow-left"></span>
          <span class="font-medium">Voltar aos Produtos</span>
        </RainbowButton>
      </div>
    </div>
  </UiModal>
  
  <!-- Popup de "Enviar por Email" -->
  <OrderEmailModal :visible="showSendEmail" :orderPayload="orderPayload" @close="showSendEmail = false" />
</template>

<script setup lang="ts">
import UiModal from '~/components/ui/UiModal.vue';
import UiTextarea from '~/components/ui/UiTextarea.vue';
import UiDetailsButton from '~/components/UiDetailsButton.vue';
import UiRemoveTextButton from '~/components/UiRemoveTextButton.vue';
import UiClearCartButton from '~/components/UiClearCartButton.vue';
import UiSendOrderButton from '~/components/UiSendOrderButton.vue';
import UiDownloadButton from '~/components/UiDownloadButton.vue';
import RainbowButton from '~/components/ui/RainbowButton.vue';
import OrderEmailModal from '~/components/OrderEmailModal.vue';
import { useCart } from '~/composables/useCart';
import { useUserProfile } from '~/composables/useUserProfile';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

interface Props { visible: boolean }
const props = defineProps<Props>();
const emit = defineEmits<{ (e: 'close'): void; (e: 'details', payload?: any): void }>();

const { items, count, remove, clear, setQuantity, setNotes } = useCart() as any;
const router = useRouter();
const showSendEmail = ref(false);
const profile = useUserProfile();

const orderPayload = computed(() => ({
  items: (items?.value ?? items) as any,
  user: {
    email: profile.email?.value ?? '',
    fullName: profile.fullName?.value ?? '',
    sector: profile.sector?.value ?? '',
    whatsapp: profile.whatsapp?.value ?? '',
  },
  empresaId: profile.empresaId?.value ?? null,
}));

function emitClose() { emit('close'); }
function emitDetails(p: any) { emit('details', p); }

function onRemove(id: string | number) {
  remove?.(id);
  // Se ficar vazio, fechar e voltar para catálogos
  if ((items?.value?.length ?? items.length) === 0) {
    emitClose();
    const current = router.currentRoute?.value?.path;
    if (current !== '/produtos') {
      router.replace('/produtos').catch(() => {});
    }
  }
}

function onQtyInput(id: string | number, e: Event) {
  const val = Number((e.target as HTMLInputElement).value || '1');
  setQuantity?.(id, isNaN(val) ? 1 : Math.max(1, val));
}
function onNotesUpdate(id: string | number, text: string) {
  setNotes?.(id, String(text ?? ''));
}

function sendOrder() {
  // Abre o popup de envio de email sem fechar o carrinho
  showSendEmail.value = true;
}
async function download() {
  try {
    const payload = orderPayload.value as any;
    if (!payload?.items || (Array.isArray(payload.items) && payload.items.length === 0)) {
      alert('Seu carrinho está vazio.');
      return;
    }
    const resp = await fetch('/api/download-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) throw new Error('Falha ao gerar arquivos.');
    const blob = await resp.blob();
    const ts = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
    const filename = `pedido_qualitec_${ts}.zip`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (_) {
    alert('Não foi possível baixar os arquivos. Tente novamente.');
  }
}

function onClear() {
  clear?.();
  emitClose();
  const current = router.currentRoute?.value?.path;
  if (current !== '/produtos') {
    router.replace('/produtos').catch(() => {});
  }
}

function goBackToProducts() {
  emitClose();
  const current = router.currentRoute?.value?.path;
  if (current !== '/produtos') {
    router.replace('/produtos').catch(() => {});
  }
}
</script>

<style scoped>
</style>