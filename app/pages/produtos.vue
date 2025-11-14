<template>
  <section class="min-h-screen w-full relative overflow-hidden">
    <!-- Fundo neutro (branco gelo) vem de var(--bg) em theme.css -->

    <div class="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 2xl:px-6 py-8">
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar de filtros (client-only para evitar divergências SSR de subcomponentes inline) -->
        <ClientOnly>
          <CatalogFilterSidebar :results-count="resultsCount" :current-page="currentPage" :page-size="pageSize" @filters-change="onFiltersChange" />
        </ClientOnly>

        <!-- Área de resultados em cards (componente) -->
        <ProductsGrid
          :items="items"
          :loading="loading"
          :results-count="resultsCount"
          :selected-category="selectedCategory"
          :current-page="currentPage"
          :total-pages="totalPages"
          @details="onDetails"
          @compare="onCompare"
          @cart="addToCart"
          @prev="prevPage"
          @next="nextPage"
        />

        <!-- Painel de comparações à direita -->
        <ClientOnly>
          <CompareSidebar />
        </ClientOnly>
      </div>
    </div>
  </section>
  <ClientOnly>
    <div class="fixed bottom-6 right-6 z-50 pointer-events-none">
      <div v-if="!chatOpen" class="flex justify-end pointer-events-auto">
        <RainbowButton type="button" :class="'gap-2 px-4 py-2 text-sm !text-black dark:!text-white rounded-full shadow-lg'" @click="openChat" aria-label="Abrir Chat">
          <span class="i-lucide-message-circle"></span>
          <span>Chat</span>
        </RainbowButton>
      </div>
      <div v-else class="w-[92vw] max-w-sm sm:max-w-md md:max-w-lg pointer-events-auto">
        <div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-xl">
          <div class="flex items-center justify-between px-4 py-3">
            <div class="flex items-center gap-2">
              <span class="i-lucide-bot"></span>
              <span class="text-sm font-semibold">Assistente</span>
            </div>
            <button type="button" class="rounded-md px-2 py-1 text-sm" @click="closeChat" aria-label="Fechar">×</button>
          </div>
          <div class="h-[50vh] max-h-[60vh] overflow-y-auto px-4 py-2 space-y-3">
            <div v-for="(m, idx) in messages" :key="idx" :class="m.role === 'user' ? 'flex justify-end' : 'flex justify-start'">
              <div :class="m.role === 'user' ? 'max-w-[80%] rounded-lg bg-blue-50 dark:bg-blue-900/40 text-neutral-900 dark:text-neutral-100 px-3 py-2' : 'max-w-[80%] rounded-lg bg-neutral-100 dark:bg-neutral-800/60 text-neutral-800 dark:text-neutral-100 px-3 py-2'">
                <p class="text-sm whitespace-pre-wrap">{{ m.content }}</p>
              </div>
            </div>
            <div v-if="loadingChat" class="flex justify-start">
              <div class="rounded-lg bg-neutral-100 dark:bg-neutral-800/60 px-3 py-2">
                <span class="i-lucide-loader-2 animate-spin"></span>
              </div>
            </div>
          </div>
          <div class="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
            <div class="flex flex-col gap-3">
              <div v-if="chatLastItems.length" class="flex flex-wrap items-center gap-2">
                <RainbowButton type="button" :class="'gap-2 px-3 py-2 text-sm !text-black dark:!text-white'" @click="downloadPdfFromChat">
                  <span class="i-lucide-file-down"></span>
                  <span>Baixar PDF</span>
                </RainbowButton>
                <RainbowButton type="button" :class="'gap-2 px-3 py-2 text-sm !text-black dark:!text-white'" @click="confirmSendEmail" :disabled="sendingEmail">
                  <span v-if="sendingEmail" class="i-lucide-loader-2 animate-spin"></span>
                  <span v-else-if="emailSent" class="i-lucide-check"></span>
                  <span v-else class="i-lucide-mail"></span>
                  <span>{{ sendingEmail ? 'Enviando…' : (emailSent ? 'E-mail enviado' : 'Enviar por e-mail') }}</span>
                </RainbowButton>
                <RainbowButton v-if="showCompareAction" type="button" :class="'gap-2 px-3 py-2 text-sm !text-black dark:!text-white'" @click="compareTopResults">
                  <span class="i-lucide-git-compare"></span>
                  <span>Comparar</span>
                </RainbowButton>
              </div>
              <div v-if="chatLastItems.length && chatLastItems.length <= 3" class="flex flex-col gap-2">
                <div class="text-xs text-neutral-600 dark:text-neutral-300">Selecione quais produtos enviar por e-mail:</div>
                <div v-for="p in chatLastItems.slice(0,3)" :key="p.id" class="flex items-center gap-2">
                  <input type="checkbox" :checked="selectedEmailIds.includes(String(p.part_number || p.id))" @change="toggleEmailSelection(String(p.part_number || p.id))" />
                  <span class="text-sm">{{ p.part_number || p.id }} · {{ (p.faixa_trabalho || '') + (p.unidade_leitura ? ' ' + p.unidade_leitura : '') }}</span>
                </div>
                <div>
                  <RainbowButton type="button" :class="'gap-2 px-3 py-1 text-xs !text-black dark:!text-white'" @click="selectAllEmail">Selecionar todos</RainbowButton>
                </div>
              </div>
              <div v-if="chatAskEmail" class="flex items-center gap-2">
                <input type="text" v-model="emailTargets" placeholder="Informe email(s), separados por vírgula" class="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 px-3 py-2 text-sm" aria-label="Email(s)" />
              </div>
              <form @submit.prevent="sendMessage" class="flex items-center gap-2">
                <input type="text" v-model="userInput" placeholder="Digite sua pergunta..." class="flex-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 px-3 py-2 text-sm" aria-label="Mensagem" />
                <RainbowButton type="submit" :class="'gap-2 px-3 py-2 text-sm !text-black dark:!text-white'" aria-label="Enviar">
                  <span class="i-lucide-send"></span>
                  <span>Enviar</span>
                </RainbowButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import CatalogFilterSidebar from '../components/CatalogFilterSidebar.vue';
