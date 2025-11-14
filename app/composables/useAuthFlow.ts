import { useState } from '#app';

/**
 * Gerencia o fluxo de autenticação e cadastro
 * Compartilha estado entre LoginForm, RegisterForm e login.vue
 */
export const useAuthFlow = () => {
  // Estado para controlar qual aba deve ser ativada
  const activeTab = useState<'login' | 'register' | 'register-user'>('auth:activeTab', () => 'login');
  
  // Estado para mostrar modal de sugestão de cadastro
  const showRegisterHint = useState<boolean>('auth:showRegisterHint', () => false);
  
  // Função para navegar para a aba de Cadastro de Usuário
  const goToRegisterUser = () => {
    activeTab.value = 'register-user';
    showRegisterHint.value = true;
    
    // Aguarda renderização antes de simular clique
    setTimeout(() => {
      const el = document.getElementById('register-user-tab');
      if (el) {
        el.click();
      }
    }, 0);
  };
  
  // Função para fechar o hint
  const closeRegisterHint = () => {
    showRegisterHint.value = false;
  };
  
  return {
    activeTab,
    showRegisterHint,
    goToRegisterUser,
    closeRegisterHint,
  };
};
