import { c as defineEventHandler, u as useRuntimeConfig, h as getHeader, i as setResponseStatus } from '../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const testConnection = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { message: "forbidden" };
  }
  if (config.supabaseUrl && config.supabaseKey) {
    try {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("empresas").select("id").limit(1);
      if (!error) {
        return { message: "Conex\xE3o com o Supabase bem-sucedida!" };
      }
      return { message: "Falha na conex\xE3o com o Supabase.", error };
    } catch (error) {
      console.error("Erro ao conectar com o Supabase:", error);
      return { message: "Falha na conex\xE3o com o Supabase.", error };
    }
  }
  return { message: "Nenhum backend de dados configurado." };
});

export { testConnection as default };
//# sourceMappingURL=test-connection.mjs.map
