# PRD — Catálogo Digital Nuxt 4

## 1. Visão Geral
- Projeto: Catálogo Digital com busca, filtros, comparação e montagem de pedidos.
- Stack: `Nuxt 4.1.3`, `Vue 3.5.22`, `TypeScript`, `Nitro (rotas server)`, `@nuxtjs/tailwindcss`, `UnoCSS`, `@nuxtjs/supabase`.
- Objetivo: permitir que usuários naveguem por produtos técnicos, filtrem por atributos, comparem especificações, montem pedidos em PDF e enviem por e-mail, com autenticação básica.

## 2. Escopo Funcional
- Catálogo de Produtos
  - Grid com cartões de produto, imagens e detalhes.
  - Filtros por atributos técnicos (categoria, faixa, fabricante, etc.).
  - Contagem de facetas e resultados, paginação simples.
- Comparação
  - Adicionar/remover itens para comparação.
  - Página dedicada `/comparar` para visualizar especificações lado a lado.
- Carrinho
  - Modal com itens, ajuste de quantidade, remoção e limpeza.
  - Observações por item e ações de envio.
- Pedido (PDF & E-mail)
  - Geração de PDF via endpoint.
  - Envio de pedido por e-mail.
- Autenticação e Perfil
  - Login e registro de usuário.
  - Perfil básico com persistência.
- Favoritos
  - Marcar/desmarcar produtos como favoritos, alias opcional.
- Integração CNPJ
  - Consulta de empresa via CNPJ.
- Tema
  - Alternância entre claro/escuro.
- Máscara
  - Diretiva `v-mask` client-side para campos como CNPJ.

## 3. Fora de Escopo
- Multi-idiomas (i18n) — removido.
- Gateway de pagamento e checkout financeiro.
- Administração de catálogo (CRUD completo de produtos).

## 4. Requisitos de Usuário
- Buscar e filtrar produtos por atributos técnicos.
- Comparar especificações de 2+ itens.
- Montar pedido, revisar e enviar.
- Autenticar e gerenciar perfil básico.
- Alternar tema conforme preferência.

## 5. Requisitos de Sistema
- SSR com renderização estável e sem mismatch de hidratação.
- Build de produção gerando `.output` e preview funcional.
- Endpoints Node/Nitro servindo dados e operações do catálogo.
- Sem dependências de i18n ativas.

## 6. Requisitos Não Funcionais
- Performance: respostas de API rápidas; UI responsiva.
- Acessibilidade: foco visível, `aria-label` em botões, fechar modal com `Esc`.
- Segurança: autenticação básica e restrição de endpoints sensíveis.
- Manutenibilidade: componentes modulares e estilos utilitários (Tailwind/UnoCSS).

## 7. UI/UX
- Header fixo; conteúdo com `pt-20 md:pt-24` para evitar sobreposição.
- Glow neon verde atrás do grid de produtos (efeito visual).
- Modais com backdrop, transições `fade/scale`, botões com estados claros.
- Botões de ação consistentes (favoritar, comparar, detalhes, carrinho).
- Tela de login com área “Avalia-nos” e envio de e-mail de suporte.

## 8. Fluxos Principais
- Navegação ao Catálogo
  - Selecionar categoria e aplicar filtros.
  - Visualizar grid e abrir detalhes de um produto.
- Comparação
  - Adicionar itens ao painel, abrir `/comparar` com `ids` na query.
- Carrinho
  - Adicionar produto ao carrinho, ajustar quantidade, remover, limpar.
- Pedido
  - Gerar PDF, enviar por e-mail para o canal de vendas.
- Autenticação
  - Login/Registro, editar perfil.

## 9. API (Nitro Server)
- Produtos
  - `GET /api/produtos/search`
  - `GET /api/produtos/details`
  - `GET /api/produtos/distinct`
  - `GET /api/produtos/facet-counts`
  - `POST /api/produtos/get-by-ids`
- Favoritos
  - `GET /api/favoritos/list`
  - `POST /api/favoritos/toggle`
  - `POST /api/favoritos/alias`
- Pedido & Utilitários
  - `POST /api/download-order`
  - `POST /api/send-email`
  - `GET /api/list-tables`
  - `GET /api/table-schema`
  - `GET /api/test-connection`
- Autenticação/Perfil
  - `POST /api/login`
  - `POST /api/register-user`
  - `POST /api/register-company`
  - `GET /api/user/profile`
  - `POST /api/user/profile`
- Integração
  - `GET /api/get-company-by-cnpj`
  - `POST /api/imgbb`

## 10. Modelos de Dados (exemplos)
- Produto (parcial)
  - `id`, `part_number`, `categoria`
  - `faixa_trabalho`, `unidade_leitura`
  - `fabricante`, `material_involucro`, `classe_exatidao`
  - `conexao_instrumento`, `posicao_montagem`, `diametro_montagem`
- Favorito
  - `id`, `title`, `brand`, `alias?`
- Pedido
  - Lista de itens `{ id, title, categoria, quantidade }`
  - Observações por item
  - Metadados de cliente/contato

## 11. Regras e Validações
- Filtros: aplicar/limpar e emitir estado para sincronizar a página.
- Comparação: validar quantidade mínima de itens.
- Carrinho: impedir quantidade negativa; remoção isolada não afeta outros.
- PDF/E-mail: mensagens de sucesso/erro; limpar campos após envio bem-sucedido.

## 12. Requisitos Técnicos
- Diretório `app/` como `srcDir` (Nuxt 4).
- Tailwind/UnoCSS configurados com tokens CSS via `app/assets/css/theme.css`.
- Diretiva `v-mask` registrada em `app/plugins/mask.client.ts`.
- Rotas de páginas: `index.vue` (redireciona para `/login`), `login.vue`, `produtos.vue`, `comparar.vue`.

## 13. Critérios de Aceitação
- Catálogo lista e filtra produtos conforme atributos selecionados.
- Comparação mostra especificações lado a lado sem quebrar layout.
- Carrinho permite ajustes e remoções com feedback visual.
- PDF gera documento e e-mail é enviado com retorno apropriado.
- Login/Registro funcionam e perfil pode ser consultado/editado.
- Tema alterna corretamente e persiste.

## 14. Checklist de Release
- `npm run build` sem erros.
- `npm run preview` acessível em `http://localhost:3000`.
- Endpoints principais respondem com status 200.
- Sem dependências de i18n instaladas ou configuradas.
- Variáveis de ambiente de e-mail e Supabase definidas.

## 15. Anexos
- Componentes chave: `ProductsGrid.vue`, `CatalogFilterSidebar.vue`, `CompareSidebar.vue`, `CartModal.vue`, `ProductDetailsModal.vue`, `FavoritesModal.vue`, `LoginForm.vue`, `UserRegisterForm.vue`.
- Composables: `useCart.ts`, `useCompare.ts`, `useFavorites.ts`, `useOverlay.ts`, `useTheme.ts`, `useUserProfile.ts`.
- Plugins: `mask.client.ts`.