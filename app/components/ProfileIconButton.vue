<template>
  <button
    type="button"
    :aria-label="derivedTitle"
    :title="derivedTitle"
    :class="buttonClass"
    @click="onClick"
  >
    <ProfileIcon :size="iconSize" :strokeColor="strokeColor" />
  </button>
  <ProfileModal
    :visible="showProfile"
    :initialFullName="fullName"
    :initialSector="sector"
    :initialWhatsapp="whatsapp"
    @close="showProfile = false"
    @save="handleSave"
  />
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import ProfileIcon from '~/components/ProfileIcon.vue';
import ProfileModal from '~/components/ProfileModal.vue';
import { useUserProfile } from '~/composables/useUserProfile';

interface Props {
  ariaLabel?: string;
  title?: string;
  size?: string; // dimensões do botão, ex: 'w-8 h-8 sm:w-9 sm:h-9'
  strokeColor?: string; // cor do traço do ícone, padrão 'currentColor'
  class?: string; // classes adicionais
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Perfil',
  title: 'Perfil',
  size: 'w-8 h-8 sm:w-9 sm:h-9',
  strokeColor: 'currentColor',
});

const emit = defineEmits<{ (e: 'click'): void; (e: 'save', payload: { fullName: string; sector: string; whatsapp: string; }): void }>();
const showProfile = ref(false);
const { email, empresaId, fullName, sector, whatsapp, isIncomplete, saveProfile, refreshFromServer } = useUserProfile();

const mounted = ref(false);
onMounted(() => { mounted.value = true; });

const buttonClass = computed(() => {
  const base = [
    'inline-flex items-center justify-center flex-none shrink-0',
    props.size,
    'rounded-xl border',
    'bg-white/60 dark:bg-neutral-800/40',
    'backdrop-blur-md transition-colors',
    props.class,
  ];
  if (!mounted.value) {
    // SSR/primeira pintura: usa estilo neutro para evitar mismatch
    base.push('border-white/40 dark:border-neutral-800/50 text-neutral-700 dark:text-neutral-200');
    return base.filter(Boolean).join(' ');
  }
  // Após mount no cliente: aplica variações dinâmicas
  base.push(
    isIncomplete.value ? 'border-red-500/70 text-red-500 neon-shadow hover:text-red-600 animate-neon' : 'border-white/40 dark:border-neutral-800/50 text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400'
  );
  return base.filter(Boolean).join(' ');
});

const iconSize = computed(() => 'h-5 w-5');

const derivedTitle = computed(() => {
  if (!mounted.value) return props.title;
  return isIncomplete.value ? 'Perfil incompleto — clique para finalizar' : props.title;
});

async function onClick() {
  try { await refreshFromServer(); } catch (_) {}
  showProfile.value = true;
  emit('click');
}

async function handleSave(payload: { fullName: string; sector: string; whatsapp: string; }) {
  saveProfile(payload);
  emit('save', payload);

  // Persistir no backend
  try {
    const resp = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        empresaId: empresaId.value,
        fullName: payload.fullName,
        sector: payload.sector,
        whatsapp: payload.whatsapp,
      })
    });
    const data = await resp.json();
    if (!data?.success) {
      alert(data?.message || 'Não foi possível salvar seu perfil.');
    }
  } catch (e) {
    alert('Erro de rede ao salvar seu perfil.');
  }

  showProfile.value = false;
}
</script>

<style scoped>
@keyframes neonPulse {
  0%, 100% {
    box-shadow: 0 0 6px rgba(255,0,0,.55), 0 0 14px rgba(255,0,0,.45), 0 0 22px rgba(255,0,0,.35);
    filter: drop-shadow(0 0 4px rgba(255,0,0,.5));
  }
  50% {
    box-shadow: 0 0 12px rgba(255,0,0,.9), 0 0 26px rgba(255,0,0,.7), 0 0 38px rgba(255,0,0,.55);
    filter: drop-shadow(0 0 6px rgba(255,0,0,.7));
  }
}
.animate-neon { animation: neonPulse 1.1s ease-in-out infinite; }
.neon-shadow { box-shadow: 0 0 10px rgba(255,0,0,0.7); }
</style>