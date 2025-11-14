<template>
  <form @submit.prevent="registerUser">
    <div class="grid grid-cols-2 gap-4">
      <UiInput v-model="user.email" placeholder="Email" class="col-span-2" />
      <ClientOnly>
        <UiInput v-model="user.cnpj" @blur="fetchCompany" @input="onCnpjInput" placeholder="CNPJ da Empresa" class="col-span-2" v-mask="'##.###.###/####-##'" />
      </ClientOnly>
      <UiInput v-model="companyName" placeholder="Razão Social" class="col-span-2" readonly />
    </div>
    <ShimmerButton type="submit" class="w-full mt-4">Cadastrar Usuário</ShimmerButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ShimmerButton from './ShimmerButton.vue';

const user = ref({
  email: "",
  cnpj: "",
});

const companyName = ref("");

const fetchCompany = async () => {
  if (user.value.cnpj) {
    const response = await fetch('/api/get-company-by-cnpj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cnpj: user.value.cnpj.replace(/\D/g, '') })
    });
    const data = await response.json();
    if (data.success) {
      companyName.value = data.razao_social;
    } else {
      companyName.value = "";
      alert(data.message);
    }
  }
};

let cnpjTimer: any = null;
const onCnpjInput = () => {
  clearTimeout(cnpjTimer);
  cnpjTimer = setTimeout(() => {
    const digits = user.value.cnpj.replace(/\D/g, '');
    if (digits.length === 14) fetchCompany();
  }, 400);
};

const registerUser = async () => {
  const userData = {
    ...user.value,
    email: user.value.email.toUpperCase(),
  };

  const response = await fetch('/api/register-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (data.success) {
    alert('Usuário cadastrado com sucesso!');
  } else {
    alert(data.message);
  }
};
</script>