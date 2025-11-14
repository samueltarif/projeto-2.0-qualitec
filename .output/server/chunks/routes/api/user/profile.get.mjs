import { c as defineEventHandler, u as useRuntimeConfig, g as getQuery } from '../../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const profile_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery(event);
  const rawEmail = String((query == null ? void 0 : query.email) || "").trim();
  const email = rawEmail.toUpperCase();
  const empresaId = Number(query == null ? void 0 : query.empresaId);
  if (!email || !empresaId || !Number.isFinite(empresaId)) {
    return { success: false, message: "Par\xE2metros inv\xE1lidos: email e empresaId s\xE3o obrigat\xF3rios." };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("usuarios").select("full_name, sector, whatsapp").eq("email", email).eq("empresa_id", empresaId).single();
      if (!error && data) {
        return {
          success: true,
          profile: {
            fullName: (data == null ? void 0 : data.full_name) || "",
            sector: (data == null ? void 0 : data.sector) || "",
            whatsapp: (data == null ? void 0 : data.whatsapp) || ""
          }
        };
      }
      return { success: true, profile: null };
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Erro ao obter perfil." };
  }
});

export { profile_get as default };
//# sourceMappingURL=profile.get.mjs.map
