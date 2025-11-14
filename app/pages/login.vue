<template>
  <div class="relative flex h-screen flex-col items-center justify-center">
    <!-- Fundo com suporte a tema claro/escuro -->
    <div class="absolute inset-0 z-0 pointer-events-none bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:bg-gradient-to-br dark:from-neutral-900 dark:via-neutral-800 dark:to-blue-900 transition-colors"></div>
    <div class="z-[1] w-full max-w-md p-8 card">
      <div class="mb-4 border-b tab-border">
        <ul class="-mb-px flex flex-nowrap items-center text-center text-sm font-medium" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          <li class="mr-2" role="presentation">
            <UiTabButton id="login-tab" target="#login" aria-controls="login" :selected="activeTab === 'login'" @click="activeTab = 'login'">Login</UiTabButton>
          </li>
          <li class="mr-2" role="presentation">
            <UiTabButton id="register-tab" target="#register" aria-controls="register" :selected="activeTab === 'register'" @click="activeTab = 'register'">Cadastro de Empresa</UiTabButton>
          </li>
          <li class="mr-2" role="presentation">
            <UiTabButton id="register-user-tab" target="#register-user" aria-controls="register-user" :selected="activeTab === 'register-user'" @click="activeTab = 'register-user'" :attention="highlightRegisterUser">Cadastro de Usuário</UiTabButton>
          </li>
          <li class="mr-2" role="presentation">
            <div class="inline-flex items-center">
              <UiButton variant="outline" size="xs" class="ml-2" type="button" @click="toggleUserHelp">Ajuda</UiButton>
            </div>
          </li>
        </ul>
        <!-- Ajuda como popup (modal) -->
        <UiModal
          :visible="showUserHelp"
          :with-backdrop="true"
          :close-on-backdrop="true"
          :close-on-esc="true"
          :show-close-button="true"
          close-button-label="Fechar"
          aria-label="Ajuda — Enviar email"
          :panelClass="'w-full max-w-md p-4 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md'"
          @close="toggleUserHelp"
        >
          <UiSendEmailModal
            :recipient="salesEmail"
            :showCloseButton="false"
            @sent="onHelpSent"
          />
        </UiModal>
        <UiModal
          :visible="showRateFeedback"
          :with-backdrop="true"
          :close-on-backdrop="true"
          :close-on-esc="true"
          :show-close-button="true"
          close-button-label="Fechar"
          aria-label="Avalia-nos — Enviar feedback"
          :panelClass="'w-full max-w-md p-4 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md'"
          @close="() => showRateFeedback = false"
        >
          <UiSendEmailModal
            :recipient="salesEmail"
            :showCloseButton="false"
            @sent="onHelpSent"
          />
        </UiModal>
      </div>
      <div id="myTabContent">
        <div :class="['rounded-lg bg-gray-50 p-4 dark:bg-gray-800', activeTab === 'login' ? '' : 'hidden']" id="login" role="tabpanel" aria-labelledby="login-tab">
          <LoginForm @user-not-registered="onUserNotRegistered" />
        </div>
        <div :class="['rounded-lg bg-gray-50 p-4 dark:bg-gray-800', activeTab === 'register' ? '' : 'hidden']" id="register" role="tabpanel" aria-labelledby="register-tab">
          <RegisterForm />
        </div>
        <div :class="['rounded-lg bg-gray-50 p-4 dark:bg-gray-800', activeTab === 'register-user' ? '' : 'hidden']" id="register-user" role="tabpanel" aria-labelledby="register-user-tab">
          <UserRegisterForm />
        </div>
      </div>

      <!-- Pop-up de aviso para cadastro de usuário -->
      <UiModal :visible="showRegisterHint" @close="closeRegisterHint" aria-label="Aviso de Cadastro" :panelClass="'w-full max-w-md p-4'" :showCloseButton="false">
        <div class="text-center">
          <p class="text-lg font-semibold mb-2">Você precisa se cadastrar antes!</p>
          <p class="text-sm text-neutral-600 dark:text-neutral-300 mb-4">Use a aba "Cadastro de Usuário" para criar seu acesso.</p>
          <div class="mt-2 flex justify-center">
            <RainbowButton
              type="button"
              data-testid="go-to-register"
              aria-label="Ir para formulário de cadastro"
              @click="onGoToRegisterClick"
              :class="'attention-btn !text-black dark:!text-white'"
            >
              Ir para cadastro
            </RainbowButton>
          </div>
        </div>
      </UiModal>

      <div class="mt-6 border-t pt-6">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold">Avalia-nos</h3>
          <div class="flex items-center gap-1" aria-label="Avaliação">
            <button v-for="n in 5" :key="n" type="button" @mouseenter="hoverRating = n" @mouseleave="hoverRating = 0" @click="setRating(n)" :aria-label="`Dar ${n} estrela(s)`" :class="['transition-colors', (hoverRating >= n || rating >= n) ? 'text-yellow-400' : 'text-gray-400']">★</button>
          </div>
        </div>
        <p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Sua opinião nos ajuda a melhorar.</p>
        <div class="mt-4 flex gap-2">
          <UiButton variant="outline" size="sm" @click="showRateFeedback = true">Enviar feedback</UiButton>
          <a :href="googleReviewUrl" target="_blank" rel="noopener" class="inline-flex items-center rounded-lg border px-3 py-2 text-sm transition-colors border-green-300 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400">Avaliar no Google</a>
        </div>
      </div>
    </div>
    <!-- Preview responsivo em moldura de dispositivo móvel removido -->
    <!-- MobileDeviceFrame removido conforme solicitado -->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useColorMode } from "@vueuse/core";