import ProductActionButtons from '../components/ProductActionButtons.vue';
import ProductsGrid from '../components/ProductsGrid.vue';
import CompareSidebar from '../components/CompareSidebar.vue';
import RainbowButton from '../components/ui/RainbowButton.vue';
import { ref, computed } from 'vue';
import { useUserProfile } from '~/composables/useUserProfile';
import { useCompare } from '~/composables/useCompare';
// Fundo “branco gelo” já está aplicado globalmente por var(--bg) em theme.css

// Estado mínimo para integração do contador (sem simulação)
const resultsCount = ref(0);
const currentPage = ref(1);
const pageSize = ref(6);
const selectedCategory = ref('Todas as categorias');
const activeFiltersState = ref<Record<string, string | null>>({});
const items = ref<any[]>([]);
const loading = ref(false);

const totalPages = computed(() => Math.max(1, Math.ceil(resultsCount.value / pageSize.value)));

function onFiltersChange(payload: { category: string; filters: Record<string, string | null> }) {
  selectedCategory.value = payload.category;
  activeFiltersState.value = payload.filters;
  currentPage.value = 1;
  fetchProducts();
}

async function fetchProducts() {
  loading.value = true;
  try {
    const data: any = await $fetch('/api/produtos/search', {
      params: {
        categoria: selectedCategory.value,
        page: currentPage.value,
        pageSize: pageSize.value,
        filters: JSON.stringify(activeFiltersState.value)
      }
    });
    items.value = data?.items || [];
    resultsCount.value = data?.total || 0;
  } catch (e) {
    // silencioso
  } finally {
    loading.value = false;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
    fetchProducts();
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
    fetchProducts();
  }
}

function formatPreco(p: number) {
  try {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(p || 0));
  } catch {
    return String(p ?? '');
  }
}

