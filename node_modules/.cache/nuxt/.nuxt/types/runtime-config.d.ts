import { RuntimeConfig as UserRuntimeConfig, PublicRuntimeConfig as UserPublicRuntimeConfig } from 'nuxt/schema'
  interface SharedRuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   dbHost: string,

   dbUser: string,

   dbPassword: string,

   dbDatabase: string,

   supabaseUrl: string,

   supabaseKey: string,

   supabaseSecretKey: string,

   adminKey: string,

   enableAdminEndpoints: string,

   allowCompanyEmailLogin: string,

   emailUser: string,

   emailPass: string,

   geminiApiKey: string,

   filterSynonyms: {
      faixa_trabalho: Array<string>,

      diametro_montagem: Array<string>,

      conexao_instrumento: Array<string>,

      classe_exatidao: Array<string>,

      tipo_medicao: Array<string>,

      posicao_montagem: Array<string>,

      visor: Array<string>,

      material_internos: Array<string>,

      unidade_leitura: Array<string>,

      glicerina: Array<string>,

      tubo_sifao: Array<string>,

      contato_eletrico: Array<string>,

      selo_diafragma: Array<string>,

      valvula_isolamento: Array<string>,

      certificados: Array<string>,

      fabricante: Array<string>,

      part_number: Array<string>,
   },

   nitro: {
      envPrefix: string,
   },

   supabase: {
      serviceKey: string,

      secretKey: any,
   },
  }
  interface SharedPublicRuntimeConfig {
   salesEmail: string,

   supabase: {
      url: string,

      key: string,

      redirect: boolean,

      redirectOptions: {
         login: string,

         callback: string,

         exclude: Array<any>,

         cookieRedirect: boolean,

         saveRedirectToCookie: boolean,
      },

      cookieName: string,

      cookiePrefix: string,

      useSsrCookies: boolean,

      cookieOptions: {
         maxAge: number,

         sameSite: string,

         secure: boolean,
      },

      clientOptions: any,
   },
  }
declare module '@nuxt/schema' {
  interface RuntimeConfig extends UserRuntimeConfig {}
  interface PublicRuntimeConfig extends UserPublicRuntimeConfig {}
}
declare module 'nuxt/schema' {
  interface RuntimeConfig extends SharedRuntimeConfig {}
  interface PublicRuntimeConfig extends SharedPublicRuntimeConfig {}
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: UserRuntimeConfig
        }
      }