import { getQuery, setHeader, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  const q = getQuery(event);
  const pageUrl = typeof q.u === 'string' ? q.u : '';

  if (!pageUrl || !pageUrl.startsWith('https://ibb.co/')) {
    return sendRedirect(event, '/images/manometro.png', 302);
  }

  try {
    // Busca o HTML da página do ImgBB
    const html = await $fetch<string>(pageUrl, { method: 'GET' });

    // Tenta extrair link direto da imagem via meta og:image
    const ogMatch = html.match(/property=["']og:image["']\s+content=["'](https:\/\/i\.ibb\.co\/[^"']+)["']/i);
    const urlMatch = html.match(/https:\/\/i\.ibb\.co\/[^"']+/i);
    const directUrl = (ogMatch && ogMatch[1]) || (urlMatch && urlMatch[0]);

    if (!directUrl) {
      return sendRedirect(event, '/images/manometro.png', 302);
    }

    // Busca a imagem direta e retorna com MIME correto
    const imgRes = await fetch(directUrl);
    const contentType = imgRes.headers.get('content-type') || 'image/jpeg';
    const arrayBuf = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);

    setHeader(event, 'Content-Type', contentType);
    setHeader(event, 'Cache-Control', 'public, max-age=86400');
    return buffer;
  } catch (err) {
    return sendRedirect(event, '/images/manometro.png', 302);
  }
});