import { initFlowbite } from 'flowbite';
import RainbowButton from '~/components/ui/RainbowButton.vue';
import { useRuntimeConfig } from '#imports';
import UiModal from '~/components/ui/UiModal.vue';
import UiSendEmailModal from '~/components/ui/UiSendEmailModal.vue';

const isDark = computed(() => useColorMode().value === "dark");
// usa CSS variables para cores; sem necessidade de bgColor manual

const showUserHelp = ref(false);
const toggleUserHelp = () => { showUserHelp.value = !showUserHelp.value; };

// Destaque a aba "Cadastro de Usuário" quando o login falhar
const highlightRegisterUser = ref(false);
const onUserNotRegistered = () => {
  highlightRegisterUser.value = true;
  showRegisterHint.value = true;
  goToRegisterUser();
  setTimeout(() => { highlightRegisterUser.value = false; }, 1600);
};

// Controle do modal de aviso
import { useAuthFlow } from '~/composables/useAuthFlow';
const { activeTab, showRegisterHint, goToRegisterUser, closeRegisterHint } = useAuthFlow();

function onGoToRegisterClick() {
  goToRegisterUser();
  closeRegisterHint();
}

// Fechar o popup de ajuda automaticamente após envio bem-sucedido
function onHelpSent(payload: { success: boolean; message: string } | null) {
  if (payload?.success) {
    showUserHelp.value = false;
  }
}

const runtimeConfig = useRuntimeConfig();
const salesEmail: string = (runtimeConfig.public?.salesEmail as string) || 'vendas2@qualitec.ind.br';

const rating = ref(0);
const hoverRating = ref(0);
function setRating(n: number) {
  rating.value = n;
}

const showRateFeedback = ref(false);
const googleReviewUrl = 'https://www.google.com/search?q=qualitec+fazendo+de+monte+alegre+367&rlz=1C1GCEA_enBR1169BR1169&oq=qualitec+fazendo+de+monte+alegre+367&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIKCAIQABiABBiiBDIHCAMQABjvBTIKCAQQABiiBBiJBTIKCAUQABiABBiiBNIBCTg4NjcwajBqNKgCALACAQ&sourceid=chrome&ie=UTF-8#lrd=0x94ce580092c976ef:0xb1237dda7e083517,3,,,,';

// removido duplicado de isDark/bgColor

onMounted(() => {
  initFlowbite();
});

// MobileDeviceFrame removido: nenhuma imagem de preview é necessária
</script>

<style scoped>
@keyframes popBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}
@keyframes popJump {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
.attention-btn {
  animation: popBlink 0.9s ease-in-out infinite, popJump 1.2s ease-in-out infinite;
}
</style>