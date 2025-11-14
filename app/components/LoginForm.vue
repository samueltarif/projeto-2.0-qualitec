<template>
  <form @submit.prevent="login">
    <div class="mb-4">
      <label for="email" class="label">Email</label>
      <UiInput id="email" type="email" v-model="user.email" placeholder="Email" required />
    </div>
    <div class="mb-6">
      <label for="cnpj-login" class="label">CNPJ</label>
      <ClientOnly>
        <UiInput id="cnpj-login" v-model="user.cnpj" placeholder="00.000.000/0000-00" required v-mask="'##.###.###/####-##'" />
      </ClientOnly>
    </div>
    <div class="mt-2 flex justify-center">
      <ShimmerButton type="submit" class="h-11 px-5">Entrar</ShimmerButton>
    </div>
    <div class="mt-3 flex justify-center">
      <AboutQualitecButton class="w-auto" @click="openAbout" />
    </div>

    <WelcomeOverlay :visible="showWelcome" />

    <!-- Modal reutilizável com PDF incorporado -->
    <UiModal
      :visible="showAbout"
      @close="closeAbout"
      :panelClass="'w-[92vw] h-[80vh] p-0 overflow-hidden'"
      aria-label="Apresentação Qualitec"
    >
      <!-- PDF incorporado para visualização e rolagem -->
      <object :data="aboutPdfUrl" type="application/pdf" class="w-full h-full">
        <iframe :src="aboutPdfUrl" class="w-full h-full" />
        Seu navegador não suporta visualização embutida de PDF.
        <a :href="aboutPdfUrl" target="_blank" rel="noopener">Abrir o PDF em nova aba</a>.
      </object>
    </UiModal>

  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onlyDigits } from '~/composables/useCnpj';
import ShimmerButton from './ShimmerButton.vue';
import AboutQualitecButton from './AboutQualitecButton.vue';
import WelcomeOverlay from './WelcomeOverlay.vue';
import UiModal from './ui/UiModal.vue';
import { useUserProfile } from '~/composables/useUserProfile';
import { useFavorites } from '~/composables/useFavorites';
// VideoMaskedText removido
const emit = defineEmits<{ (e: 'user-not-registered'): void }>();

const user = ref({
  email: "",
  cnpj: "",
});

const login = async () => {
  const payload = {
    email: user.value.email.toUpperCase(),
    cnpj: user.value.cnpj,
  };
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (data.success) {
    // Grava email/empresa e carrega perfil do servidor para este usuário
    try {
      const { setEmail, setEmpresaId, refreshFromServer } = useUserProfile();
      setEmail(payload.email);
      setEmpresaId(data?.user?.empresa_id);
      await refreshFromServer();
      // Recarrega favoritos do servidor para este usuário
      try { const { refreshFromServer: refreshFavorites } = useFavorites(); await refreshFavorites(); } catch (_) {}
    } catch (_) {}
    showWelcome.value = true;
    setTimeout(() => {
      showWelcome.value = false;
      // Evita navegação redundante que pode gerar net::ERR_ABORTED em dev
      const current = router.currentRoute?.value?.path;
      if (current !== '/produtos') {
        router.replace('/produtos').catch(() => {});
      }
    }, 2200);
  } else {
    alert(data.message);
    // Se a empresa existe mas o usuário ainda não foi cadastrado, sugira o cadastro
    try {
      const digits = onlyDigits(user.value.cnpj);
      if (digits.length === 14) {
        const resp = await fetch('/api/get-company-by-cnpj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cnpj: digits })
        });
        const info = await resp.json();
        if (info?.success) {
          emit('user-not-registered');
        }
      }
    } catch (e) {
      // silencioso: caso falhe a checagem, não impede o fluxo
    }
  }
};
const showWelcome = ref(false);
const router = useRouter();

// Controle do popup "Sobre a Qualitec"
const showAbout = ref(false);
const openAbout = () => { showAbout.value = true; };
const closeAbout = () => { showAbout.value = false; };

// Caminho do PDF na pasta public (URL encoded)
const aboutPdfUrl = '/arquivos%20pdf/Apresenta%C3%A7%C3%A3o%20Qualitec%202024%20-%20Impressa%20_%20WEB.pdf';
</script>