import { c as defineEventHandler, u as useRuntimeConfig, r as readBody } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const chat_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const cfg = useRuntimeConfig();
  const key = cfg.geminiApiKey;
  const body = await readBody(event);
  const msgs = Array.isArray(body == null ? void 0 : body.messages) ? body.messages : [];
  const userEmail = String((body == null ? void 0 : body.userEmail) || "").trim();
  const empresaId = Number((body == null ? void 0 : body.empresaId) || 0);
  const action = String((body == null ? void 0 : body.action) || "").trim();
  const lastUser = ((_a = msgs.reverse().find((m) => (m == null ? void 0 : m.role) === "user")) == null ? void 0 : _a.content) || "";
  const normUser = String(lastUser || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const explicitEmailMatch = /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.exec(String(lastUser || ""));
  const explicitEmail = explicitEmailMatch ? explicitEmailMatch[0] : "";
  const hasEmailWord = /(email|e\s*mail|endereco\s*de\s*email|meu\s*email|no\s*meu\s*email|pro\s*meu\s*email)/i.test(normUser);
  const emailVerbs = /(envia|enviar|envie|mandar|mande|manda|encaminha|encaminhar|encaminhe|joga|jogar)/i.test(normUser);
  const emailObjects = /(pdf|ficha\s*tecnica|catalogo|documento|arquivo|produto|modelo|item)/i.test(normUser);
  const downloadWords = /(baixar|baixa|download|exportar|exporta|exportacao)/i.test(normUser);
  const targetEmail = explicitEmail || userEmail;
  const wantEmail = hasEmailWord && emailVerbs || emailVerbs && emailObjects && !!targetEmail || downloadWords && !!targetEmail || /quero\s*receber\s*(no|em)\s*(email|e\s*mail)/i.test(normUser);
  if (action === "send_email") {
    try {
      const itemsIn = Array.isArray((_b = body == null ? void 0 : body.order) == null ? void 0 : _b.items) ? body.order.items : [];
      const toTargets = userEmail;
      if (!itemsIn.length) {
        return { success: false, text: "Nenhum produto selecionado para enviar.", items: [], total: 0 };
      }
      if (!toTargets) {
        return { success: true, text: "Informe seu endere\xE7o de email para eu enviar o PDF.", items: itemsIn, total: itemsIn.length };
      }
      const payload2 = {
        subject: "Pedido Qualitec \u2014 Produto solicitado via chat",
        message: "Pedido solicitado via chat.",
        to: toTargets,
        order: { items: itemsIn, user: { email: toTargets }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
      };
      await $fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": String(cfg.adminKey) }, body: payload2 });
      return { success: true, text: "Enviei o PDF do produto para o seu email.", items: itemsIn, total: itemsIn.length };
    } catch (_) {
      return { success: false, text: "Tentei enviar o PDF por email, mas ocorreu um erro." };
    }
  }
  if (!key) {
    let normalizeVal = function(s) {
      return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }, pickCandidate = function(key2, input) {
      var _a2;
      const arr = ((_a2 = distincts == null ? void 0 : distincts.values) == null ? void 0 : _a2[key2]) || [];
      const map = new Map(arr.map((v) => [normalizeVal(v), v]));
      const inNorm = normalizeVal(input || "");
      if (map.has(inNorm)) return map.get(inNorm);
      for (const v of arr) {
        const vn = normalizeVal(v);
        if (!vn) continue;
        if (normalizeVal(raw).includes(vn)) return v;
      }
      return input;
    };
    const text = String(lastUser || "");
    const raw = text;
    const norm = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let filters = {};
    let categoria = /manometro|manometros/.test(norm) ? "Man\xF4metros" : "Man\xF4metros";
    let header = "";
    const hasAny = (arr) => arr.some((s) => norm.includes(s));
    const synInferior = ["inferior", "reto", "embaixo", "vertical", "conexao inferior", "saida inferior", "sa\xEDda inferior", "padrao inferior", "rosca para baixo", "monta direto na linha"];
    const synTraseiroConc = ["traseiro", "montagem traseira", "atras", "atr\xE1s", "saida posterior", "sa\xEDda posterior", "conexao traseira", "conexao atras", "conex\xE3o traseira", "conex\xE3o atr\xE1s", "conexao traseira central", "conex\xE3o traseira central", "atras no meio", "atr\xE1s no meio", "central atras", "central atr\xE1s", "painel traseiro", "montagem em painel traseiro", "parede traseiro", "concentrico", "concentrico"];
    const synTraseiroExc = ["excentrico", "exc\xEAntrico", "deslocado", "descentralizado", "fora do centro", "lateral", "para o lado", "traseiro lateral", "conexao atras lateral", "conex\xE3o atr\xE1s lateral", "saida traseira lateral", "sa\xEDda traseira lateral"];
    if (hasAny(synInferior)) filters.posicao_montagem = "RETO (INFERIOR)";
    else if (hasAny(synTraseiroConc)) filters.posicao_montagem = "ANGULAR CONC\xCANTRICO (TRASEIRO)";
    else if (hasAny(synTraseiroExc)) filters.posicao_montagem = "ANGULAR EXC\xCANTRICO (TRASEIRO)";
    if (/sem\s+glicerina|modelo\s+seco|dry\s*gauge|no\s*glycerin|not\s*glycerin\s*filled/.test(norm)) filters.glicerina = "N\xE3o";
    else if (/glicerina|glicerinado|modelo\s+cheio|enchimento\s+liquido|fluido\s+de\s+amortecimento/.test(norm)) filters.glicerina = "Sim";
    const mDiam = /(\d{2,3})\s*mm|([2-4](?:\s*[½¼¾]))\s*["”]/i.exec(raw);
    if (mDiam) filters.diametro_montagem = mDiam[1] ? `${mDiam[1]}MM` : `${mDiam[2]}"`;
    if (!filters.diametro_montagem) {
      const mDiamAlt = /\b(?:ø|Ø)\s*(\d{2,3})\b/i.exec(raw);
      if (mDiamAlt) filters.diametro_montagem = `${mDiamAlt[1]}MM`;
    }
    if (!filters.diametro_montagem) {
      const mDiamWord = /di[aà]metro\s*(\d{2,3})/i.exec(raw);
      if (mDiamWord) filters.diametro_montagem = `${mDiamWord[1]}MM`;
    }
    if (!filters.diametro_montagem) {
      const mDiamCm = /(\d{1,2})[\.,]\s*(\d)\s*cm/i.exec(raw);
      if (mDiamCm) {
        const mm = Number(mDiamCm[1]) * 10 + Number(mDiamCm[2]);
        filters.diametro_montagem = `${mm}MM`;
      }
    }
    const mConn = /(1\/8|1\/4|3\/8|1\/2|3\/4)\s*["”']?\s*(npt|bsp|bsp-npt|bpst|bspt|g)/i.exec(raw) || /(rosca|conexao|conexão|entrada|bocal|engate)\s*(\d\/\d)?\s*["”']?\s*(npt|bsp|bspt|g)/i.exec(raw);
    if (mConn) {
      const frac = mConn[2] && /\d\/\d/.test(mConn[2]) ? mConn[2] : mConn[1];
      const stdRaw = mConn[mConn.length - 1].toUpperCase();
      const std = stdRaw.replace("BPST", "BSP").replace("BSPT", "BSP").replace(/^G$/, "BSP");
      if (frac) filters.conexao_instrumento = `${frac}" ${std}`;
    }
    if (!filters.conexao_instrumento) {
      const fracOnly = /(1\/8|1\/4|3\/8|1\/2|3\/4)/i.exec(raw);
      const hasNpt = /\bnpt\b/i.test(raw);
      const hasBsp = /\bbsp(t)?\b|\bg\b/i.test(norm);
      if (fracOnly && !hasNpt && !hasBsp) header = `Conex\xE3o ${fracOnly[0]} sem tipo (NPT/BSP). Confirma?`;
    }
    const mFaixa = /(\d{1,5})\s*\/\s*(\d{1,5})(?!["”])(?:\s*(psi|bar|kgf\/cm\u00B2|kgf\/cm2))?/i.exec(raw);
    if (mFaixa) filters.faixa_trabalho = `${mFaixa[1]}/${mFaixa[2]}`;
    if (!filters.faixa_trabalho) {
      const mFaixa2 = /\b(\d{1,5})\s*(?:[-–]|\ba\b|\bto\b|\bover\b|\/)\s*(\d{1,5})(?!["”])\b/i.exec(raw);
      if (mFaixa2) filters.faixa_trabalho = `${mFaixa2[1]}/${mFaixa2[2]}`;
    }
    if (/psi\s*x\s*kgf\/?cm2|psi\s*x\s*kgf\/cm\u00B2|psi\s*x\s*kgf\/cm²|dupla\s*escala|kgf\s*\/?\s*cm2/i.test(norm)) filters.unidade_leitura = "PSI X KGF/CM\xB2";
    else if (/\bbar\b/i.test(raw)) filters.unidade_leitura = "BAR";
    else if (/\bpsi\b/i.test(raw)) filters.unidade_leitura = "PSI";
    if (/classe|precisao|tolerancia|erro\s+percentual/i.test(norm)) {
      const mClass = /(classe|precisao)\s*([a-z0-9\.\-]+)/i.exec(raw);
      if (mClass) filters.classe_exatidao = mClass[2];
    }
    if (/\b(classe\s*-?\s*b|precision\s*b|acuracia\s*classe\s*b|cl\s*b)\b/i.test(norm)) filters.classe_exatidao = "CLASSE B";
    if (/relat(ivo)?|gauge|press(\u00E3|a)o\s*relativa?/i.test(norm)) filters.tipo_medicao = "RELATIVO";
    else if (/absolut[oa]|absolute\s*pressure/i.test(norm)) filters.tipo_medicao = "ABSOLUTO";
    if (/montagem\s+(inferior|traseira|painel|flangeada)/i.test(norm)) filters.posicao_montagem = RegExp.$1;
    if (/visor|janela|display|lente|vidro\s+frontal/i.test(norm)) filters.visor = raw;
    if (/(policarbonat(o|e)|visor\s*pc|visor\s*pl[\u00E1a]stico)/i.test(norm)) filters.visor = "POLICARBONATO";
    if (/contato\s+eletrico|alarme\s+eletrico|microchave|rele\s+de\s+pressao/i.test(norm)) filters.contato_eletrico = "Sim";
    if (/sem\s*contato\s*el[e\u00E9]trico|no\s*electric(al)?|sem\s*switch/i.test(norm)) filters.contato_eletrico = "N\xE3o";
    if (/selo\s+diafragma|selo\s+sanitario|selo\s+quimico|isolador\s+de\s+processo/i.test(norm)) filters.selo_diafragma = "Sim";
    if (/sem\s*(selo\s*)?diafragm(a|o)|no\s*diaphragm/i.test(norm)) filters.selo_diafragma = "N\xE3o";
    if (/valvula\s+(bloqueio|de\s+corte|de\s+esfera|de\s+agulha|de\s+instrumento|de\s+processo)/i.test(norm)) filters.valvula_isolamento = "Sim";
    if (/sem\s*v[\u00E1a]lvula\s*de\s*isolamento|no\s*isolation\s*valve/i.test(norm)) filters.valvula_isolamento = "N\xE3o";
    if (/sifao|tubo\s+de\s+sifao|serpentina|tubo\s+espiral|siphon|syphon/i.test(norm)) filters.tubo_sifao = "Sim";
    if (/sem\s*sif[\u00F5o]o|sem\s*tubo\s*sif[a\u00E3]o|no\s*siphon/i.test(norm)) filters.tubo_sifao = "N\xE3o";
    let distincts = null;
    try {
      distincts = await $fetch("/api/produtos/distinct", { params: { categoria, limit: 500 } });
    } catch {
    }
    filters.faixa_trabalho = pickCandidate("faixa_trabalho", filters.faixa_trabalho);
    filters.diametro_montagem = pickCandidate("diametro_montagem", filters.diametro_montagem);
    filters.posicao_montagem = pickCandidate("posicao_montagem", filters.posicao_montagem);
    filters.conexao_instrumento = pickCandidate("conexao_instrumento", filters.conexao_instrumento);
    filters.visor = pickCandidate("visor", filters.visor);
    filters.classe_exatidao = pickCandidate("classe_exatidao", filters.classe_exatidao);
    filters.unidade_leitura = pickCandidate("unidade_leitura", filters.unidade_leitura);
    const faixas = ((_c = distincts == null ? void 0 : distincts.values) == null ? void 0 : _c.faixa_trabalho) || [];
    if (filters.faixa_trabalho && !faixas.includes(filters.faixa_trabalho)) delete filters.faixa_trabalho;
    const diamVals = ((_d = distincts == null ? void 0 : distincts.values) == null ? void 0 : _d.diametro_montagem) || [];
    if (filters.diametro_montagem && !diamVals.includes(filters.diametro_montagem)) {
      const mm = Number(String(filters.diametro_montagem).replace(/[^0-9]/g, ""));
      let choose = "";
      for (const v of diamVals) {
        const n = Number(String(v).replace(/[^0-9]/g, ""));
        if (Math.abs(n - mm) <= 1) {
          choose = v;
          break;
        }
      }
      if (choose) filters.diametro_montagem = choose;
    }
    let results = null;
    try {
      results = await $fetch("/api/produtos/search", { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(filters) } });
    } catch (_) {
      results = null;
    }
    let total = Number((results == null ? void 0 : results.total) || 0);
    let items = Array.isArray(results == null ? void 0 : results.items) ? results.items : [];
    if (!total) {
      const priority = ["certificados", "valvula_isolamento", "contato_eletrico", "selo_diafragma", "tubo_sifao", "glicerina", "material_internos", "visor", "unidade_leitura", "classe_exatidao", "posicao_montagem", "faixa_trabalho", "tipo_medicao"];
      const relaxable = priority.filter((k) => filters[k] != null);
      const removed = [];
      for (const k of relaxable) {
        const tmp = { ...filters };
        delete tmp[k];
        let r2 = null;
        try {
          r2 = await $fetch("/api/produtos/search", { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } });
        } catch (_) {
        }
        const t2 = Number((r2 == null ? void 0 : r2.total) || 0);
        if (t2 > 0) {
          results = r2;
          filters = tmp;
          total = t2;
          items = Array.isArray(r2 == null ? void 0 : r2.items) ? r2.items : [];
          removed.push(k);
          break;
        }
      }
      if (!removed.length) {
        const tmp = { ...filters };
        delete tmp.faixa_trabalho;
        delete tmp.posicao_montagem;
        let r3 = null;
        try {
          r3 = await $fetch("/api/produtos/search", { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } });
        } catch (_) {
        }
        const t3 = Number((r3 == null ? void 0 : r3.total) || 0);
        if (t3 > 0) {
          results = r3;
          filters = tmp;
          total = t3;
          items = Array.isArray(r3 == null ? void 0 : r3.items) ? r3.items : [];
        }
      }
      if (!total) return { success: true, text: "N\xE3o encontrei produtos com essas especifica\xE7\xF5es. Tente ajustar os filtros.", filters, categoria, total, items: [] };
      if (removed.length) header = `${header ? header + "\n" : ""}N\xE3o encontrei exato; relaxei: ${removed.join(", ")}`;
    }
    const lines = [];
    if (header) lines.push(header);
    if (total === 1) {
      lines.push("Encontrei 1 produto.");
    } else {
      lines.push(`Encontrei ${total} produto(s). Exemplos:`);
    }
    for (const p of items.slice(0, 5)) {
      const brand = p.fabricante || "";
      const pn = p.part_number || p.id;
      const faixa = p.faixa_trabalho || "";
      const un = p.unidade_leitura || "";
      lines.push(`- ${brand} ${pn} \xB7 Faixa: ${faixa} ${un}`);
    }
    if (total === 1 && !wantEmail) {
      lines.push("Deseja enviar para o seu e-mail ou baixar o PDF?");
    }
    if (total >= 2 && total <= 3) {
      lines.push("Deseja comparar estes produtos?");
    }
    if (wantEmail && targetEmail && cfg.adminKey) {
      try {
        const pick = items.slice(0, 1).map((p) => ({
          id: p.part_number || p.id,
          title: p.part_number || "",
          brand: p.fabricante || "QUALITEC",
          quantity: 1,
          categoria: p.categoria,
          diametro_montagem: p.diametro_montagem,
          conexao_instrumento: p.conexao_instrumento,
          faixa_trabalho: p.faixa_trabalho,
          unidade_leitura: p.unidade_leitura,
          tipo_medicao: p.tipo_medicao,
          posicao_montagem: p.posicao_montagem,
          material_involucro: p.material_involucro,
          material_internos: p.material_internos,
          visor: p.visor,
          classe_exatidao: p.classe_exatidao,
          glicerina: p.glicerina,
          certificados: p.certificados,
          tubo_sifao: p.tubo_sifao,
          selo_diafragma: p.selo_diafragma,
          contato_eletrico: p.contato_eletrico,
          valvula_isolamento: p.valvula_isolamento
        }));
        const payload2 = {
          subject: "Pedido Qualitec \u2014 Produto solicitado via chat",
          message: "Pedido solicitado via chat.",
          to: targetEmail,
          order: { items: pick, user: { email: userEmail }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
        };
        await $fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": String(cfg.adminKey) }, body: payload2 });
        lines.push("Enviei o PDF do produto para o seu email.");
      } catch (_) {
        lines.push("Tentei enviar o PDF por email, mas ocorreu um erro.");
      }
    } else if (wantEmail && !targetEmail) {
      lines.push("Informe seu endere\xE7o de email para eu enviar o PDF.");
    }
    return { success: true, text: lines.join("\n"), filters, categoria, total, items };
  }
  const syn = cfg.filterSynonyms || {};
  const synText = Object.entries(syn).map(([k, arr]) => `${k}: ${(arr || []).join(", ")}`).join(" | ");
  const instruction = [
    "Responda em portugu\xEAs. Extraia filtros v\xE1lidos do texto do usu\xE1rio e retorne um JSON. ",
    "Chaves permitidas: part_number, faixa_trabalho, fabricante, tipo_medicao, diametro_montagem, posicao_montagem, ",
    "conexao_instrumento, visor, classe_exatidao, material_involucro, material_internos, unidade_leitura, ",
    "glicerina, tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento, certificados. ",
    'Valores devem ser strings. Para flags, use "Sim" ou "N\xE3o". Inclua tamb\xE9m a chave categoria quando aplic\xE1vel. ',
    'Retorne apenas JSON no formato {"filters":{...},"categoria":string|undefined,"explanation":string}. ',
    `Sin\xF4nimos aceitos: ${synText}`
  ].join("");
  const contents = [
    { role: "user", parts: [{ text: instruction }] },
    { role: "user", parts: [{ text: String(lastUser || "") }] }
  ];
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + key;
  const payload = { contents, generationConfig: { temperature: 0.3, maxOutputTokens: 1024 } };
  try {
    let normalizeVal = function(s) {
      return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    }, pickCandidate = function(key2, input) {
      var _a2;
      const arr = ((_a2 = distincts == null ? void 0 : distincts.values) == null ? void 0 : _a2[key2]) || [];
      const map = new Map(arr.map((v) => [normalizeVal(v), v]));
      const inNorm = normalizeVal(input || "");
      if (map.has(inNorm)) return map.get(inNorm);
      for (const v of arr) {
        const vn = normalizeVal(v);
        if (!vn) continue;
        if (normalizeVal(lastUser || "").includes(vn)) return v;
      }
      return input;
    };
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await r.json();
    const text = ((_i = (_h = (_g = (_f = (_e = data == null ? void 0 : data.candidates) == null ? void 0 : _e[0]) == null ? void 0 : _f.content) == null ? void 0 : _g.parts) == null ? void 0 : _h[0]) == null ? void 0 : _i.text) || "";
    let parsed = {};
    try {
      const clean = String(text).trim();
      const start = clean.indexOf("{");
      const end = clean.lastIndexOf("}");
      parsed = JSON.parse(clean.slice(start, end + 1));
    } catch (_) {
      parsed = {};
    }
    const allowed = /* @__PURE__ */ new Set([
      "part_number",
      "faixa_trabalho",
      "fabricante",
      "tipo_medicao",
      "diametro_montagem",
      "posicao_montagem",
      "conexao_instrumento",
      "visor",
      "classe_exatidao",
      "material_involucro",
      "material_internos",
      "unidade_leitura",
      "glicerina",
      "tubo_sifao",
      "selo_diafragma",
      "contato_eletrico",
      "valvula_isolamento",
      "certificados"
    ]);
    const keySynonyms = {};
    for (const [canonical, arr] of Object.entries(syn)) {
      const list = Array.isArray(arr) ? arr : [];
      for (const term of list) {
        const norm = String(term).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        keySynonyms[norm] = canonical;
      }
    }
    const filtersIn = (parsed == null ? void 0 : parsed.filters) || {};
    let filters = {};
    for (const [k, v] of Object.entries(filtersIn)) {
      const normKey = String(k || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const canonical = keySynonyms[normKey] || k;
      const useKey = allowed.has(canonical) ? canonical : allowed.has(k) ? k : void 0;
      if (!useKey) continue;
      const val = v == null ? "" : String(v).trim();
      if (!val) continue;
      if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(useKey)) {
        const norm = val.toLowerCase();
        filters[useKey] = norm.includes("n\xE3o") || norm === "nao" || norm === "false" ? "N\xE3o" : "Sim";
      } else {
        filters[useKey] = val;
      }
    }
    if (filters.faixa_trabalho) {
      const m = /(\d{1,5})\s*(?:[-–]|\ba\b|\bto\b|\bover\b|\/)\s*(\d{1,5})(?!["”])/i.exec(filters.faixa_trabalho) || /(\d{1,5})\s*\/\s*(\d{1,5})(?!["”])/i.exec(filters.faixa_trabalho);
      if (m) filters.faixa_trabalho = `${m[1]}/${m[2]}`;
    }
    if (filters.diametro_montagem) {
      const v = String(filters.diametro_montagem);
      let mmVal = "";
      let m = /(\d{2,3})\s*mm/i.exec(v);
      if (m) mmVal = `${m[1]}MM`;
      if (!mmVal) {
        m = /\b(?:ø|Ø)\s*(\d{2,3})\b/i.exec(v);
        if (m) mmVal = `${m[1]}MM`;
      }
      if (!mmVal) {
        const mc = /(\d{1,2})[\.,]\s*(\d)\s*cm/i.exec(v);
        if (mc) {
          const mm = Number(mc[1]) * 10 + Number(mc[2]);
          mmVal = `${mm}MM`;
        }
      }
      if (!mmVal) {
        const mn = /(\d{2,3})\b/.exec(v);
        if (mn) mmVal = `${mn[1]}MM`;
      }
      if (mmVal) filters.diametro_montagem = mmVal;
    }
    if (filters.conexao_instrumento) {
      const v = String(filters.conexao_instrumento);
      const m = /(1\/8|1\/4|3\/8|1\/2|3\/4)\s*["”']?\s*(npt|bsp|bsp-npt|bpst|bspt|g)/i.exec(v);
      if (m) {
        const frac = m[1];
        const std = m[2].toUpperCase().replace("BPST", "BSP").replace("BSPT", "BSP").replace(/^G$/, "BSP");
        filters.conexao_instrumento = `${frac}" ${std}`;
      }
    }
    if (filters.classe_exatidao && /\bb\b/i.test(filters.classe_exatidao)) filters.classe_exatidao = "CLASSE B";
    if (filters.tipo_medicao) {
      const v = String(filters.tipo_medicao).toLowerCase();
      if (/relat|gauge|pressao\s*relativa/.test(v)) filters.tipo_medicao = "RELATIVO";
      else if (/absolut/.test(v)) filters.tipo_medicao = "ABSOLUTO";
    }
    if (filters.visor) {
      const v = String(filters.visor).toLowerCase();
      if (/policarbonat|visor\s*pc|visor\s*plastico/.test(v)) filters.visor = "POLICARBONATO";
    }
    if (filters.material_internos) {
      const v = String(filters.material_internos).toLowerCase();
      if (/lat[aã]o|brass/.test(v)) filters.material_internos = "LAT\xC3O";
    }
    if (filters.unidade_leitura) {
      const v = String(filters.unidade_leitura).toLowerCase();
      if (/psi.*kgf|kgf\s*\/?\s*cm2/.test(v)) filters.unidade_leitura = "PSI X KGF/CM\xB2";
    }
    let categoria = (parsed == null ? void 0 : parsed.categoria) || void 0;
    if (!categoria) categoria = "Man\xF4metros";
    let distincts = null;
    try {
      distincts = await $fetch("/api/produtos/distinct", { params: { categoria, limit: 500 } });
    } catch {
    }
    filters.faixa_trabalho = pickCandidate("faixa_trabalho", filters.faixa_trabalho);
    filters.diametro_montagem = pickCandidate("diametro_montagem", filters.diametro_montagem);
    filters.posicao_montagem = pickCandidate("posicao_montagem", filters.posicao_montagem);
    filters.conexao_instrumento = pickCandidate("conexao_instrumento", filters.conexao_instrumento);
    filters.visor = pickCandidate("visor", filters.visor);
    filters.classe_exatidao = pickCandidate("classe_exatidao", filters.classe_exatidao);
    filters.unidade_leitura = pickCandidate("unidade_leitura", filters.unidade_leitura);
    let results = null;
    try {
      results = await $fetch("/api/produtos/search", {
        params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(filters) }
      });
    } catch (_) {
      results = null;
    }
    let total = Number((results == null ? void 0 : results.total) || 0);
    let items = Array.isArray(results == null ? void 0 : results.items) ? results.items : [];
    const headerBase = (parsed == null ? void 0 : parsed.explanation) ? String(parsed.explanation) : "";
    const fracOnly = /(1\/8|1\/4|3\/8|1\/2|3\/4)/i.exec(String(lastUser || ""));
    const hasNpt = /\bnpt\b/i.test(String(lastUser || ""));
    const hasBsp = /\bbsp(t)?\b|\bg\b/i.test(normUser);
    const headerExtra = fracOnly && !hasNpt && !hasBsp ? `Conex\xE3o ${fracOnly[0]} sem tipo (NPT/BSP). Confirma?` : "";
    let header = [headerBase, headerExtra].filter(Boolean).join("\n");
    if (!total) {
      const priority = ["certificados", "valvula_isolamento", "contato_eletrico", "selo_diafragma", "tubo_sifao", "glicerina", "material_internos", "visor", "unidade_leitura", "classe_exatidao", "posicao_montagem", "faixa_trabalho", "tipo_medicao"];
      const relaxable = priority.filter((k) => filters[k] != null);
      const removed = [];
      for (const k of relaxable) {
        const tmp = { ...filters };
        delete tmp[k];
        let r2 = null;
        try {
          r2 = await $fetch("/api/produtos/search", { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } });
        } catch (_) {
        }
        const t2 = Number((r2 == null ? void 0 : r2.total) || 0);
        if (t2 > 0) {
          results = r2;
          filters = tmp;
          total = t2;
          items = Array.isArray(r2 == null ? void 0 : r2.items) ? r2.items : [];
          removed.push(k);
          break;
        }
      }
      if (!removed.length) {
        const tmp = { ...filters };
        delete tmp.faixa_trabalho;
        delete tmp.posicao_montagem;
        let r3 = null;
        try {
          r3 = await $fetch("/api/produtos/search", { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } });
        } catch (_) {
        }
        const t3 = Number((r3 == null ? void 0 : r3.total) || 0);
        if (t3 > 0) {
          results = r3;
          filters = tmp;
          total = t3;
          items = Array.isArray(r3 == null ? void 0 : r3.items) ? r3.items : [];
        }
      }
      if (!total) {
        const msg = `${header ? header + "\n" : ""}N\xE3o encontrei produtos com essas especifica\xE7\xF5es. Tente ajustar os filtros.`;
        return { success: true, text: msg, filters, categoria, total, items: [] };
      }
      if (removed.length) header = [headerBase, headerExtra, `N\xE3o encontrei exato; relaxei: ${removed.join(", ")}`].filter(Boolean).join("\n");
    }
    const lines = [];
    if (header) lines.push(`${header}`);
    if (total === 1) {
      lines.push("Encontrei 1 produto.");
    } else {
      lines.push(`Encontrei ${total} produto(s). Exemplos:`);
    }
    for (const p of items.slice(0, 5)) {
      const brand = p.fabricante || "QUALITEC";
      const pn = p.part_number || p.id;
      const faixa = p.faixa_trabalho || "";
      const un = p.unidade_leitura || "";
      lines.push(`- ${brand} ${pn} \xB7 Faixa: ${faixa} ${un}`);
    }
    if (total === 1 && !wantEmail) {
      lines.push("Deseja enviar para o seu e-mail ou baixar o PDF?");
    }
    if (total >= 2 && total <= 3) {
      lines.push("Deseja comparar estes produtos?");
    }
    if (wantEmail && targetEmail && cfg.adminKey) {
      try {
        const pick = items.slice(0, 1).map((p) => ({
          id: p.part_number || p.id,
          title: p.part_number || "",
          brand: p.fabricante || "QUALITEC",
          quantity: 1,
          categoria: p.categoria,
          diametro_montagem: p.diametro_montagem,
          conexao_instrumento: p.conexao_instrumento,
          faixa_trabalho: p.faixa_trabalho,
          unidade_leitura: p.unidade_leitura
        }));
        const payload2 = {
          subject: "Pedido Qualitec \u2014 Produto solicitado via chat",
          message: "Pedido solicitado via chat.",
          to: targetEmail,
          order: { items: pick, user: { email: userEmail }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
        };
        await $fetch("/api/send-email", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-key": String(cfg.adminKey) }, body: payload2 });
        lines.push("Enviei o PDF do produto para o seu email.");
      } catch (_) {
        lines.push("Tentei enviar o PDF por email, mas ocorreu um erro.");
      }
    } else if (wantEmail && !targetEmail) {
      lines.push("Informe seu endere\xE7o de email para eu enviar o PDF.");
    }
    return { success: true, text: lines.join("\n"), filters, categoria, total, items };
  } catch (_) {
    return { success: false, text: "Erro ao consultar a IA." };
  }
});

export { chat_post as default };
//# sourceMappingURL=chat.post.mjs.map
