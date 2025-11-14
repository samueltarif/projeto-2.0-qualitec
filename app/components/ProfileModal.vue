<template>
  <UiModal
    :visible="visible"
    @close="onClose"
    :withBackdrop="true"
    :closeOnBackdrop="true"
    :closeOnEsc="true"
    :showCloseButton="true"
    closeButtonLabel="Fechar"
    ariaLabel="Completar cadastro do perfil"
    :panelClass="panelClass"
  >
    <div class="p-6">
      <h2 class="text-lg font-semibold mb-4">Completar cadastro</h2>

      <form @submit.prevent="onSave" class="space-y-4">
        <!-- Nome completo -->
        <UiFormField
          id="fullName"
          label="Nome completo"
          v-model="fullName"
          required
          placeholder="Seu nome completo"
        />

        <!-- Setor -->
        <UiFormField
          id="sector"
          label="Setor"
          v-model="sector"
          placeholder="Ex.: Compras, Engenharia, Comercial"
        />

        <!-- WhatsApp -->
        <UiFormField
          id="whatsapp"
          label="WhatsApp"
          type="tel"
          v-model="whatsapp"
          :mask="'## (##) #####-####'"
          placeholder="55 (11) 95137-2631"
        >
          <template #help>
            <p class="text-xs text-neutral-500 mt-1">Formato: 55 (DD) #####-####</p>
          </template>
        </UiFormField>

        <div class="flex justify-between items-center gap-3 pt-2">
          <!-- Sair do catálogo: fecha o modal antes de navegar -->
          <LogoutButton label="Sair do catálogo" @logout="onClose" />
          <div class="flex justify-end gap-2">
            <button type="button" class="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800" @click="onClose">Cancelar</button>
            <button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Salvar</button>
          </div>
        </div>
      </form>
    </div>
  </UiModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import UiModal from '~/components/ui/UiModal.vue';
import UiFormField from '~/components/ui/UiFormField.vue';
import LogoutButton from '~/components/LogoutButton.vue';

interface Props {
  visible: boolean;
  initialFullName?: string;
  initialSector?: string;
  initialWhatsapp?: string;
  initialInfo?: string;
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  initialFullName: '',
  initialSector: '',
  initialWhatsapp: '',
  initialInfo: '',
});

const emit = defineEmits<{ (e: 'close'): void; (e: 'save', payload: { fullName: string; sector: string; whatsapp: string; info: string; }): void }>();

const fullName = ref(props.initialFullName);
const sector = ref(props.initialSector);
const whatsapp = ref(props.initialWhatsapp);
const info = ref(props.initialInfo);

const panelClass = computed(() => 'w-[92vw] max-w-lg rounded-lg p-0');

// Recarregar valores quando o modal abre (e quando props mudam)
watch(() => props.visible, (v) => {
  if (v) {
    fullName.value = props.initialFullName || '';
    sector.value = props.initialSector || '';
    whatsapp.value = props.initialWhatsapp || '';
  }
});

function onClose() {
  emit('close');
}

function onSave() {
  emit('save', {
    fullName: fullName.value.trim(),
    sector: sector.value.trim(),
    whatsapp: whatsapp.value.trim(),
    info: info.value.trim(),
  });
}
</script>

<style scoped>
</style>