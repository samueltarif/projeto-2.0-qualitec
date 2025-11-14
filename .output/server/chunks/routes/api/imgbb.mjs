import { c as defineEventHandler, g as getQuery, f as sendRedirect, e as setHeader } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const imgbb = defineEventHandler(async (event) => {
  const q = getQuery(event);
  const pageUrl = typeof q.u === "string" ? q.u : "";
  if (!pageUrl || !pageUrl.startsWith("https://ibb.co/")) {
    return sendRedirect(event, "/images/manometro.png", 302);
  }
  try {
    const html = await $fetch(pageUrl, { method: "GET" });
    const ogMatch = html.match(/property=["']og:image["']\s+content=["'](https:\/\/i\.ibb\.co\/[^"']+)["']/i);
    const urlMatch = html.match(/https:\/\/i\.ibb\.co\/[^"']+/i);
    const directUrl = ogMatch && ogMatch[1] || urlMatch && urlMatch[0];
    if (!directUrl) {
      return sendRedirect(event, "/images/manometro.png", 302);
    }
    const imgRes = await fetch(directUrl);
    const contentType = imgRes.headers.get("content-type") || "image/jpeg";
    const arrayBuf = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    setHeader(event, "Content-Type", contentType);
    setHeader(event, "Cache-Control", "public, max-age=86400");
    return buffer;
  } catch (err) {
    return sendRedirect(event, "/images/manometro.png", 302);
  }
});

export { imgbb as default };
//# sourceMappingURL=imgbb.mjs.map
