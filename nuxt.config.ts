// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  // Use the `app` directory as source to pick up pages/components there
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  plugins: ['~/plugins/mask'],
  modules: ['@nuxtjs/tailwindcss', '@unocss/nuxt', ['@nuxtjs/supabase', { redirect: false }]],
  runtimeConfig: {
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_KEY,
    adminKey: process.env.NUXT_ADMIN_KEY,
    enableAdminEndpoints: process.env.ENABLE_ADMIN_ENDPOINTS || 'false',
    allowCompanyEmailLogin: process.env.ALLOW_COMPANY_EMAIL_LOGIN || 'false',
    emailUser: process.env.NUXT_EMAIL_USER,
    emailPass: process.env.NUXT_EMAIL_PASS,
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.NUXT_GEMINI_API_KEY,
    filterSynonyms: {
      faixa_trabalho: [
        'faixa de pressão','pressão de trabalho','range de pressão','faixa de medição','escala de pressão','intervalo de pressão','pressão nominal','pressão mínima e máxima','pressão suportada','pressão operacional','pressão do instrumento'
      ],
      diametro_montagem: [
        'diâmetro','tamanho do manômetro','tamanho do visor','bitola','diâmetro do mostrador','diâmetro externo','dimensão frontal','tamanho da carcaça','medida da face','100 mm','2½"','2 1/2"','63 mm','41 mm','160 mm'
      ],
      conexao_instrumento: [
        'conexão','rosca','tipo de rosca','entrada','conexão inferior','conexão traseira','bocal','tipo de engate','tamanho da rosca','rosca macho','rosca fêmea','conexão de processo','tipo de encaixe','porta de entrada','adaptador','1/8" NPT','1/4" NPT','3/8" NPT','1/2" NPT','1/4" BSP','1/2" BSP'
      ],
      classe_exatidao: [
        'classe de exatidão','classe de precisão','erro máximo','margem de erro','tolerância','erro percentual','exatidão da medição','classe'
      ],
      tipo_medicao: [
        'tipo de pressão','medição relativa','medição absoluta','pressão manométrica','pressão atmosférica','pressão diferencial','sensor de pressão diferencial','pressão gauge','vacuum','tipo de medição'
      ],
      posicao_montagem: [
        'montagem inferior','montagem traseira','tipo de montagem','posição de instalação','instalação vertical','instalação horizontal','montagem direta','montagem painel','montagem flangeada','posição do bocal','montagem em painel','trilho','fixação',
        'inferior','reto','embaixo','vertical','conexao inferior','saída inferior','saida inferior','padrao inferior','rosca para baixo','monta direto na linha',
        'traseiro','montagem traseira','atras','atrás','saida posterior','saída posterior','conexao traseira','conexao atras','conexão traseira','conexão atrás','conexao traseira central','conexão traseira central','atras no meio','atrás no meio','central atras','central atrás','painel traseiro','montagem em painel traseiro','parede traseiro','concentrico','concêntrico',
        'excentrico','excêntrico','deslocado','descentralizado','fora do centro','lateral','para o lado','traseiro lateral','conexao atras lateral','conexão atrás lateral','saida traseira lateral','saída traseira lateral'
      ],
      visor: [
        'mostrador','display','janela','vidro frontal','lente','indicador visual','tela','visor analógico','visor digital','visor'
      ],
      material_internos: [
        'materiais internos','componentes internos','partes internas','liga metálica interna','tubo bourdon de latão','tubo bourdon de aço inox','mecanismo interno','construção interna','material dos internos'
      ],
      unidade_leitura: [
        'unidade de medida','unidade da escala','medida da pressão','unidade exibida','leitura em bar','leitura em psi','leitura em Pa','leitura em kPa','leitura em kgf/cm²','BAR','PSI','KPA','KGF/CM²'
      ],
      glicerina: [
        'com glicerina','sem glicerina','manômetro preenchido','com líquido amortecedor','enchimento líquido','fluido de amortecimento','modelo seco','modelo cheio','glicerinado','seco'
      ],
      tubo_sifao: [
        'sifão','tubo de sifão','tubo em U','tubo espiral','protetor de vapor','tubo de condensação','serpentina'
      ],
      contato_eletrico: [
        'contato elétrico','alarme elétrico','manômetro com alarme','com contato','saída elétrica','sinal elétrico','relé de pressão','microchave'
      ],
      selo_diafragma: [
        'selo sanitário','selo de diafragma','diafragma isolante','selo químico','isolador de processo','selo flangeado','selo remoto'
      ],
      valvula_isolamento: [
        'válvula bloqueio','válvula de corte','válvula de esfera','válvula de agulha','válvula de instrumento','válvula de processo','isolador'
      ],
      certificados: [
        'certificado de calibração','certificado de origem','certificado de conformidade','laudo','documentação técnica','certificado ISO','teste de fábrica','certificado de teste'
      ],
      fabricante: ['marca','fabricante'],
      part_number: ['PN','part number','código','sku']
    },
    public: {
      salesEmail: process.env.NUXT_SALES_EMAIL || 'vendas2@qualitec.ind.br'
    }
  },
  css: [
    '~/assets/css/main.css',
    '~/assets/css/theme.css'
  ],
})
