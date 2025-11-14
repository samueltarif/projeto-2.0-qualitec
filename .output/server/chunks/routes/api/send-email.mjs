import { c as defineEventHandler, u as useRuntimeConfig, h as getHeader, i as setResponseStatus, r as readBody } from '../../_/nitro.mjs';
import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:crypto';
import 'node:url';

async function generateOrderPdf(args) {
  var _a;
  const { items, company, client, formattedDate } = args;
  const doc = new PDFDocument({ size: "A4", margin: 40 });
  const CM = 28.3464567;
  const chunks = [];
  const bufferPromise = new Promise((resolve) => {
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
  const logoPath = path.join(process.cwd(), "public", "images", "logo.png");
  const logoY = 24;
  const logoBox = { fit: [160, 64] };
  if (fs.existsSync(logoPath)) {
    try {
      doc.image(logoPath, 40, logoY, logoBox);
    } catch (_) {
    }
  }
  const pageWidth = ((_a = doc.page) == null ? void 0 : _a.width) || 595;
  const marginLeft = 40;
  const marginRight = 40;
  const innerWidth = pageWidth - marginLeft - marginRight;
  const colGap = Math.max(1.5 * CM, 16);
  const availableWidth = innerWidth - 2 * colGap;
  const leftColWidth = Math.floor(0.4 * availableWidth);
  const centerColWidth = Math.floor(0.3 * availableWidth);
  const rightColWidth = availableWidth - leftColWidth - centerColWidth;
  const leftColX = marginLeft;
  const centerColX = leftColX + leftColWidth + colGap;
  const rightColX = centerColX + centerColWidth + colGap;
  const logoToTextSpacing = 8;
  const companyBlockY = logoY + logoBox.fit[1] + logoToTextSpacing;
  let leftY = companyBlockY;
  const leftTitleTopMargin = 12;
  const leftTitleGap = 18;
  const leftLineGap = 16;
  doc.font("Helvetica-Bold").fontSize(12).fillColor("#111827");
  leftY += leftTitleTopMargin;
  const companyTitle = "Qualitec Com Serv Instr de Medi\xE7\xE3o Ltda";
  const titleOpts = { width: leftColWidth, align: "left" };
  doc.text(companyTitle, leftColX, leftY, titleOpts);
  const titleHeight = doc.heightOfString(companyTitle, titleOpts);
  leftY += titleHeight + leftTitleGap;
  doc.font("Helvetica").fontSize(10).fillColor("#374151");
  doc.text("CNPJ: 09.117.117/0001-24", leftColX, leftY, { width: leftColWidth, align: "left" });
  leftY += leftLineGap;
  doc.text("Rua Fazenda Monte Alegre, 367", leftColX, leftY, { width: leftColWidth, align: "left" });
  leftY += leftLineGap;
  doc.text("05160-060 \u2013 S\xE3o Paulo \u2013 SP \u2013 Brasil", leftColX, leftY, { width: leftColWidth, align: "left" });
  const leftBottomY = leftY;
  const columnsTopY = companyBlockY;
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#111827");
  doc.text("DADOS DO CLIENTE", centerColX, columnsTopY, { width: centerColWidth, align: "left" });
  doc.font("Helvetica").fontSize(10).fillColor("#374151");
  const cnpjTxt = (company == null ? void 0 : company.cnpj) ? `CNPJ: ${company.cnpj}` : "CNPJ: \u2014";
  const empresaTxt = (company == null ? void 0 : company.razao_social) ? `Empresa: ${company.razao_social}` : "Empresa: \u2014";
  const filialTxt = (company == null ? void 0 : company.filial) ? `Filial: ${company.filial}` : "Filial: \u2014";
  const emailTxt = (client == null ? void 0 : client.email) ? `Email: ${client.email.toLowerCase()}` : `Email: ${(company == null ? void 0 : company.email) || "\u2014"}`;
  let centerY = columnsTopY + 16;
  [cnpjTxt, empresaTxt, filialTxt, emailTxt].forEach((line) => {
    doc.text(line, centerColX, centerY, { width: centerColWidth, align: "left" });
    centerY += 14;
  });
  doc.font("Helvetica-Bold").fontSize(10).fillColor("#111827");
  doc.text("Contato Comercial", rightColX, columnsTopY, { width: rightColWidth, align: "left" });
  doc.font("Helvetica").fontSize(10).fillColor("#111827");
  const qualitecContato = { nome: "Marco A. Casmalla", fone: "+55 11 99918-4979", email: "marco@qualitec.ind.br" };
  let contactY = columnsTopY + 16;
  [qualitecContato.nome, qualitecContato.fone, qualitecContato.email].forEach((line) => {
    doc.text(line, rightColX, contactY, { width: rightColWidth, align: "left" });
    contactY += 14;
  });
  const headerBottomY = Math.max(leftBottomY, centerY, contactY);
  doc.font("Helvetica").fontSize(10).fillColor("#111827");
  const afterHeaderExtra = 2 * CM;
  const dateY = headerBottomY + 6 + afterHeaderExtra;
  doc.text(`Data: ${formattedDate}`, 40, dateY);
  const lineGap = 16;
  let cursorY = dateY + lineGap;
  const titleColor = "#1d4ed8";
  const sectionColor = "#111827";
  const labelColor = "#374151";
  items.forEach((p, idx) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
    if (idx > 0) {
      const blockSpacing = 3 * CM;
      const estimatedNextBlockHeight = 180;
      const remainingPageSpace = (((_a2 = doc.page) == null ? void 0 : _a2.height) || 842) - cursorY - 40;
      if (remainingPageSpace < blockSpacing + estimatedNextBlockHeight) {
        doc.addPage();
        cursorY = 40;
      } else {
        cursorY += blockSpacing;
      }
    }
    doc.fillColor(titleColor).font("Helvetica-Bold").fontSize(18);
    doc.text(String(p.categoria || p.title || "Produto"), 40, cursorY);
    cursorY += 24;
    doc.fillColor(sectionColor).font("Helvetica-Bold").fontSize(12);
    doc.text("Especifica\xE7\xF5es detalhadas:", 40, cursorY);
    cursorY += 18;
    const boolText = (v) => {
      const s = String(v != null ? v : "").trim().toLowerCase();
      if (v === 1 || s === "1" || v === true || s === "sim") return "Sim";
      if (v === 0 || s === "0" || v === false || s === "nao" || s === "n\xE3o") return "N\xE3o";
      return s ? String(v) : "\u2014";
    };
    const certText = (v) => {
      if (Array.isArray(v)) return v.filter(Boolean).join(", ");
      try {
        const arr = JSON.parse(String(v != null ? v : ""));
        if (Array.isArray(arr)) return arr.join(", ");
      } catch {
      }
      const s = String(v != null ? v : "").trim();
      return s || "\u2014";
    };
    const rows = [
      ["Quantidade:", String((_b = p.quantity) != null ? _b : 1)],
      ["Part Number:", String((_c = p.id) != null ? _c : "")],
      ["Fabricante:", String((_d = p.brand) != null ? _d : "QUALITEC")],
      ["Faixa de Press\xE3o:", String((_e = p.faixa_trabalho) != null ? _e : "\u2014")],
      ["Di\xE2metro:", String((_f = p.diametro_montagem) != null ? _f : "\u2014")],
      ["Conex\xE3o:", String((_g = p.conexao_instrumento) != null ? _g : "\u2014")],
      ["Tipo de Medi\xE7\xE3o:", String((_h = p.tipo_medicao) != null ? _h : "\u2014")],
      ["Posi\xE7\xE3o de Montagem:", String((_i = p.posicao_montagem) != null ? _i : "\u2014")],
      ["Material do Inv\xF3lucro:", String((_j = p.material_involucro) != null ? _j : "\u2014")],
      ["Materiais dos Internos:", String((_k = p.material_internos) != null ? _k : "\u2014")],
      ["Visor:", String((_l = p.visor) != null ? _l : "\u2014")],
      ["Classe de Exatid\xE3o:", String((_m = p.classe_exatidao) != null ? _m : "\u2014")],
      ["Unidade de Leitura:", String((_n = p.unidade_leitura) != null ? _n : "\u2014")],
      ["Enchimento de Glicerina:", boolText(p.glicerina)],
      ["Certificados:", certText(p.certificados)],
      ["Tubo Sif\xE3o:", boolText(p.tubo_sifao)],
      ["Selo Diafragma:", boolText(p.selo_diafragma)],
      ["Contato El\xE9trico:", boolText(p.contato_eletrico)],
      ["V\xE1lvula de Isolamento:", boolText(p.valvula_isolamento)]
    ];
    const startY = cursorY;
    rows.forEach(([label, val]) => {
      const lab = label.endsWith(":") ? label : `${label}:`;
      doc.font("Helvetica-Bold").fontSize(10).fillColor(labelColor);
      doc.text(lab, 40, cursorY);
      const labelW = doc.widthOfString(lab);
      const gap = 6;
      doc.font("Helvetica").fontSize(10).fillColor("#111827");
      doc.text(val, 40 + labelW + gap, cursorY);
      cursorY += 16;
    });
    if (p.notes && String(p.notes).trim()) {
      const notes = String(p.notes).trim();
      const boxX = 40;
      const boxY = cursorY + 6;
      const boxW = 520;
      const pad = 8;
      const contentW = boxW - pad * 2;
      doc.font("Helvetica-Bold").fontSize(10);
      const headerH = doc.heightOfString("Observa\xE7\xF5es:", { width: contentW });
      doc.font("Helvetica").fontSize(10);
      const notesH = doc.heightOfString(notes, { width: contentW });
      const boxH = headerH + notesH + pad * 2 + 6;
      doc.save();
      doc.roundedRect(boxX, boxY, boxW, boxH, 6).fill("#DCFCE7");
      doc.restore();
      let textY = boxY + pad;
      doc.font("Helvetica-Bold").fontSize(10).fillColor("#065F46").text("Observa\xE7\xF5es:", boxX + pad, textY, { width: contentW, align: "left" });
      textY += headerH + 6;
      doc.font("Helvetica").fontSize(10).fillColor("#064E3B").text(notes, boxX + pad, textY, { width: contentW, align: "left" });
      cursorY = boxY + boxH + 12;
    }
    cursorY = Math.max(cursorY, startY + 200);
  });
  doc.end();
  return bufferPromise;
}
const sendEmail = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { success: false, message: "forbidden" };
  }
  const body = await readBody(event);
  const subject = String((body == null ? void 0 : body.subject) || "Pedido Qualitec").trim();
  const message = String((body == null ? void 0 : body.message) || "Segue o pedido Qualitec em anexo.").trim();
  const to = String((body == null ? void 0 : body.to) || "vendas2@qualitec.ind.br").trim();
  if (!subject || !message) {
    return { success: false, message: "Informe t\xEDtulo e corpo do email." };
  }
  if (!config.emailUser || !config.emailPass) {
    return { success: false, message: "Configura\xE7\xE3o de email n\xE3o encontrada." };
  }
  let attachments = [];
  try {
    if ((body == null ? void 0 : body.order) && Array.isArray(body.order.items) && body.order.items.length > 0) {
      let company = null;
      if (typeof body.order.empresaId === "number" && Number.isFinite(body.order.empresaId)) {
        try {
          if (config.supabaseUrl && config.supabaseKey) {
            const supabase = createClient(config.supabaseUrl, config.supabaseKey);
            const { data, error } = await supabase.from("empresas").select("cnpj, razao_social, email, filial").eq("id", body.order.empresaId).single();
            if (!error && data) company = data;
          }
        } catch (_) {
        }
      }
      const now = /* @__PURE__ */ new Date();
      const formatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });
      const formattedDate = formatter.format(now);
      const enriched = await enrichItems(body.order.items, config);
      const pdfBuffer = await generateOrderPdf({ items: enriched, company, client: body.order.user || {}, formattedDate });
      const safeTs = now.toISOString().replace(/[:T]/g, "-").slice(0, 16);
      attachments.push({ filename: `pedido_qualitec_${safeTs}.pdf`, content: pdfBuffer, contentType: "application/pdf" });
    }
  } catch (err) {
  }
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: config.emailUser, pass: config.emailPass }
    });
    const signatureHtml = String((config == null ? void 0 : config.emailSignatureHtml) || "").trim();
    const html = signatureHtml ? `<div>${message.replace(/\n/g, "<br/>")}</div><div style="margin-top:12px">${signatureHtml}</div>` : `<div>${message.replace(/\n/g, "<br/>")}</div>`;
    const info = await transporter.sendMail({
      from: `Qualitec <${config.emailUser}>`,
      to,
      subject,
      text: message,
      html,
      attachments
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Falha ao enviar email." };
  }
});
async function enrichItems(items, config) {
  const enriched = [];
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const pick = (a, b) => {
        var _a;
        const sa = typeof a === "string" ? a.trim() : a;
        const sb = typeof b === "string" ? (_a = b == null ? void 0 : b.trim) == null ? void 0 : _a.call(b) : b;
        if (sa === "" || sa == null) return b;
        return a;
      };
      for (const p of items) {
        let details = null;
        try {
          if (typeof p.id === "number") {
            const { data, error } = await supabase.from("produtos").select(`id, categoria, part_number, fabricante, tipo_medicao,
                      diametro_montagem, posicao_montagem, conexao_instrumento,
                      material_involucro, material_internos, visor, classe_exatidao,
                      unidade_leitura, faixa_trabalho, glicerina, certificados,
                      tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento`).eq("id", p.id).single();
            if (!error && data) details = data;
          } else {
            const pn = String(p.id || p.title || "").trim();
            const { data, error } = await supabase.from("produtos").select(`id, categoria, part_number, fabricante, tipo_medicao,
                      diametro_montagem, posicao_montagem, conexao_instrumento,
                      material_involucro, material_internos, visor, classe_exatidao,
                      unidade_leitura, faixa_trabalho, glicerina, certificados,
                      tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento`).eq("part_number", pn).single();
            if (!error && data) details = data;
          }
        } catch {
        }
        const merged = {
          ...p,
          id: p.id,
          title: pick(p.title, details == null ? void 0 : details.part_number),
          brand: pick(p.brand, details == null ? void 0 : details.fabricante),
          categoria: pick(p.categoria, details == null ? void 0 : details.categoria),
          diametro_montagem: pick(p.diametro_montagem, details == null ? void 0 : details.diametro_montagem),
          posicao_montagem: pick(p.posicao_montagem, details == null ? void 0 : details.posicao_montagem),
          conexao_instrumento: pick(p.conexao_instrumento, details == null ? void 0 : details.conexao_instrumento),
          material_involucro: pick(p.material_involucro, details == null ? void 0 : details.material_involucro),
          material_internos: pick(p.material_internos, details == null ? void 0 : details.material_internos),
          visor: pick(p.visor, details == null ? void 0 : details.visor),
          classe_exatidao: pick(p.classe_exatidao, details == null ? void 0 : details.classe_exatidao),
          unidade_leitura: pick(p.unidade_leitura, details == null ? void 0 : details.unidade_leitura),
          faixa_trabalho: pick(p.faixa_trabalho, details == null ? void 0 : details.faixa_trabalho),
          glicerina: pick(p.glicerina, details == null ? void 0 : details.glicerina),
          certificados: pick(p.certificados, details == null ? void 0 : details.certificados),
          tubo_sifao: pick(p.tubo_sifao, details == null ? void 0 : details.tubo_sifao),
          selo_diafragma: pick(p.selo_diafragma, details == null ? void 0 : details.selo_diafragma),
          contato_eletrico: pick(p.contato_eletrico, details == null ? void 0 : details.contato_eletrico),
          valvula_isolamento: pick(p.valvula_isolamento, details == null ? void 0 : details.valvula_isolamento),
          tipo_medicao: pick(p.tipo_medicao, details == null ? void 0 : details.tipo_medicao)
        };
        enriched.push(merged);
      }
      return enriched;
    }
  } catch {
    return items;
  }
  return enriched;
}

export { sendEmail as default };
//# sourceMappingURL=send-email.mjs.map
