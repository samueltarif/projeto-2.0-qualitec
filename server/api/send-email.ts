import { defineEventHandler, readBody, getHeader, setResponseStatus } from 'h3';
import nodemailer from 'nodemailer';
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

async function generateOrderPdf(args: {
  items: CartItem[];
  company: { cnpj?: string; razao_social?: string; email?: string; filial?: string } | null;
  client: { email?: string; fullName?: string; sector?: string; whatsapp?: string };
  formattedDate: string;
}) {
  const { items, company, client, formattedDate } = args;
  const doc = new PDFDocument({ size: 'A4', margin: 40 });
  const CM = 28.3464567;
  const chunks: Buffer[] = [];
  const bufferPromise = new Promise<Buffer>((resolve) => {
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
  });

  // Logo
  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const logoY = 24;
  const logoBox = { fit: [160, 64] } as const;
  if (fs.existsSync(logoPath)) {
    try { doc.image(logoPath, 40, logoY, logoBox); } catch (_) {}
  }

  // Três colunas 40% / 30% / 30% com gap ≥ 1,5 cm
  const pageWidth = doc.page?.width || 595;
  const marginLeft = 40;
  const marginRight = 40;
  const innerWidth = pageWidth - marginLeft - marginRight;
  const colGap = Math.max(1.5 * CM, 16);
  const availableWidth = innerWidth - (2 * colGap);
  const leftColWidth = Math.floor(0.40 * availableWidth);
  const centerColWidth = Math.floor(0.30 * availableWidth);
  const rightColWidth = availableWidth - leftColWidth - centerColWidth;
  const leftColX = marginLeft;
  const centerColX = leftColX + leftColWidth + colGap;
  const rightColX = centerColX + centerColWidth + colGap;

  // Bloco esquerdo
  const logoToTextSpacing = 8;
  const companyBlockY = logoY + logoBox.fit[1] + logoToTextSpacing;
  let leftY = companyBlockY;
  const leftTitleTopMargin = 12;
  const leftTitleGap = 18;
  const leftLineGap = 16;
  doc.font('Helvetica-Bold').fontSize(12).fillColor('#111827');
  leftY += leftTitleTopMargin;
  const companyTitle = 'Qualitec Com Serv Instr de Medição Ltda';
  const titleOpts = { width: leftColWidth, align: 'left' } as const;
  doc.text(companyTitle, leftColX, leftY, titleOpts);
  const titleHeight = doc.heightOfString(companyTitle, titleOpts);
  leftY += titleHeight + leftTitleGap;
  doc.font('Helvetica').fontSize(10).fillColor('#374151');
  doc.text('CNPJ: 09.117.117/0001-24', leftColX, leftY, { width: leftColWidth, align: 'left' });
  leftY += leftLineGap;
  doc.text('Rua Fazenda Monte Alegre, 367', leftColX, leftY, { width: leftColWidth, align: 'left' });
  leftY += leftLineGap;
  doc.text('05160-060 – São Paulo – SP – Brasil', leftColX, leftY, { width: leftColWidth, align: 'left' });
  const leftBottomY = leftY;

  // Topo das colunas alinhado
  const columnsTopY = companyBlockY;

  // Centro
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

  // Direita
  doc.font('Helvetica-Bold').fontSize(10).fillColor('#111827');
  doc.text('Contato Comercial', rightColX, columnsTopY, { width: rightColWidth, align: 'left' });
  doc.font('Helvetica').fontSize(10).fillColor('#111827');
  const qualitecContato = { nome: 'Marco A. Casmalla', fone: '+55 11 99918-4979', email: 'marco@qualitec.ind.br' };
  let contactY = columnsTopY + 16;
  [qualitecContato.nome, qualitecContato.fone, qualitecContato.email].forEach((line) => {
    doc.text(line, rightColX, contactY, { width: rightColWidth, align: 'left' });
    contactY += 14;
  });

  // Data/hora abaixo do cabeçalho com deslocamento adicional de 2 cm
  const headerBottomY = Math.max(leftBottomY, centerY, contactY);
  doc.font('Helvetica').fontSize(10).fillColor('#111827');
  const afterHeaderExtra = 2 * CM;
  const dateY = headerBottomY + 6 + afterHeaderExtra;
  doc.text(`Data: ${formattedDate}`, 40, dateY);

  // Produtos — adicionar uma linha em branco entre data/hora e o produto
  const lineGap = 16;
  let cursorY = dateY + lineGap;
  const titleColor = '#1d4ed8';
  const sectionColor = '#111827';
  const labelColor = '#374151';

  items.forEach((p, idx) => {
    if (idx > 0) {
      const blockSpacing = 3 * CM;
      const estimatedNextBlockHeight = 180;
      const remainingPageSpace = (doc.page?.height || 842) - cursorY - 40;
      if (remainingPageSpace < (blockSpacing + estimatedNextBlockHeight)) {
        doc.addPage();
        cursorY = 40;
      } else {
        cursorY += blockSpacing;
      }
    }

    // Título: usar nome da categoria em destaque
    doc.fillColor(titleColor).font('Helvetica-Bold').fontSize(18);
    doc.text(String(p.categoria || p.title || 'Produto'), 40, cursorY);
    cursorY += 24;

    // Removido: linha "Categoria" para evitar duplicidade com título

    // Subtítulo: Especificações detalhadas
    doc.fillColor(sectionColor).font('Helvetica-Bold').fontSize(12);
    doc.text('Especificações detalhadas:', 40, cursorY);
    cursorY += 18;
    // Tabela em linha única "Label: valor" com pequeno espaçamento
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
    const rows: Array<[string, string]> = [
      ['Quantidade:', String(p.quantity ?? 1)],
      ['Part Number:', String(p.id ?? '')],
      ['Fabricante:', String(p.brand ?? 'QUALITEC')],
      ['Faixa de Pressão:', String(p.faixa_trabalho ?? '—')],
      ['Diâmetro:', String(p.diametro_montagem ?? '—')],
      ['Conexão:', String(p.conexao_instrumento ?? '—')],
      ['Tipo de Medição:', String(p.tipo_medicao ?? '—')],
      ['Posição de Montagem:', String(p.posicao_montagem ?? '—')],
      ['Material do Invólucro:', String(p.material_involucro ?? '—')],
      ['Materiais dos Internos:', String(p.material_internos ?? '—')],
      ['Visor:', String(p.visor ?? '—')],
      ['Classe de Exatidão:', String(p.classe_exatidao ?? '—')],
      ['Unidade de Leitura:', String(p.unidade_leitura ?? '—')],
      ['Enchimento de Glicerina:', boolText(p.glicerina)],
      ['Certificados:', certText(p.certificados)],
      ['Tubo Sifão:', boolText(p.tubo_sifao)],
      ['Selo Diafragma:', boolText(p.selo_diafragma)],
      ['Contato Elétrico:', boolText(p.contato_eletrico)],
      ['Válvula de Isolamento:', boolText(p.valvula_isolamento)],
    ];
    const startY = cursorY;
    rows.forEach(([label, val]) => {
      const lab = label.endsWith(':') ? label : `${label}:`;
      doc.font('Helvetica-Bold').fontSize(10).fillColor(labelColor);
      doc.text(lab, 40, cursorY);
      const labelW = doc.widthOfString(lab);
      const gap = 6;
      doc.font('Helvetica').fontSize(10).fillColor('#111827');
      doc.text(val, 40 + labelW + gap, cursorY);
      cursorY += 16;
    });
    // Observações destacadas com fundo verde (se houver)
    if (p.notes && String(p.notes).trim()) {
      const notes = String(p.notes).trim();
      const boxX = 40;
      const boxY = cursorY + 6;
      const boxW = 520;
      const pad = 8;
      const contentW = boxW - (pad * 2);

      doc.font('Helvetica-Bold').fontSize(10);
      const headerH = doc.heightOfString('Observações:', { width: contentW });
      doc.font('Helvetica').fontSize(10);
      const notesH = doc.heightOfString(notes, { width: contentW });
      const boxH = headerH + notesH + (pad * 2) + 6;

      doc.save();
      doc.roundedRect(boxX, boxY, boxW, boxH, 6).fill('#DCFCE7');
      doc.restore();

      let textY = boxY + pad;
      doc.font('Helvetica-Bold').fontSize(10).fillColor('#065F46').text('Observações:', boxX + pad, textY, { width: contentW, align: 'left' });
      textY += headerH + 6;
      doc.font('Helvetica').fontSize(10).fillColor('#064E3B').text(notes, boxX + pad, textY, { width: contentW, align: 'left' });

      cursorY = boxY + boxH + 12;
    }

    // Altura mínima do bloco (ajustado para o novo layout)
    cursorY = Math.max(cursorY, startY + 200);
  });

  doc.end();
  return bufferPromise;
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config as any)?.adminKey || '');
  const headerKey = String(getHeader(event, 'x-admin-key') || '');
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { success: false, message: 'forbidden' };
  }

  const body = await readBody<{
    subject?: string;
    message?: string;
    to?: string; // pode ser lista separada por vírgula
    order?: { items: CartItem[]; user: { email?: string; fullName?: string; sector?: string; whatsapp?: string }; empresaId?: number | null };
  }>(event);

  const subject = String(body?.subject || 'Pedido Qualitec').trim();
  const message = String(body?.message || 'Segue o pedido Qualitec em anexo.').trim();
  const to = String(body?.to || 'vendas2@qualitec.ind.br').trim();

  if (!subject || !message) {
    return { success: false, message: 'Informe título e corpo do email.' };
  }
  if (!config.emailUser || !config.emailPass) {
    return { success: false, message: 'Configuração de email não encontrada.' };
  }

  // Se houver payload de pedido, gerar PDF em memória e anexar
  let attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];
  try {
    if (body?.order && Array.isArray(body.order.items) && body.order.items.length > 0) {
      // Buscar dados da empresa do cliente pelo empresaId
      let company: { cnpj?: string; razao_social?: string; email?: string; filial?: string } | null = null;
      if (typeof body.order.empresaId === 'number' && Number.isFinite(body.order.empresaId)) {
        try {
          // Usa Supabase para testes
          if (config.supabaseUrl && config.supabaseKey) {
            const supabase = createClient(config.supabaseUrl, config.supabaseKey);
            const { data, error } = await supabase
              .from('empresas')
              .select('cnpj, razao_social, email, filial')
              .eq('id', body.order.empresaId)
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
            [body.order.empresaId]
          );
          if (Array.isArray(rows) && rows.length > 0) company = rows[0];
          await connection.end();
          */
        } catch (_) {}
      }

      const now = new Date();
      const formatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
      const formattedDate = formatter.format(now);
      const enriched = await enrichItems(body.order.items, config);
      const pdfBuffer = await generateOrderPdf({ items: enriched, company, client: body.order.user || {}, formattedDate });
      const safeTs = now.toISOString().replace(/[:T]/g, '-').slice(0, 16);
      attachments.push({ filename: `pedido_qualitec_${safeTs}.pdf`, content: pdfBuffer, contentType: 'application/pdf' });
    }
  } catch (err) {
    // Continua sem anexos caso falhe
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: config.emailUser, pass: config.emailPass },
    });

    const signatureHtml: string = String((config as any)?.emailSignatureHtml || '').trim();
    const html = signatureHtml
      ? `<div>${message.replace(/\n/g, '<br/>')}</div><div style="margin-top:12px">${signatureHtml}</div>`
      : `<div>${message.replace(/\n/g, '<br/>')}</div>`;

    const info = await transporter.sendMail({
      from: `Qualitec <${config.emailUser}>`,
      to,
      subject,
      text: message,
      html,
      attachments,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    return { success: false, message: error?.message || 'Falha ao enviar email.' };
  }
});

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
    */
  } catch {
    return items;
  }
  return enriched;
}