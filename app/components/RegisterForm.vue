<template>
  <form @submit.prevent="registerCompany">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <ClientOnly>
          <UiInput
             v-model="company.cnpj"
             placeholder="00.000.000/0000-00"
             type="text"
             required
             v-mask="'##.###.###/####-##'"
             @blur="lookupCompany"
             @input="onCnpjInput"
           />
        </ClientOnly>
      </div>
      <UiInput v-model="company.razao_social" placeholder="Razão Social" />
      <UiInput v-model="company.email" placeholder="Email" class="col-span-2" />
      <UiInput v-model="company.filial" placeholder="Filial" class="col-span-2" />
    </div>
    <ShimmerButton type="submit" class="w-full mt-4">Cadastrar Empresa</ShimmerButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { normalizeCnpjForSave } from '~/composables/useCnpj';
import ShimmerButton from './ShimmerButton.vue';

const company = ref({
  cnpj: "",
  razao_social: "",
  email: "",
  filial: "",
});

const normalizeFilial = (filial: string) => {
  const lowerFilial = filial.toLowerCase();
  const stateMap: { [key: string]: string } = {
    'sp': 'SÃO PAULO',
    'sao paulo': 'SÃO PAULO',
    'rj': 'RIO DE JANEIRO',
    'rio de janeiro': 'RIO DE JANEIRO',
    'mg': 'MINAS GERAIS',
    'minas gerais': 'MINAS GERAIS',
  };
  return stateMap[lowerFilial] || filial.toUpperCase();
};

const registerCompany = async () => {
  const companyData = {
    ...company.value,
    cnpj: normalizeCnpjForSave(company.value.cnpj),
    razao_social: company.value.razao_social.toUpperCase(),
    filial: normalizeFilial(company.value.filial),
  };

  const response = await fetch('/api/register-company', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyData)
  });
  const data = await response.json();
  if (data.success) {
    alert('Empresa cadastrada com sucesso!');
  } else {
    alert(data.message);
  }
};

const lookupCompany = async () => {
  const digits = company.value.cnpj.replace(/\D/g, '');
  if (!digits || digits.length !== 14) return;
  try {
    const response = await fetch('/api/get-company-by-cnpj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cnpj: digits })
    });
    const data = await response.json();
    if (data.success && data.razao_social) {
      company.value.razao_social = data.razao_social;
    }
  } catch (e) {
    // silencioso para não interromper fluxo
  }
};

let cnpjTimer: any = null;
const onCnpjInput = () => {
  clearTimeout(cnpjTimer);
  cnpjTimer = setTimeout(() => {
    lookupCompany();
  }, 400);
};
</script>