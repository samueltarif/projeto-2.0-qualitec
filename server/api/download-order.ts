import { defineEventHandler, readBody, setHeader, getQuery } from 'h3';
import JSZip from 'jszip';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
// import mysql from 'mysql2/promise'; // MySQL comentado para produção

type CartItem = {
  id: string | number;
  title?: string;
  brand?: string;
  quantity: number;
  categoria?: string;
  diametro_montagem?: string;
  conexao_instrumento?: string;
  faixa_trabalho?: string;
  unidade_leitura?: string;
  notes?: string;
  tipo_medicao?: string;
  posicao_montagem?: string;
  material_involucro?: string;
  material_internos?: string;
  visor?: string;
  classe_exatidao?: string;
  glicerina?: string | number | boolean;
  certificados?: string | string[];
  tubo_sifao?: string | number | boolean;
  selo_diafragma?: string | number | boolean;
  contato_eletrico?: string | number | boolean;
  valvula_isolamento?: string | number | boolean;
};

interface DownloadPayload {
  items: CartItem[];
  user: { email?: string; fullName?: string; sector?: string; whatsapp?: string };
  empresaId?: number | null;
}

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as DownloadPayload;
  const config = useRuntimeConfig(event);
  const q = getQuery(event) as any;
  const format = String(q?.format || '').toLowerCase();

  const items = Array.isArray(body?.items) ? body.items.filter(Boolean) : [];
  if (!items.length) {
    setHeader(event, 'Content-Type', 'application/json');
    return { success: false, message: 'Carrinho vazio.' };
  }

  // Buscar dados da empresa do cliente pelo empresaId (se disponível)
  let company: { cnpj?: string; razao_social?: string; email?: string; filial?: string } | null = null;
  if (typeof body?.empresaId === 'number' && Number.isFinite(body.empresaId)) {
    try {
      // Usa Supabase para testes
      if (config.supabaseUrl && config.supabaseKey) {
        const supabase = createClient(config.supabaseUrl, config.supabaseKey);
        const { data, error } = await supabase
          .from('empresas')
          .select('cnpj, razao_social, email, filial')
          .eq('id', body.empresaId)
          .single();
        if (!error && data) company = data;
      }
      /*
      // CÓDIGO MYSQL PARA PRODUÇÃO (comentado)
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase,
      });
      const [rows]: any = await connection.execute(
        'SELECT cnpj, razao_social, email, filial FROM empresas WHERE id = ? LIMIT 1',
        [body.empresaId]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        company = rows[0];
      }
      await connection.end();
      */
    } catch (_) {
      // silencioso: se falhar, seguimos sem dados da empresa
    }
  }

  const now = new Date();
  const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  const formattedDate = formatter.format(now);

  // JSON para automações futuras
  const orderJson = {
    generatedAt: now.toISOString(),
    generatedAtLabel: formattedDate,
    company,
    client: {
      email: String(body?.user?.email || ''),
      fullName: String(body?.user?.fullName || ''),
      sector: String(body?.user?.sector || ''),
      whatsapp: String(body?.user?.whatsapp || ''),
    },
    items: items.map((p) => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      quantity: p.quantity,
      categoria: p.categoria,
      specs: {
        diametro_montagem: p.diametro_montagem,
        conexao_instrumento: p.conexao_instrumento,
        faixa_trabalho: p.faixa_trabalho,
        unidade_leitura: p.unidade_leitura,
      },
      notes: p.notes,
    })),
    totalItems: items.reduce((sum, p) => sum + (p.quantity || 0), 0),
  };

  // Gerar PDF em memória com layout A4
  const enriched = await enrichItems(items, config);
  const pdfBuffer = await generateOrderPdf({ items: enriched, company, client: orderJson.client, formattedDate });

  const safeTs = now.toISOString().replace(/[:T]/g, '-').slice(0, 16);
  if (format === 'pdf') {
    const filenamePdf = `pedido_qualitec_${safeTs}.pdf`;
    setHeader(event, 'Content-Type', 'application/pdf');
    setHeader(event, 'Content-Disposition', `attachment; filename="${filenamePdf}"`);
    return pdfBuffer;
  } else {
    const zip = new JSZip();
    zip.file('pedido.json', JSON.stringify(orderJson, null, 2), { createFolders: false });
    zip.file('pedido.pdf', pdfBuffer);
    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });
    const filenameZip = `pedido_qualitec_${safeTs}.zip`;
    setHeader(event, 'Content-Type', 'application/zip');
    setHeader(event, 'Content-Disposition', `attachment; filename="${filenameZip}"`);
    return zipBuffer;
  }
});

