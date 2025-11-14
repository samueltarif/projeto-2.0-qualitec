import { c as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const profile = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const rawEmail = String((body == null ? void 0 : body.email) || "").trim();
  const email = rawEmail.toUpperCase();
  const empresaId = Number(body == null ? void 0 : body.empresaId);
  const fullName = String((body == null ? void 0 : body.fullName) || "").trim();
  const sector = String((body == null ? void 0 : body.sector) || "").trim();
  const whatsapp = String((body == null ? void 0 : body.whatsapp) || "").trim();
  if (!email || !empresaId || !Number.isFinite(empresaId)) {
    return { success: false, message: "Dados insuficientes: email e empresaId s\xE3o obrigat\xF3rios." };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("usuarios").update({ full_name: fullName, sector, whatsapp }).eq("email", email).eq("empresa_id", empresaId).select().single();
      if (!error && data) {
        return { success: true, updated: true };
      }
      return { success: false, message: "Usu\xE1rio n\xE3o encontrado para esta empresa." };
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Erro ao salvar perfil." };
  }
});

export { profile as default };
//# sourceMappingURL=profile.mjs.map
