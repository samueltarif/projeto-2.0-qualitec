/**
 * Dados de teste para desenvolvimento e testes automáticos
 * Uso: Configure no seu ambiente de desenvolvimento ou testes
 */

export const TEST_USERS = {
  EMPLOYEE: {
    email: 'test@qualitec.ind.br',
    cnpj: '11222333000181', // CNPJ válido (Empresa de Teste)
  },
  SALES: {
    email: 'vendas@qualitec.ind.br',
    cnpj: '11222333000181',
  },
};

export const TEST_COMPANY = {
  QUALITEC: {
    cnpj: '11222333000181',
    name: 'Empresa de Teste LTDA',
    branch: 'São Paulo',
  },
};

/**
 * Para usar em testes, você pode:
 * 1. Preencher manualmente os campos com os valores de TEST_USERS
 * 2. Usar uma fixture de teste que injete esses dados
 * 3. Configurar um middleware que aceite credenciais de teste em dev
 */