async function generateOrderPdf(args: {
  items: CartItem[];
  company: { cnpj?: string; razao_social?: string; email?: string; filial?: string } | null;
  client: { email?: string; fullName?: string; sector?: string; whatsapp?: string };
  formattedDate: string;
}) {
  const { items, company, client, formattedDate } = args;
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const CM = 28.3464567; // pontos por centímetro

  const chunks: Buffer[] = [];
  const bufferPromise = new Promise<Buffer>((resolve) => {
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  // Cabeçalho: logo mais acima e, abaixo dela, informações da Qualitec
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const logoY = 24; // mais próximo do topo
  const logoBox = { fit: [160, 64] } as const; // tamanho estável
  if (fs.existsSync(logoPath)) {
    try { 
      console.log('Logo found at:', logoPath);
      doc.image(logoPath, 40, logoY, logoBox); 
    } catch (err) {
      console.error('Error loading logo:', err);
    }
  } else {
    console.log('Logo not found at:', logoPath);
  }

  // Layout em três colunas com gap ≥ 1,5 cm
  const pageWidth = doc.page?.width || 595;
  const marginLeft = 40;
  const marginRight = 40;
  const innerWidth = pageWidth - marginLeft - marginRight;
  const colGap = Math.max(1.5 * CM, 16); // pelo menos 1,5 cm entre colunas
  const availableWidth = innerWidth - (2 * colGap);
  const leftColWidth = Math.floor(0.40 * availableWidth);
  const centerColWidth = Math.floor(0.30 * availableWidth);
  const rightColWidth = availableWidth - leftColWidth - centerColWidth;
  const leftColX = marginLeft;
  const centerColX = leftColX + leftColWidth + colGap;
  const rightColX = centerColX + centerColWidth + colGap;

  // Bloco Qualitec (coluna esquerda) imediatamente abaixo da logo
  const logoToTextSpacing = 8; // mantém a posição da base do bloco em relação à logo
  const companyBlockY = logoY + logoBox.fit[1] + logoToTextSpacing;
  let leftY = companyBlockY;
  // Preferência: empurrar o nome da empresa para baixo em relação à logo
  const leftTitleTopMargin = 12; // margem superior do título, sem afetar CNPJ/endereço
  const leftTitleGap = 18; // espaçamento após o título (não altera CNPJ/endereço)
  const leftLineGap = 16;  // espaçamento entre linhas (mantido)
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827');
  leftY += leftTitleTopMargin;
  const companyTitle = 'Qualitec Com Serv Instr de Medição Ltda';
  const titleOpts = { width: leftColWidth, align: 'left' } as const;
  doc.text(companyTitle, leftColX, leftY, titleOpts);
  // Corrige sobreposição: soma a altura real do título (pode quebrar em 2 linhas)
  const titleHeight = doc.heightOfString(companyTitle, titleOpts);
  leftY += titleHeight + leftTitleGap;
  doc.font('Helvetica').fontSize(10).fillColor('#374151');
  doc.text('CNPJ: 09.117.117/0001-24', leftColX, leftY, { width: leftColWidth, align: 'left' });
  leftY += leftLineGap;
  doc.text('Rua Fazenda Monte Alegre, 367', leftColX, leftY, { width: leftColWidth, align: 'left' });
  leftY += leftLineGap;
  // Mantém estilo corporativo com travessões “–” conforme pedido
  doc.text('05160-060 – São Paulo – SP – Brasil', leftColX, leftY, { width: leftColWidth, align: 'left' });
  leftY += leftLineGap;
  const leftBottomY = leftY;

  // Topo das colunas alinhado com o bloco da Qualitec
  const columnsTopY = companyBlockY;

  // Centro: DADOS DO CLIENTE (Arial/Helvetica 10 ou similar)
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827');
  doc.text('DADOS DO CLIENTE', centerColX, columnsTopY, { width: centerColWidth, align: 'left' });
  doc.font('Helvetica').fontSize(10).fillColor('#374151');
  const cnpjTxt = company?.cnpj ? `CNPJ: ${company.cnpj}` : 'CNPJ: —';
  const empresaTxt = company?.razao_social ? `Empresa: ${company.razao_social}` : 'Empresa: —';
  const filialTxt = company?.filial ? `Filial: ${company.filial}` : 'Filial: —';
  const emailTxt = client?.email ? `Email: ${client.email.toLowerCase()}` : `Email: ${company?.email || '—'}`;
  let centerY = columnsTopY + 16;
  [cnpjTxt, empresaTxt, filialTxt, emailTxt].forEach((line) => {
    doc.text(line, centerColX, centerY, { width: centerColWidth, align: 'left' });
    centerY += 14;
  });

  // Direita: Contato Comercial (Qualitec)
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827');
  doc.text('Contato Comercial', rightColX, columnsTopY, { width: rightColWidth, align: 'left' });
  doc.font('Helvetica').fontSize(10).fillColor('#111827');
  const qualitecContato = {
    nome: 'Marco A. Casmalla',
    fone: '+55 11 99918-4979',
    email: 'marco@qualitec.ind.br',
  };
  let contactY = columnsTopY + 16;
  [qualitecContato.nome, qualitecContato.fone, qualitecContato.email].forEach((line) => {
    doc.text(line, rightColX, contactY, { width: rightColWidth, align: 'left' });
    contactY += 14;
  });

  // Data e hora abaixo do bloco do cabeçalho (evita sobreposição)
  const headerBottomY = Math.max(leftBottomY, centerY, contactY);
  doc.moveDown(0.2);
  doc.font('Helvetica').fontSize(10).fillColor('#111827');
  const afterHeaderExtra = 2 * CM; // deslocar Data/hora e produtos 2 cm para baixo
  const dateY = headerBottomY + 6 + afterHeaderExtra;
  doc.text(`Data: ${formattedDate}`, 40, dateY);

  // Espaço de uma linha entre data/hora e o primeiro produto
  const lineGap = 16;
  let cursorY = dateY + lineGap;
  const titleColor = '#1d4ed8'; // azul
  const sectionColor = '#111827';
  const labelColor = '#374151';

  items.forEach((p, idx) => {
    if (idx > 0) {
      // Espaço alvo entre produtos: 3 cm. Quebra página só se necessário.
      const BOTTOM_MARGIN = 40;
      const PAGE_HEIGHT = doc.page.height || 842;
      const estimatedRows = 20; // adiciona linha "Categoria" no topo
      const estimatedBlockHeight =
        14 /* título */ +
        (0.5 * CM) /* espaço após título */ +
        11 /* fonte do cabeçalho da seção */ +
        18 /* espaço após cabeçalho da seção */ +
        (estimatedRows * 16); /* altura total das linhas */

      const neededSpace = (3 * CM) + estimatedBlockHeight;
      const availableSpace = (PAGE_HEIGHT - BOTTOM_MARGIN) - cursorY;

      if (availableSpace < neededSpace) {
        // Não cabe no restante da página, inicia em nova página
        doc.addPage();
        cursorY = 40;
      } else {
        // Cabe, então mantém 3 cm entre os produtos
        cursorY += (3 * CM);
      }
    }

    // Título do produto (sem quantidade no título, conforme ajuste solicitado)
    const productTitle = String(p.categoria || p.title || `Produto ${p.id}`).toUpperCase();
    doc.font('Helvetica-Bold').fontSize(14).fillColor(titleColor);
    doc.text(productTitle, 40, cursorY);
    // Espaço de 0,5 cm antes das informações abaixo do título
    cursorY += (0.5 * CM);

    // Removido: linha "Categoria" para evitar duplicidade com título

    // Sub-seção: Especificações detalhadas
    doc.font('Helvetica-Bold').fontSize(11).fillColor(sectionColor);
    doc.text('Especificações detalhadas:', 40, cursorY);
    cursorY += 18;

    // Tabela de especificações com valor próximo ao rótulo (sem grande espaçamento)
    const row = (label: string, value: string | number | undefined) => {
      const v = value != null && String(value).trim() ? String(value) : '—';
      const lab = label.endsWith(':') ? label : `${label}:`;
      doc.font('Helvetica-Bold').fontSize(10).fillColor(labelColor);
      doc.text(lab, 40, cursorY);
      const labelW = doc.widthOfString(lab);
      const gap = 6; // pequeno espaçamento entre label e valor
      doc.font('Helvetica').fontSize(10).fillColor('#111827');
      doc.text(v, 40 + labelW + gap, cursorY);
      cursorY += 16;
    };

    // Quantidade ANTES do Part Number, dentro da tabela
    row('Quantidade:', p.quantity);
    // Part Number: se id for string com padrão, usa id; senão tenta o título
    const partNumber = typeof p.id === 'string' ? p.id : (p.title || '—');
    row('Part Number:', partNumber);
    row('Fabricante:', p.brand || 'QUALITEC');
    row('Faixa de Pressão:', p.faixa_trabalho);
    row('Diâmetro:', p.diametro_montagem);
    row('Conexão:', p.conexao_instrumento);
    const boolText = (v: any) => {
      const s = String(v ?? '').trim().toLowerCase();
      if (v === 1 || s === '1' || v === true || s === 'sim') return 'Sim';
      if (v === 0 || s === '0' || v === false || s === 'nao' || s === 'não') return 'Não';
      return s ? String(v) : '—';
    };
    const certText = (v: any) => {
      if (Array.isArray(v)) return v.filter(Boolean).join(', ');
      try {
        const arr = JSON.parse(String(v ?? ''));
        if (Array.isArray(arr)) return arr.join(', ');
      } catch {}
      const s = String(v ?? '').trim();
      return s || '—';
    };
    row('Tipo de Medição:', p.tipo_medicao);
    row('Posição de Montagem:', p.posicao_montagem);
    row('Material do Invólucro:', p.material_involucro);
    row('Material dos Internos:', p.material_internos);
    row('Visor:', p.visor);
    row('Classe de Exatidão:', p.classe_exatidao);
    row('Unidade de Leitura:', p.unidade_leitura);
    row('Enchimento de Glicerina:', boolText(p.glicerina));
    row('Certificados:', certText(p.certificados));
    row('Tubo Sifão:', boolText(p.tubo_sifao));
    row('Selo Diafragma:', boolText(p.selo_diafragma));
    row('Contato Elétrico:', boolText(p.contato_eletrico));
    row('Válvula de Isolamento:', boolText(p.valvula_isolamento));

    // Observações destacadas com fundo verde (se houver)
    if (p.notes && String(p.notes).trim()) {
      const notes = String(p.notes).trim();
      const boxX = 40;
      const boxY = cursorY + 6; // pequeno espaçamento antes do bloco
      const boxW = 520;
      const pad = 8;
      const contentW = boxW - (pad * 2);

      // Medir alturas do cabeçalho e conteúdo
      doc.font('Helvetica-Bold').fontSize(10);
      const headerH = doc.heightOfString('Observações:', { width: contentW });
      doc.font('Helvetica').fontSize(10);
      const notesH = doc.heightOfString(notes, { width: contentW });
      const boxH = headerH + notesH + (pad * 2) + 6; // 6px de gap entre título e texto

      // Fundo verde claro com cantos arredondados
      doc.save();
      doc.roundedRect(boxX, boxY, boxW, boxH, 6).fill('#DCFCE7'); // green-100
      doc.restore();

      // Texto dentro do bloco
      let textY = boxY + pad;
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#065F46').text('Observações:', boxX + pad, textY, { width: contentW, align: 'left' });
      textY += headerH + 6;
      doc.font('Helvetica').fontSize(10).fillColor('#064E3B').text(notes, boxX + pad, textY, { width: contentW, align: 'left' });

      // Espaço após o bloco
      cursorY = boxY + boxH + 12;
    }
  });

  doc.end();
  return bufferPromise;
}

async function enrichItems(items: CartItem[], config: any): Promise<CartItem[]> {
  const enriched: CartItem[] = [];
  try {
    // Usa Supabase para testes
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      
      const pick = (a: any, b: any) => {
        const sa = typeof a === 'string' ? a.trim() : a;
        const sb = typeof b === 'string' ? b?.trim?.() : b;
        if (sa === '' || sa == null) return b;
        return a;
      };
      
      for (const p of items) {
        let details: any = null;
        try {
          if (typeof p.id === 'number') {
            const { data, error } = await supabase
              .from('produtos')
              .select(`id, categoria, part_number, fabricante, tipo_medicao,
                      diametro_montagem, posicao_montagem, conexao_instrumento,
                      material_involucro, material_internos, visor, classe_exatidao,
                      unidade_leitura, faixa_trabalho, glicerina, certificados,
                      tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento`)
              .eq('id', p.id)
              .single();
            if (!error && data) details = data;
          } else {
            const pn = String(p.id || p.title || '').trim();
            const { data, error } = await supabase
              .from('produtos')
              .select(`id, categoria, part_number, fabricante, tipo_medicao,
                      diametro_montagem, posicao_montagem, conexao_instrumento,
                      material_involucro, material_internos, visor, classe_exatidao,
                      unidade_leitura, faixa_trabalho, glicerina, certificados,
                      tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento`)
              .eq('part_number', pn)
              .single();
            if (!error && data) details = data;
          }
        } catch {}
        const merged: CartItem = {
        ...p,
        id: p.id,
        title: pick(p.title, details?.part_number),
        brand: pick(p.brand, details?.fabricante),
        categoria: pick(p.categoria, details?.categoria),
        diametro_montagem: pick(p.diametro_montagem, details?.diametro_montagem),
        posicao_montagem: pick(p.posicao_montagem, details?.posicao_montagem),
        conexao_instrumento: pick(p.conexao_instrumento, details?.conexao_instrumento),
        material_involucro: pick(p.material_involucro, details?.material_involucro),
        material_internos: pick(p.material_internos, details?.material_internos),
        visor: pick(p.visor, details?.visor),
        classe_exatidao: pick(p.classe_exatidao, details?.classe_exatidao),
        unidade_leitura: pick(p.unidade_leitura, details?.unidade_leitura),
        faixa_trabalho: pick(p.faixa_trabalho, details?.faixa_trabalho),
        glicerina: pick(p.glicerina, details?.glicerina),
        certificados: pick(p.certificados, details?.certificados),
        tubo_sifao: pick(p.tubo_sifao, details?.tubo_sifao),
        selo_diafragma: pick(p.selo_diafragma, details?.selo_diafragma),
        contato_eletrico: pick(p.contato_eletrico, details?.contato_eletrico),
        valvula_isolamento: pick(p.valvula_isolamento, details?.valvula_isolamento),
        tipo_medicao: pick(p.tipo_medicao, details?.tipo_medicao),
      };
      enriched.push(merged);
    }
    return enriched;
  }
  
  /*
  // CÓDIGO MYSQL PARA PRODUÇÃO (comentado)
  try {
    const conn = await mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase,
    });
    const pick = (a: any, b: any) => {
      const sa = typeof a === 'string' ? a.trim() : a;
      const sb = typeof b === 'string' ? b?.trim?.() : b;
      if (sa === '' || sa == null) return b;
      return a;
    };
    for (const p of items) {
      let details: any = null;
      try {
        if (typeof p.id === 'number') {
          const [rows]: any = await conn.execute(
            `SELECT id, categoria, part_number, fabricante, tipo_medicao,
                    diametro_montagem, posicao_montagem, conexao_instrumento,
                    material_involucro, material_internos, visor, classe_exatidao,
                    unidade_leitura, faixa_trabalho, glicerina, certificados,
                    tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento
             FROM produtos WHERE id = ? LIMIT 1`,
            [p.id]
          );
          details = Array.isArray(rows) && rows[0] ? rows[0] : null;
        } else {
          const pn = String(p.id || p.title || '').trim();
          const [rows]: any = await conn.execute(
            `SELECT id, categoria, part_number, fabricante, tipo_medicao,
                    diametro_montagem, posicao_montagem, conexao_instrumento,
                    material_involucro, material_internos, visor, classe_exatidao,
                    unidade_leitura, faixa_trabalho, glicerina, certificados,
                    tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento
             FROM produtos WHERE part_number = ? LIMIT 1`,
            [pn]
          );
          details = Array.isArray(rows) && rows[0] ? rows[0] : null;
        }
      } catch {}
      const merged: CartItem = {
        ...p,
        id: p.id,
        title: pick(p.title, details?.part_number),
        brand: pick(p.brand, details?.fabricante),
        categoria: pick(p.categoria, details?.categoria),
        diametro_montagem: pick(p.diametro_montagem, details?.diametro_montagem),
        posicao_montagem: pick(p.posicao_montagem, details?.posicao_montagem),
        conexao_instrumento: pick(p.conexao_instrumento, details?.conexao_instrumento),
        material_involucro: pick(p.material_involucro, details?.material_involucro),
        material_internos: pick(p.material_internos, details?.material_internos),
        visor: pick(p.visor, details?.visor),
        classe_exatidao: pick(p.classe_exatidao, details?.classe_exatidao),
        unidade_leitura: pick(p.unidade_leitura, details?.unidade_leitura),
        faixa_trabalho: pick(p.faixa_trabalho, details?.faixa_trabalho),
        glicerina: pick(p.glicerina, details?.glicerina),
        certificados: pick(p.certificados, details?.certificados),
        tubo_sifao: pick(p.tubo_sifao, details?.tubo_sifao),
        selo_diafragma: pick(p.selo_diafragma, details?.selo_diafragma),
        contato_eletrico: pick(p.contato_eletrico, details?.contato_eletrico),
        valvula_isolamento: pick(p.valvula_isolamento, details?.valvula_isolamento),
        tipo_medicao: pick(p.tipo_medicao, details?.tipo_medicao),
      };
      enriched.push(merged);
    }
    await conn.end();
    return enriched;
  } catch {
    return items;
  }
  */
  } catch {
    return items;
  }
  return enriched;
}