function formatFaixa(item: any) {
  const faixa = item?.faixa_trabalho ? String(item.faixa_trabalho) : '';
  const unidade = item?.unidade_leitura ? String(item.unidade_leitura) : '';
  return `${faixa}${unidade ? ' ' + unidade : ''}`;
}

function onDetails(item: any) {
  // Navega para página de detalhes quando houver rota específica
  // Por enquanto, apenas log para validação
  console.log('Detalhes', item?.id || item?.part_number);
}

function onCompare(item: any) {
  console.log('Comparar', item?.id || item?.part_number);
}

function addToCart(item: any) {
  console.log('Adicionar ao carrinho', item?.id || item?.part_number);
}

const chatOpen = ref(false);
const messages = ref<{ role: 'user' | 'assistant'; content: string }[]>([]);
const userInput = ref('');
const loadingChat = ref(false);
const chatLastItems = ref<any[]>([]);
const chatAskEmail = ref(false);
const emailTargets = ref('');
const sendingEmail = ref(false);
const showCompareAction = ref(false);
const selectedEmailIds = ref<string[]>([]);
const emailSent = ref(false);
function openChat() {
  chatOpen.value = true;
  if (!messages.value.length) {
    messages.value.push({
      role: 'assistant',
      content: `👋 Bem-vindo ao Chat de Busca Técnica da Qualitec!
Descreva o produto que procura (ex: “manômetro 2½” 0–6 bar ¼ NPT”).

💡 Eu reconheço termos como rosca, polegada, glicerina, faixa de pressão, etc.

⚠️ Este chat é apenas para busca de produtos, não para suporte geral.`
    });
  }
}
function closeChat() { chatOpen.value = false; }
async function sendMessage() {
  const text = String(userInput.value || '').trim();
  if (!text) return;
  messages.value.push({ role: 'user', content: text });
  userInput.value = '';
  loadingChat.value = true;
  try {
    const { email, empresaId } = useUserProfile();
    const resp: any = await $fetch('/api/chat', { method: 'POST', body: { messages: messages.value, userEmail: email.value, empresaId: empresaId.value } });
    const t = resp?.text || 'Desculpe, não consegui responder agora.';
    messages.value.push({ role: 'assistant', content: t });
    chatLastItems.value = Array.isArray(resp?.items) ? resp.items : [];
    chatAskEmail.value = /Informe seu endereço de email/i.test(t);
    showCompareAction.value = Number(resp?.total || 0) >= 2 && Number(resp?.total || 0) <= 3;
    if ((Number(resp?.total || 0) || chatLastItems.value.length) <= 3) {
      selectedEmailIds.value = (chatLastItems.value || []).slice(0, 1).map((p: any) => String(p.part_number || p.id));
    } else {
      selectedEmailIds.value = [];
    }
    if (resp?.filters || resp?.categoria) {
      selectedCategory.value = resp?.categoria || selectedCategory.value;
      const obj = resp?.filters || {};
      const normalized: Record<string, string | null> = {};
      for (const [k, v] of Object.entries(obj)) {
        const val = v == null ? null : String(v);
        normalized[k] = val;
      }
      activeFiltersState.value = normalized;
      currentPage.value = 1;
      await fetchProducts();
    }
  } catch (_) {
    messages.value.push({ role: 'assistant', content: 'Ocorreu um erro ao responder.' });
  } finally {
    loadingChat.value = false;
  }
}

function buildOrderItemsSelected(): any[] {
  const list = Array.isArray(chatLastItems.value) ? chatLastItems.value : [];
  const ids = new Set((selectedEmailIds.value || []).map((s) => String(s)));
  const chosen = list.filter((p: any) => ids.has(String(p.part_number || p.id)));
  const base = chosen.length ? chosen : list.slice(0, 1);
  return base.map((p: any) => ({
    id: p.part_number || p.id,
    title: p.part_number || '',
    brand: p.fabricante || 'QUALITEC',
    quantity: 1,
    categoria: p.categoria,
    diametro_montagem: p.diametro_montagem,
    conexao_instrumento: p.conexao_instrumento,
    faixa_trabalho: p.faixa_trabalho,
    unidade_leitura: p.unidade_leitura,
    tipo_medicao: p.tipo_medicao,
    posicao_montagem: p.posicao_montagem,
    material_involucro: p.material_involucro,
    material_internos: p.material_internos,
    visor: p.visor,
    classe_exatidao: p.classe_exatidao,
    glicerina: p.glicerina,
    certificados: p.certificados,
    tubo_sifao: p.tubo_sifao,
    selo_diafragma: p.selo_diafragma,
    contato_eletrico: p.contato_eletrico,
    valvula_isolamento: p.valvula_isolamento,
  }));
}

