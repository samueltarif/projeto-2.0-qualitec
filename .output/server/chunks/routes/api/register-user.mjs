import { c as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../_/nitro.mjs';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const registerUser = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const digits = String(body.cnpj).replace(/\D/g, "");
      const { data: companyRows, error: companyError } = await supabase.from("empresas").select("id").or(`cnpj.eq.${digits},cnpj.eq.${body.cnpj}`).single();
      if (companyError || !companyRows) {
        return { success: false, message: "CNPJ n\xE3o encontrado" };
      }
      const empresaId = companyRows.id;
      const loginEmail = String(body.email || "").trim().toUpperCase();
      const { data: existingRows, error: existingError } = await supabase.from("usuarios").select("id").eq("email", loginEmail).eq("empresa_id", empresaId).single();
      if (existingRows && !existingError) {
        return { success: true, alreadyExists: true, id: existingRows.id };
      }
      const { data: newUser, error: insertError } = await supabase.from("usuarios").insert({ email: loginEmail, empresa_id: empresaId }).select().single();
      if (insertError) {
        return { success: false, message: insertError.message };
      }
      return { success: true, inserted: true, id: newUser.id };
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

export { registerUser as default };
//# sourceMappingURL=register-user.mjs.map
