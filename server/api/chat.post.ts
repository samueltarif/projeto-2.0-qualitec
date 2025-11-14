export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig();
  const key = cfg.geminiApiKey;
  const body = await readBody(event);
  const msgs = Array.isArray(body?.messages) ? body.messages : [];
  const userEmail = String(body?.userEmail || '').trim();
  const empresaId = Number(body?.empresaId || 0);
  const action = String(body?.action || '').trim();

  const lastUser = msgs.reverse().find((m: any) => m?.role === 'user')?.content || '';
  const normUser = String(lastUser || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
  const explicitEmailMatch = /\b[\w.+-]+@[\w.-]+\.[a-z]{2,}\b/i.exec(String(lastUser || ''));
  const explicitEmail = explicitEmailMatch ? explicitEmailMatch[0] : '';
  const hasEmailWord = /(email|e\s*mail|endereco\s*de\s*email|meu\s*email|no\s*meu\s*email|pro\s*meu\s*email)/i.test(normUser);
  const emailVerbs = /(envia|enviar|envie|mandar|mande|manda|encaminha|encaminhar|encaminhe|joga|jogar)/i.test(normUser);
  const emailObjects = /(pdf|ficha\s*tecnica|catalogo|documento|arquivo|produto|modelo|item)/i.test(normUser);
  const downloadWords = /(baixar|baixa|download|exportar|exporta|exportacao)/i.test(normUser);
  const targetEmail = explicitEmail || userEmail;
  const wantEmail = (hasEmailWord && emailVerbs) || (emailVerbs && emailObjects && !!targetEmail) || (downloadWords && !!targetEmail) || /quero\s*receber\s*(no|em)\s*(email|e\s*mail)/i.test(normUser);

  if (action === 'send_email') {
    try {
      const itemsIn = Array.isArray(body?.order?.items) ? body.order.items : [];
      const toTargets = userEmail;
      if (!itemsIn.length) {
        return { success: false, text: 'Nenhum produto selecionado para enviar.', items: [], total: 0 };
      }
      if (!toTargets) {
        return { success: true, text: 'Informe seu endereço de email para eu enviar o PDF.', items: itemsIn, total: itemsIn.length };
      }
      const payload = {
        subject: 'Pedido Qualitec — Produto solicitado via chat',
        message: 'Pedido solicitado via chat.',
        to: toTargets,
        order: { items: itemsIn, user: { email: toTargets }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
      };
      await $fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': String(cfg.adminKey) }, body: payload });
      return { success: true, text: 'Enviei o PDF do produto para o seu email.', items: itemsIn, total: itemsIn.length };
    } catch (_) {
      return { success: false, text: 'Tentei enviar o PDF por email, mas ocorreu um erro.' };
    }
  }

  // Fallback heurístico quando a chave não está disponível
  if (!key) {
    const text = String(lastUser || '');
    const raw = text;
    const norm = raw
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    let filters: Record<string, string> = {};
    let categoria = /manometro|manometros/.test(norm) ? 'Manômetros' : 'Manômetros';
    let header = '';

    const hasAny = (arr: string[]) => arr.some((s) => norm.includes(s));
    const synInferior = ['inferior','reto','embaixo','vertical','conexao inferior','saida inferior','saída inferior','padrao inferior','rosca para baixo','monta direto na linha'];
    const synTraseiroConc = ['traseiro','montagem traseira','atras','atrás','saida posterior','saída posterior','conexao traseira','conexao atras','conexão traseira','conexão atrás','conexao traseira central','conexão traseira central','atras no meio','atrás no meio','central atras','central atrás','painel traseiro','montagem em painel traseiro','parede traseiro','concentrico','concentrico'];
    const synTraseiroExc = ['excentrico','excêntrico','deslocado','descentralizado','fora do centro','lateral','para o lado','traseiro lateral','conexao atras lateral','conexão atrás lateral','saida traseira lateral','saída traseira lateral'];
    if (hasAny(synInferior)) filters.posicao_montagem = 'RETO (INFERIOR)';
    else if (hasAny(synTraseiroConc)) filters.posicao_montagem = 'ANGULAR CONCÊNTRICO (TRASEIRO)';
    else if (hasAny(synTraseiroExc)) filters.posicao_montagem = 'ANGULAR EXCÊNTRICO (TRASEIRO)';

    if (/sem\s+glicerina|modelo\s+seco|dry\s*gauge|no\s*glycerin|not\s*glycerin\s*filled/.test(norm)) filters.glicerina = 'Não';
    else if (/glicerina|glicerinado|modelo\s+cheio|enchimento\s+liquido|fluido\s+de\s+amortecimento/.test(norm)) filters.glicerina = 'Sim';

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

    const mConn = /(1\/8|1\/4|3\/8|1\/2|3\/4)\s*["”']?\s*(npt|bsp|bsp-npt|bpst|bspt|g)/i.exec(raw) ||
      /(rosca|conexao|conexão|entrada|bocal|engate)\s*(\d\/\d)?\s*["”']?\s*(npt|bsp|bspt|g)/i.exec(raw);
    if (mConn) {
      const frac = mConn[2] && /\d\/\d/.test(mConn[2]) ? mConn[2] : mConn[1];
      const stdRaw = mConn[mConn.length - 1].toUpperCase();
      const std = stdRaw.replace('BPST','BSP').replace('BSPT','BSP').replace(/^G$/, 'BSP');
      if (frac) filters.conexao_instrumento = `${frac}" ${std}`;
    }
    if (!filters.conexao_instrumento) {
      const fracOnly = /(1\/8|1\/4|3\/8|1\/2|3\/4)/i.exec(raw);
      const hasNpt = /\bnpt\b/i.test(raw);
      const hasBsp = /\bbsp(t)?\b|\bg\b/i.test(norm);
      if (fracOnly && !hasNpt && !hasBsp) header = `Conexão ${fracOnly[0]} sem tipo (NPT/BSP). Confirma?`;
    }

    const mFaixa = /(\d{1,5})\s*\/\s*(\d{1,5})(?!["”])(?:\s*(psi|bar|kgf\/cm\u00B2|kgf\/cm2))?/i.exec(raw);
    if (mFaixa) filters.faixa_trabalho = `${mFaixa[1]}/${mFaixa[2]}`;
    if (!filters.faixa_trabalho) {
      const mFaixa2 = /\b(\d{1,5})\s*(?:[-–]|\ba\b|\bto\b|\bover\b|\/)\s*(\d{1,5})(?!["”])\b/i.exec(raw);
      if (mFaixa2) filters.faixa_trabalho = `${mFaixa2[1]}/${mFaixa2[2]}`;
    }

    if (/psi\s*x\s*kgf\/?cm2|psi\s*x\s*kgf\/cm\u00B2|psi\s*x\s*kgf\/cm²|dupla\s*escala|kgf\s*\/?\s*cm2/i.test(norm)) filters.unidade_leitura = 'PSI X KGF/CM²';
    else if (/\bbar\b/i.test(raw)) filters.unidade_leitura = 'BAR';
    else if (/\bpsi\b/i.test(raw)) filters.unidade_leitura = 'PSI';

    if (/classe|precisao|tolerancia|erro\s+percentual/i.test(norm)) {
      const mClass = /(classe|precisao)\s*([a-z0-9\.\-]+)/i.exec(raw);
      if (mClass) filters.classe_exatidao = mClass[2];
    }
    if (/\b(classe\s*-?\s*b|precision\s*b|acuracia\s*classe\s*b|cl\s*b)\b/i.test(norm)) filters.classe_exatidao = 'CLASSE B';

    if (/relat(ivo)?|gauge|press(\u00E3|a)o\s*relativa?/i.test(norm)) filters.tipo_medicao = 'RELATIVO';
    else if (/absolut[oa]|absolute\s*pressure/i.test(norm)) filters.tipo_medicao = 'ABSOLUTO';
    if (/montagem\s+(inferior|traseira|painel|flangeada)/i.test(norm)) filters.posicao_montagem = RegExp.$1;
    if (/visor|janela|display|lente|vidro\s+frontal/i.test(norm)) filters.visor = raw;
    if (/(policarbonat(o|e)|visor\s*pc|visor\s*pl[\u00E1a]stico)/i.test(norm)) filters.visor = 'POLICARBONATO';
    if (/contato\s+eletrico|alarme\s+eletrico|microchave|rele\s+de\s+pressao/i.test(norm)) filters.contato_eletrico = 'Sim';
    if (/sem\s*contato\s*el[e\u00E9]trico|no\s*electric(al)?|sem\s*switch/i.test(norm)) filters.contato_eletrico = 'Não';
    if (/selo\s+diafragma|selo\s+sanitario|selo\s+quimico|isolador\s+de\s+processo/i.test(norm)) filters.selo_diafragma = 'Sim';
    if (/sem\s*(selo\s*)?diafragm(a|o)|no\s*diaphragm/i.test(norm)) filters.selo_diafragma = 'Não';
    if (/valvula\s+(bloqueio|de\s+corte|de\s+esfera|de\s+agulha|de\s+instrumento|de\s+processo)/i.test(norm)) filters.valvula_isolamento = 'Sim';
    if (/sem\s*v[\u00E1a]lvula\s*de\s*isolamento|no\s*isolation\s*valve/i.test(norm)) filters.valvula_isolamento = 'Não';
    if (/sifao|tubo\s+de\s+sifao|serpentina|tubo\s+espiral|siphon|syphon/i.test(norm)) filters.tubo_sifao = 'Sim';
    if (/sem\s*sif[\u00F5o]o|sem\s*tubo\s*sif[a\u00E3]o|no\s*siphon/i.test(norm)) filters.tubo_sifao = 'Não';

    let distincts: any = null;
    try {
      distincts = await $fetch('/api/produtos/distinct', { params: { categoria, limit: 500 } });
    } catch {}

    function normalizeVal(s: string) {
      return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    }
    function pickCandidate(key: string, input?: string) {
      const arr: string[] = distincts?.values?.[key] || [];
      const map = new Map(arr.map(v => [normalizeVal(v), v]));
      const inNorm = normalizeVal(input || '');
      if (map.has(inNorm)) return map.get(inNorm);
      for (const v of arr) {
        const vn = normalizeVal(v);
        if (!vn) continue;
        if (normalizeVal(raw).includes(vn)) return v;
      }
      return input;
    }

    filters.faixa_trabalho = pickCandidate('faixa_trabalho', filters.faixa_trabalho);
    filters.diametro_montagem = pickCandidate('diametro_montagem', filters.diametro_montagem);
    filters.posicao_montagem = pickCandidate('posicao_montagem', filters.posicao_montagem);
    filters.conexao_instrumento = pickCandidate('conexao_instrumento', filters.conexao_instrumento);
    filters.visor = pickCandidate('visor', filters.visor);
    filters.classe_exatidao = pickCandidate('classe_exatidao', filters.classe_exatidao);
    filters.unidade_leitura = pickCandidate('unidade_leitura', filters.unidade_leitura);

    const faixas: string[] = distincts?.values?.faixa_trabalho || [];
    if (filters.faixa_trabalho && !faixas.includes(filters.faixa_trabalho)) delete filters.faixa_trabalho;
    const diamVals: string[] = distincts?.values?.diametro_montagem || [];
    if (filters.diametro_montagem && !diamVals.includes(filters.diametro_montagem)) {
      const mm = Number(String(filters.diametro_montagem).replace(/[^0-9]/g, ''));
      let choose = '';
      for (const v of diamVals) {
        const n = Number(String(v).replace(/[^0-9]/g, ''));
        if (Math.abs(n - mm) <= 1) { choose = v; break; }
      }
      if (choose) filters.diametro_montagem = choose;
    }

    let results: any = null;
    try {
      results = await $fetch('/api/produtos/search', { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(filters) } });
    } catch (_) {
      results = null;
    }
    let total = Number(results?.total || 0);
    let items = Array.isArray(results?.items) ? results.items : [];
    if (!total) {
      const priority = ['certificados','valvula_isolamento','contato_eletrico','selo_diafragma','tubo_sifao','glicerina','material_internos','visor','unidade_leitura','classe_exatidao','posicao_montagem','faixa_trabalho','tipo_medicao'];
      const relaxable = priority.filter((k) => (filters as any)[k] != null);
      const removed: string[] = [];
      for (const k of relaxable) {
        const tmp: any = { ...filters };
        delete tmp[k];
        let r2: any = null;
        try { r2 = await $fetch('/api/produtos/search', { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } }); } catch (_) {}
        const t2 = Number(r2?.total || 0);
        if (t2 > 0) { results = r2; filters = tmp; total = t2; items = Array.isArray(r2?.items) ? r2.items : []; removed.push(k); break; }
      }
      if (!removed.length) {
        const tmp: any = { ...filters };
        delete tmp.faixa_trabalho;
        delete tmp.posicao_montagem;
        let r3: any = null;
        try { r3 = await $fetch('/api/produtos/search', { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } }); } catch (_) {}
        const t3 = Number(r3?.total || 0);
        if (t3 > 0) { results = r3; filters = tmp; total = t3; items = Array.isArray(r3?.items) ? r3.items : []; }
      }
      if (!total) return { success: true, text: 'Não encontrei produtos com essas especificações. Tente ajustar os filtros.', filters, categoria, total, items: [] };
      if (removed.length) header = `${header ? header + '\n' : ''}Não encontrei exato; relaxei: ${removed.join(', ')}`;
    }
    const lines: string[] = [];
    if (header) lines.push(header);
    if (total === 1) {
      lines.push('Encontrei 1 produto.');
    } else {
      lines.push(`Encontrei ${total} produto(s). Exemplos:`);
    }
    for (const p of items.slice(0, 5)) {
      const brand = p.fabricante || '';
      const pn = p.part_number || p.id;
      const faixa = p.faixa_trabalho || '';
      const un = p.unidade_leitura || '';
      lines.push(`- ${brand} ${pn} · Faixa: ${faixa} ${un}`);
    }
    if (total === 1 && !wantEmail) {
      lines.push('Deseja enviar para o seu e-mail ou baixar o PDF?');
    }
    if (total >= 2 && total <= 3) {
      lines.push('Deseja comparar estes produtos?');
    }
    if (wantEmail && targetEmail && cfg.adminKey) {
      try {
        const pick = items.slice(0, 1).map((p: any) => ({
          id: p.part_number || p.id,
          title: p.part_number || '',
          brand: p.fabricante || 'QUALITEC',
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
          valvula_isolamento: p.valvula_isolamento,
        }));
        const payload = {
          subject: 'Pedido Qualitec — Produto solicitado via chat',
          message: 'Pedido solicitado via chat.',
          to: targetEmail,
          order: { items: pick, user: { email: userEmail }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
        };
        await $fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': String(cfg.adminKey) }, body: payload });
        lines.push('Enviei o PDF do produto para o seu email.');
      } catch (_) {
        lines.push('Tentei enviar o PDF por email, mas ocorreu um erro.');
      }
    } else if (wantEmail && !targetEmail) {
      lines.push('Informe seu endereço de email para eu enviar o PDF.');
    }
    return { success: true, text: lines.join('\n'), filters, categoria, total, items };
  }

  const syn = cfg.filterSynonyms || {};
  const synText = Object.entries(syn)
    .map(([k, arr]: any) => `${k}: ${(arr || []).join(', ')}`)
    .join(' | ');

  const instruction = [
    'Responda em português. Extraia filtros válidos do texto do usuário e retorne um JSON. ',
    'Chaves permitidas: part_number, faixa_trabalho, fabricante, tipo_medicao, diametro_montagem, posicao_montagem, ',
    'conexao_instrumento, visor, classe_exatidao, material_involucro, material_internos, unidade_leitura, ',
    'glicerina, tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento, certificados. ',
    'Valores devem ser strings. Para flags, use "Sim" ou "Não". Inclua também a chave categoria quando aplicável. ',
    'Retorne apenas JSON no formato {"filters":{...},"categoria":string|undefined,"explanation":string}. ',
    `Sinônimos aceitos: ${synText}`
  ].join('');

  const contents = [
    { role: 'user', parts: [{ text: instruction }] },
    { role: 'user', parts: [{ text: String(lastUser || '') }] }
  ];

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + key;
  const payload = { contents, generationConfig: { temperature: 0.3, maxOutputTokens: 1024 } };

  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await r.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    let parsed: any = {};
    try {
      const clean = String(text).trim();
      const start = clean.indexOf('{');
      const end = clean.lastIndexOf('}');
      parsed = JSON.parse(clean.slice(start, end + 1));
    } catch (_) {
      parsed = {};
    }

    const allowed = new Set([
      'part_number','faixa_trabalho','fabricante','tipo_medicao','diametro_montagem','posicao_montagem',
      'conexao_instrumento','visor','classe_exatidao','material_involucro','material_internos','unidade_leitura',
      'glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento','certificados'
    ]);
    const keySynonyms: Record<string,string> = {};
    for (const [canonical, arr] of Object.entries(syn)) {
      const list = Array.isArray(arr) ? arr : [];
      for (const term of list) {
        const norm = String(term).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        keySynonyms[norm] = canonical;
      }
    }
    const filtersIn = parsed?.filters || {};
    let filters: Record<string,string> = {};
    for (const [k, v] of Object.entries(filtersIn)) {
      const normKey = String(k || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const canonical = keySynonyms[normKey] || k;
      const useKey = allowed.has(canonical) ? canonical : (allowed.has(k) ? k : undefined);
      if (!useKey) continue;
      const val = v == null ? '' : String(v).trim();
      if (!val) continue;
      if (['glicerina','tubo_sifao','selo_diafragma','contato_eletrico','valvula_isolamento'].includes(useKey)) {
        const norm = val.toLowerCase();
        filters[useKey] = norm.includes('não') || norm === 'nao' || norm === 'false' ? 'Não' : 'Sim';
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
      let mmVal = '';
      let m = /(\d{2,3})\s*mm/i.exec(v);
      if (m) mmVal = `${m[1]}MM`;
      if (!mmVal) { m = /\b(?:ø|Ø)\s*(\d{2,3})\b/i.exec(v); if (m) mmVal = `${m[1]}MM`; }
      if (!mmVal) { const mc = /(\d{1,2})[\.,]\s*(\d)\s*cm/i.exec(v); if (mc) { const mm = Number(mc[1])*10 + Number(mc[2]); mmVal = `${mm}MM`; } }
      if (!mmVal) { const mn = /(\d{2,3})\b/.exec(v); if (mn) mmVal = `${mn[1]}MM`; }
      if (mmVal) filters.diametro_montagem = mmVal;
    }
    if (filters.conexao_instrumento) {
      const v = String(filters.conexao_instrumento);
      const m = /(1\/8|1\/4|3\/8|1\/2|3\/4)\s*["”']?\s*(npt|bsp|bsp-npt|bpst|bspt|g)/i.exec(v);
      if (m) {
        const frac = m[1];
        const std = m[2].toUpperCase().replace('BPST','BSP').replace('BSPT','BSP').replace(/^G$/, 'BSP');
        filters.conexao_instrumento = `${frac}" ${std}`;
      }
    }
    if (filters.classe_exatidao && /\bb\b/i.test(filters.classe_exatidao)) filters.classe_exatidao = 'CLASSE B';
    if (filters.tipo_medicao) {
      const v = String(filters.tipo_medicao).toLowerCase();
      if (/relat|gauge|pressao\s*relativa/.test(v)) filters.tipo_medicao = 'RELATIVO';
      else if (/absolut/.test(v)) filters.tipo_medicao = 'ABSOLUTO';
    }
    if (filters.visor) {
      const v = String(filters.visor).toLowerCase();
      if (/policarbonat|visor\s*pc|visor\s*plastico/.test(v)) filters.visor = 'POLICARBONATO';
    }
    if (filters.material_internos) {
      const v = String(filters.material_internos).toLowerCase();
      if (/lat[aã]o|brass/.test(v)) filters.material_internos = 'LATÃO';
    }
    if (filters.unidade_leitura) {
      const v = String(filters.unidade_leitura).toLowerCase();
      if (/psi.*kgf|kgf\s*\/?\s*cm2/.test(v)) filters.unidade_leitura = 'PSI X KGF/CM²';
    }

    let categoria = parsed?.categoria || undefined;
    if (!categoria) categoria = 'Manômetros';
    let distincts: any = null;
    try {
      distincts = await $fetch('/api/produtos/distinct', { params: { categoria, limit: 500 } });
    } catch {}

    function normalizeVal(s: string) {
      return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    }
    function pickCandidate(key: string, input?: string) {
      const arr: string[] = distincts?.values?.[key] || [];
      const map = new Map(arr.map(v => [normalizeVal(v), v]));
      const inNorm = normalizeVal(input || '');
      if (map.has(inNorm)) return map.get(inNorm);
      for (const v of arr) {
        const vn = normalizeVal(v);
        if (!vn) continue;
        if (normalizeVal(lastUser || '').includes(vn)) return v;
      }
      return input;
    }

    filters.faixa_trabalho = pickCandidate('faixa_trabalho', filters.faixa_trabalho);
    filters.diametro_montagem = pickCandidate('diametro_montagem', filters.diametro_montagem);
    filters.posicao_montagem = pickCandidate('posicao_montagem', filters.posicao_montagem);
    filters.conexao_instrumento = pickCandidate('conexao_instrumento', filters.conexao_instrumento);
    filters.visor = pickCandidate('visor', filters.visor);
    filters.classe_exatidao = pickCandidate('classe_exatidao', filters.classe_exatidao);
    filters.unidade_leitura = pickCandidate('unidade_leitura', filters.unidade_leitura);

    let results: any = null;
    try {
      results = await $fetch('/api/produtos/search', {
        params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(filters) }
      });
    } catch (_) {
      results = null;
    }

    let total = Number(results?.total || 0);
    let items = Array.isArray(results?.items) ? results.items : [];
    const headerBase = parsed?.explanation ? String(parsed.explanation) : '';
    const fracOnly = /(1\/8|1\/4|3\/8|1\/2|3\/4)/i.exec(String(lastUser || ''));
    const hasNpt = /\bnpt\b/i.test(String(lastUser || ''));
    const hasBsp = /\bbsp(t)?\b|\bg\b/i.test(normUser);
    const headerExtra = fracOnly && !hasNpt && !hasBsp ? `Conexão ${fracOnly[0]} sem tipo (NPT/BSP). Confirma?` : '';
    let header = [headerBase, headerExtra].filter(Boolean).join('\n');
    if (!total) {
      const priority = ['certificados','valvula_isolamento','contato_eletrico','selo_diafragma','tubo_sifao','glicerina','material_internos','visor','unidade_leitura','classe_exatidao','posicao_montagem','faixa_trabalho','tipo_medicao'];
      const relaxable = priority.filter((k) => (filters as any)[k] != null);
      const removed: string[] = [];
      for (const k of relaxable) {
        const tmp: any = { ...filters };
        delete tmp[k];
        let r2: any = null;
        try { r2 = await $fetch('/api/produtos/search', { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } }); } catch (_) {}
        const t2 = Number(r2?.total || 0);
        if (t2 > 0) { results = r2; filters = tmp; total = t2; items = Array.isArray(r2?.items) ? r2.items : []; removed.push(k); break; }
      }
      if (!removed.length) {
        const tmp: any = { ...filters };
        delete tmp.faixa_trabalho;
        delete tmp.posicao_montagem;
        let r3: any = null;
        try { r3 = await $fetch('/api/produtos/search', { params: { categoria, page: 1, pageSize: 6, filters: JSON.stringify(tmp) } }); } catch (_) {}
        const t3 = Number(r3?.total || 0);
        if (t3 > 0) { results = r3; filters = tmp; total = t3; items = Array.isArray(r3?.items) ? r3.items : []; }
      }
      if (!total) {
        const msg = `${header ? header + '\n' : ''}Não encontrei produtos com essas especificações. Tente ajustar os filtros.`;
        return { success: true, text: msg, filters, categoria, total, items: [] };
      }
      if (removed.length) header = [headerBase, headerExtra, `Não encontrei exato; relaxei: ${removed.join(', ')}`].filter(Boolean).join('\n');
    }
    const lines: string[] = [];
    if (header) lines.push(`${header}`);
    if (total === 1) {
      lines.push('Encontrei 1 produto.');
    } else {
      lines.push(`Encontrei ${total} produto(s). Exemplos:`);
    }
    for (const p of items.slice(0, 5)) {
      const brand = p.fabricante || 'QUALITEC';
      const pn = p.part_number || p.id;
      const faixa = p.faixa_trabalho || '';
      const un = p.unidade_leitura || '';
      lines.push(`- ${brand} ${pn} · Faixa: ${faixa} ${un}`);
    }
    if (total === 1 && !wantEmail) {
      lines.push('Deseja enviar para o seu e-mail ou baixar o PDF?');
    }
    if (total >= 2 && total <= 3) {
      lines.push('Deseja comparar estes produtos?');
    }
    if (wantEmail && targetEmail && cfg.adminKey) {
      try {
        const pick = items.slice(0, 1).map((p: any) => ({
          id: p.part_number || p.id,
          title: p.part_number || '',
          brand: p.fabricante || 'QUALITEC',
          quantity: 1,
          categoria: p.categoria,
          diametro_montagem: p.diametro_montagem,
          conexao_instrumento: p.conexao_instrumento,
          faixa_trabalho: p.faixa_trabalho,
          unidade_leitura: p.unidade_leitura,
        }));
        const payload = {
          subject: 'Pedido Qualitec — Produto solicitado via chat',
          message: 'Pedido solicitado via chat.',
          to: targetEmail,
          order: { items: pick, user: { email: userEmail }, empresaId: Number.isFinite(empresaId) && empresaId > 0 ? empresaId : null }
        };
        await $fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': String(cfg.adminKey) }, body: payload });
        lines.push('Enviei o PDF do produto para o seu email.');
      } catch (_) {
        lines.push('Tentei enviar o PDF por email, mas ocorreu um erro.');
      }
    } else if (wantEmail && !targetEmail) {
      lines.push('Informe seu endereço de email para eu enviar o PDF.');
    }
    return { success: true, text: lines.join('\n'), filters, categoria, total, items };
  } catch (_) {
    return { success: false, text: 'Erro ao consultar a IA.' };
  }
});