function toggleEmailSelection(id: string) {
  const s = String(id);
  const idx = selectedEmailIds.value.indexOf(s);
  if (idx >= 0) selectedEmailIds.value.splice(idx, 1);
  else selectedEmailIds.value.push(s);
}

function selectAllEmail() {
  selectedEmailIds.value = (Array.isArray(chatLastItems.value) ? chatLastItems.value : []).slice(0, 3).map((p: any) => String(p.part_number || p.id));
}

async function downloadPdfFromChat() {
  const { email, fullName, sector, whatsapp, empresaId } = useUserProfile();
  const selected = buildOrderItemsSelected();
  const items = selected.length ? selected.slice(0, 1) : [];
  if (selectedEmailIds.value.length > 1) {
    messages.value.push({ role: 'assistant', content: 'Para baixar, selecione apenas 1 produto nas opções acima.' });
  }
  const order = { items, user: { email: email.value, fullName: fullName.value, sector: sector.value, whatsapp: whatsapp.value }, empresaId: empresaId.value };
  const res = await fetch('/api/download-order?format=pdf', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
  const blob = await res.blob();
  const dispo = res.headers.get('Content-Disposition') || '';
  let filename = 'pedido_qualitec.pdf';
  const m = /filename="([^"]+)"/i.exec(dispo || '');
  if (m) filename = m[1];
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function confirmSendEmail() {
  if (sendingEmail.value) return;
  sendingEmail.value = true;
  emailSent.value = false;
  try {
    const { email, empresaId } = useUserProfile();
    const toStr = String(emailTargets.value || email.value || '').trim();
    if (!toStr) {
      chatAskEmail.value = true;
      messages.value.push({ role: 'assistant', content: 'Informe seu endereço de email para eu enviar o PDF.' });
      return;
    }
    const body = { action: 'send_email', userEmail: toStr, empresaId: empresaId.value, order: { items: buildOrderItemsSelected(), user: {} } } as any;
    const resp: any = await $fetch('/api/chat', { method: 'POST', body });
    const t = resp?.text || 'Desculpe, não consegui responder agora.';
    messages.value.push({ role: 'assistant', content: t });
    chatAskEmail.value = /Informe seu endereço de email/i.test(t);
    if (resp?.success || /Enviei o PDF do produto/i.test(t)) {
      emailSent.value = true;
      setTimeout(() => { emailSent.value = false; }, 4000);
    }
  } catch (_) {
    messages.value.push({ role: 'assistant', content: 'Ocorreu um erro ao enviar por email.' });
  } finally {
    sendingEmail.value = false;
  }
}

function compareTopResults() {
  const { add } = useCompare();
  const list = (Array.isArray(chatLastItems.value) ? chatLastItems.value : []).slice(0, 3);
  let added = 0;
  for (const p of list) {
    const id = p.id ?? p.part_number ?? p.codigo ?? p.sku;
    const title = p.nome ?? p.descricao ?? p.titulo ?? p.part_number ?? (id != null ? `Produto ${id}` : 'Produto');
    const brand = p.fabricante ?? p.marca ?? 'QUALITEC';
    if (id != null) {
      const res = add({ id, title, brand });
      if (res?.ok) added++;
    }
  }
  if (added >= 2) {
    messages.value.push({ role: 'assistant', content: 'Adicionei os produtos para comparação.' });
  } else {
    messages.value.push({ role: 'assistant', content: 'Não foi possível preparar a comparação.' });
  }
}
</script>