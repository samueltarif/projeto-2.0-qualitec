import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { Server } from 'node:http';
import path, { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, removeResponseHeader, createError, getQuery as getQuery$1, readBody, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getResponseStatus, getRouterParam, setHeader, getHeader, getResponseStatusText } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/h3/dist/index.mjs';
import { escapeHtml } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/@vue/shared/dist/shared.cjs.js';
import JSZip from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/jszip/lib/index.js';
import PDFDocument from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/pdfkit/js/pdfkit.js';
import fs, { promises } from 'node:fs';
import { createClient } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/@supabase/supabase-js/dist/main/index.js';
import mysql, { createConnection } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/mysql2/promise.js';
import { createFetch, Headers as Headers$1, $fetch as $fetch$1 } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/ofetch/dist/node.mjs';
import nodemailer from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/nodemailer/lib/nodemailer.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withTrailingSlash, decodePath, withLeadingSlash, withoutTrailingSlash, joinRelativeURL } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/destr/dist/index.mjs';
import { renderToString } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/vue/server-renderer/index.mjs';
import { klona } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/scule/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/unhead/dist/server.mjs';
import { stringify, uneval } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/devalue/index.js';
import { isVNode, toValue, isRef } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/vue/index.mjs';
import { createHooks } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/hookable/dist/index.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/ohash/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/youch-core/build/index.js';
import { Youch } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/source-map/source-map.js';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/unctx/dist/index.mjs';
import { captureRawStackTrace, parseRawStackTrace } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/errx/dist/index.js';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/pathe/dist/index.mjs';
import { walkResolver } from 'file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master","watchOptions":{"ignored":[null]}}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/server","watchOptions":{"ignored":[null]}}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/.nuxt"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/.nuxt/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  theme: {
    colors: {
      // Cor primária (ações principais, botões, destaques)
      primary: {
        base: "#3B82F6",
        // blue-500
        hover: "#2563EB",
        // blue-600
        ring: "#93C5FD",
        // blue-300
        foreground: "#FFFFFF"
        // texto sobre primária
      },
      // Secundária baseada em neutral (tons cinza)
      secondary: {
        base: "#6B7280",
        // neutral-500
        hover: "#4B5563",
        // neutral-600
        ring: "#D1D5DB",
        // neutral-300
        foreground: "#FFFFFF"
      },
      // Paleta neutral completa para superfícies e texto
      neutral: {
        50: "#FAFAFA",
        100: "#F5F5F5",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827"
      }
    }
  }
});

const inlineAppConfig = {
  "nuxt": {}
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "salesEmail": "vendas2@qualitec.ind.br",
    "supabase": {
      "url": "https://dslwoamybhbjbqyxwruc.supabase.co",
      "key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbHdvYW15YmhiamJxeXh3cnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNTk2MDQsImV4cCI6MjA3NzgzNTYwNH0.RVfogmDbNdSr4uVZEO4duMKA52UAFlGf7RTXL7CopNA",
      "redirect": false,
      "redirectOptions": {
        "login": "/login",
        "callback": "/confirm",
        "exclude": [],
        "cookieRedirect": false,
        "saveRedirectToCookie": false
      },
      "cookieName": "sb",
      "cookiePrefix": "sb-dslwoamybhbjbqyxwruc-auth-token",
      "useSsrCookies": true,
      "cookieOptions": {
        "maxAge": 28800,
        "sameSite": "lax",
        "secure": true
      },
      "clientOptions": {}
    }
  },
  "dbHost": "",
  "dbUser": "",
  "dbPassword": "",
  "dbDatabase": "",
  "supabaseUrl": "https://dslwoamybhbjbqyxwruc.supabase.co",
  "supabaseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbHdvYW15YmhiamJxeXh3cnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNTk2MDQsImV4cCI6MjA3NzgzNTYwNH0.RVfogmDbNdSr4uVZEO4duMKA52UAFlGf7RTXL7CopNA",
  "supabaseSecretKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbHdvYW15YmhiamJxeXh3cnVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI1OTYwNCwiZXhwIjoyMDc3ODM1NjA0fQ.mJyIdOTgWwlGu6U4xs2VPrh9HjzWD6zIDIanYmV0sQg",
  "adminKey": "qualitec-admin-2024",
  "enableAdminEndpoints": "true",
  "allowCompanyEmailLogin": "false",
  "emailUser": "vendas2@qualitec.ind.br",
  "emailPass": "your-app-password-here",
  "geminiApiKey": "",
  "filterSynonyms": {
    "faixa_trabalho": [
      "faixa de pressão",
      "pressão de trabalho",
      "range de pressão",
      "faixa de medição",
      "escala de pressão",
      "intervalo de pressão",
      "pressão nominal",
      "pressão mínima e máxima",
      "pressão suportada",
      "pressão operacional",
      "pressão do instrumento"
    ],
    "diametro_montagem": [
      "diâmetro",
      "tamanho do manômetro",
      "tamanho do visor",
      "bitola",
      "diâmetro do mostrador",
      "diâmetro externo",
      "dimensão frontal",
      "tamanho da carcaça",
      "medida da face",
      "100 mm",
      "2½\"",
      "2 1/2\"",
      "63 mm",
      "41 mm",
      "160 mm"
    ],
    "conexao_instrumento": [
      "conexão",
      "rosca",
      "tipo de rosca",
      "entrada",
      "conexão inferior",
      "conexão traseira",
      "bocal",
      "tipo de engate",
      "tamanho da rosca",
      "rosca macho",
      "rosca fêmea",
      "conexão de processo",
      "tipo de encaixe",
      "porta de entrada",
      "adaptador",
      "1/8\" NPT",
      "1/4\" NPT",
      "3/8\" NPT",
      "1/2\" NPT",
      "1/4\" BSP",
      "1/2\" BSP"
    ],
    "classe_exatidao": [
      "classe de exatidão",
      "classe de precisão",
      "erro máximo",
      "margem de erro",
      "tolerância",
      "erro percentual",
      "exatidão da medição",
      "classe"
    ],
    "tipo_medicao": [
      "tipo de pressão",
      "medição relativa",
      "medição absoluta",
      "pressão manométrica",
      "pressão atmosférica",
      "pressão diferencial",
      "sensor de pressão diferencial",
      "pressão gauge",
      "vacuum",
      "tipo de medição"
    ],
    "posicao_montagem": [
      "montagem inferior",
      "montagem traseira",
      "tipo de montagem",
      "posição de instalação",
      "instalação vertical",
      "instalação horizontal",
      "montagem direta",
      "montagem painel",
      "montagem flangeada",
      "posição do bocal",
      "montagem em painel",
      "trilho",
      "fixação",
      "inferior",
      "reto",
      "embaixo",
      "vertical",
      "conexao inferior",
      "saída inferior",
      "saida inferior",
      "padrao inferior",
      "rosca para baixo",
      "monta direto na linha",
      "traseiro",
      "montagem traseira",
      "atras",
      "atrás",
      "saida posterior",
      "saída posterior",
      "conexao traseira",
      "conexao atras",
      "conexão traseira",
      "conexão atrás",
      "conexao traseira central",
      "conexão traseira central",
      "atras no meio",
      "atrás no meio",
      "central atras",
      "central atrás",
      "painel traseiro",
      "montagem em painel traseiro",
      "parede traseiro",
      "concentrico",
      "concêntrico",
      "excentrico",
      "excêntrico",
      "deslocado",
      "descentralizado",
      "fora do centro",
      "lateral",
      "para o lado",
      "traseiro lateral",
      "conexao atras lateral",
      "conexão atrás lateral",
      "saida traseira lateral",
      "saída traseira lateral"
    ],
    "visor": [
      "mostrador",
      "display",
      "janela",
      "vidro frontal",
      "lente",
      "indicador visual",
      "tela",
      "visor analógico",
      "visor digital",
      "visor"
    ],
    "material_internos": [
      "materiais internos",
      "componentes internos",
      "partes internas",
      "liga metálica interna",
      "tubo bourdon de latão",
      "tubo bourdon de aço inox",
      "mecanismo interno",
      "construção interna",
      "material dos internos"
    ],
    "unidade_leitura": [
      "unidade de medida",
      "unidade da escala",
      "medida da pressão",
      "unidade exibida",
      "leitura em bar",
      "leitura em psi",
      "leitura em Pa",
      "leitura em kPa",
      "leitura em kgf/cm²",
      "BAR",
      "PSI",
      "KPA",
      "KGF/CM²"
    ],
    "glicerina": [
      "com glicerina",
      "sem glicerina",
      "manômetro preenchido",
      "com líquido amortecedor",
      "enchimento líquido",
      "fluido de amortecimento",
      "modelo seco",
      "modelo cheio",
      "glicerinado",
      "seco"
    ],
    "tubo_sifao": [
      "sifão",
      "tubo de sifão",
      "tubo em U",
      "tubo espiral",
      "protetor de vapor",
      "tubo de condensação",
      "serpentina"
    ],
    "contato_eletrico": [
      "contato elétrico",
      "alarme elétrico",
      "manômetro com alarme",
      "com contato",
      "saída elétrica",
      "sinal elétrico",
      "relé de pressão",
      "microchave"
    ],
    "selo_diafragma": [
      "selo sanitário",
      "selo de diafragma",
      "diafragma isolante",
      "selo químico",
      "isolador de processo",
      "selo flangeado",
      "selo remoto"
    ],
    "valvula_isolamento": [
      "válvula bloqueio",
      "válvula de corte",
      "válvula de esfera",
      "válvula de agulha",
      "válvula de instrumento",
      "válvula de processo",
      "isolador"
    ],
    "certificados": [
      "certificado de calibração",
      "certificado de origem",
      "certificado de conformidade",
      "laudo",
      "documentação técnica",
      "certificado ISO",
      "teste de fábrica",
      "certificado de teste"
    ],
    "fabricante": [
      "marca",
      "fabricante"
    ],
    "part_number": [
      "PN",
      "part number",
      "código",
      "sku"
    ]
  },
  "supabase": {
    "serviceKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzbHdvYW15YmhiamJxeXh3cnVjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjI1OTYwNCwiZXhwIjoyMDc3ODM1NjA0fQ.mJyIdOTgWwlGu6U4xs2VPrh9HjzWD6zIDIanYmV0sQg",
    "secretKey": ""
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return errorDev; }) ;
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _NQOKmA0oEhwUYujESbof093HYouazKcBMRAlQC4V9A = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const rootDir = "C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master";

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _AA1oc6qxritlD5oJH7dwcteBTXbfa6VrnmlaRBZ6kY = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _NQOKmA0oEhwUYujESbof093HYouazKcBMRAlQC4V9A,
_AA1oc6qxritlD5oJH7dwcteBTXbfa6VrnmlaRBZ6kY
];

const assets = {};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _ruqmr5 = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: event.context.nuxt?.noSSR || (false),
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => import('file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/.nuxt//dist/server/server.mjs').then((r) => r.default || r);
const getClientManifest = () => import('file://C:/Users/Vendas2/Desktop/template-nuxt-supabase-tailwind-master/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  if (!manifest) {
    throw new Error("client.manifest is not available");
  }
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const options = {
    manifest,
    renderToString: renderToString$1,
    buildAssetsURL
  };
  const renderer = createRenderer(createSSRApp, options);
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const manifest = await getClientManifest();
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const options = {
    manifest,
    renderToString: () => spaTemplate,
    buildAssetsURL
  };
  const renderer = createRenderer(() => () => {
  }, options);
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return ssrContext.noSSR ? getSPARenderer() : getSSRRenderer();
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const _lazy_OtplY_ = () => Promise.resolve().then(function () { return chat_post$1; });
const _lazy_bWeybX = () => Promise.resolve().then(function () { return downloadOrder$1; });
const _lazy_jDDHaj = () => Promise.resolve().then(function () { return alias$1; });
const _lazy_P0LkZ3 = () => Promise.resolve().then(function () { return list$1; });
const _lazy_qN0zhX = () => Promise.resolve().then(function () { return toggle$1; });
const _lazy_3esBZj = () => Promise.resolve().then(function () { return getCompanyByCnpj$1; });
const _lazy_O_ps9C = () => Promise.resolve().then(function () { return imgbb$1; });
const _lazy_PZI6hx = () => Promise.resolve().then(function () { return listTables$1; });
const _lazy_pPIOoG = () => Promise.resolve().then(function () { return login$1; });
const _lazy_8VFzTz = () => Promise.resolve().then(function () { return details$1; });
const _lazy_sdVVQ6 = () => Promise.resolve().then(function () { return distinct$1; });
const _lazy_GVVd1j = () => Promise.resolve().then(function () { return facetCounts$1; });
const _lazy_9IKLNy = () => Promise.resolve().then(function () { return getByIds$1; });
const _lazy_DpYwis = () => Promise.resolve().then(function () { return search$1; });
const _lazy_A5OG6N = () => Promise.resolve().then(function () { return registerCompany$1; });
const _lazy_x5d9H2 = () => Promise.resolve().then(function () { return registerUser$1; });
const _lazy_fWS4z_ = () => Promise.resolve().then(function () { return sendEmail$1; });
const _lazy_nX3Iry = () => Promise.resolve().then(function () { return tableSchema$1; });
const _lazy_SpnJX7 = () => Promise.resolve().then(function () { return testConnection$1; });
const _lazy_RworIi = () => Promise.resolve().then(function () { return profile_get$1; });
const _lazy_Iu7oFd = () => Promise.resolve().then(function () { return profile$1; });
const _lazy_dzIMZH = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _ruqmr5, lazy: false, middleware: true, method: undefined },
  { route: '/api/chat', handler: _lazy_OtplY_, lazy: true, middleware: false, method: "post" },
  { route: '/api/download-order', handler: _lazy_bWeybX, lazy: true, middleware: false, method: undefined },
  { route: '/api/favoritos/alias', handler: _lazy_jDDHaj, lazy: true, middleware: false, method: undefined },
  { route: '/api/favoritos/list', handler: _lazy_P0LkZ3, lazy: true, middleware: false, method: undefined },
  { route: '/api/favoritos/toggle', handler: _lazy_qN0zhX, lazy: true, middleware: false, method: undefined },
  { route: '/api/get-company-by-cnpj', handler: _lazy_3esBZj, lazy: true, middleware: false, method: undefined },
  { route: '/api/imgbb', handler: _lazy_O_ps9C, lazy: true, middleware: false, method: undefined },
  { route: '/api/list-tables', handler: _lazy_PZI6hx, lazy: true, middleware: false, method: undefined },
  { route: '/api/login', handler: _lazy_pPIOoG, lazy: true, middleware: false, method: undefined },
  { route: '/api/produtos/details', handler: _lazy_8VFzTz, lazy: true, middleware: false, method: undefined },
  { route: '/api/produtos/distinct', handler: _lazy_sdVVQ6, lazy: true, middleware: false, method: undefined },
  { route: '/api/produtos/facet-counts', handler: _lazy_GVVd1j, lazy: true, middleware: false, method: undefined },
  { route: '/api/produtos/get-by-ids', handler: _lazy_9IKLNy, lazy: true, middleware: false, method: undefined },
  { route: '/api/produtos/search', handler: _lazy_DpYwis, lazy: true, middleware: false, method: undefined },
  { route: '/api/register-company', handler: _lazy_A5OG6N, lazy: true, middleware: false, method: undefined },
  { route: '/api/register-user', handler: _lazy_x5d9H2, lazy: true, middleware: false, method: undefined },
  { route: '/api/send-email', handler: _lazy_fWS4z_, lazy: true, middleware: false, method: undefined },
  { route: '/api/table-schema', handler: _lazy_nX3Iry, lazy: true, middleware: false, method: undefined },
  { route: '/api/test-connection', handler: _lazy_SpnJX7, lazy: true, middleware: false, method: undefined },
  { route: '/api/user/profile', handler: _lazy_RworIi, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/profile', handler: _lazy_Iu7oFd, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_dzIMZH, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_dzIMZH, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Server error", "description": "An error occurred in the application and the page could not be served.", "stack": "" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage || "Internal Server Error") + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}h1,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.absolute{position:absolute}.top-6{top:1.5rem}.z-10{z-index:10}.mx-auto{margin-left:auto;margin-right:auto}.mb-4{margin-bottom:1rem}.mb-8{margin-bottom:2rem}.inline-block{display:inline-block}.h-auto{height:auto}.min-h-screen{min-height:100vh}.flex{display:flex}.flex-1{flex:1 1 0%}.flex-col{flex-direction:column}.overflow-y-auto{overflow-y:auto}.border{border-width:1px}.border-b-0{border-bottom-width:0}.border-black\\/5{border-color:#0000000d}.rounded-t-md{border-top-left-radius:.375rem;border-top-right-radius:.375rem}.bg-gray-50\\/50{background-color:#f5f5f580}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.p-8{padding:2rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.pt-12{padding-top:3rem}.text-6xl{font-size:3.75rem;line-height:1}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-black{--un-text-opacity:1;color:rgb(0 0 0/var(--un-text-opacity))}.hover\\:text-\\[\\#00DC82\\]:hover{--un-text-opacity:1;color:rgb(0 220 130/var(--un-text-opacity))}.font-light{font-weight:300}.font-medium{font-weight:500}.leading-tight{line-height:1.25}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.hover\\:underline:hover{text-decoration-line:underline}.underline-offset-3{text-underline-offset:3px}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media (prefers-color-scheme:dark){.dark\\:border-white\\/10{border-color:#ffffff1a}.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:bg-white\\/5{background-color:#ffffff0d}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media (min-width:640px){.sm\\:right-6{right:1.5rem}.sm\\:text-2xl{font-size:1.5rem;line-height:2rem}.sm\\:text-8xl{font-size:6rem;line-height:1}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white flex flex-col font-sans min-h-screen pt-12 px-10 text-black"><h1 class="font-medium mb-4 sm:text-8xl text-6xl">` + escapeHtml(messages.statusCode) + '</h1><p class="font-light leading-tight mb-8 sm:text-2xl text-xl">' + escapeHtml(messages.description) + '</p><a href="https://nuxt.com/docs/4.x/getting-started/error-handling?utm_source=nuxt-error-dev-page" target="_blank" class="absolute font-medium hover:text-[#00DC82] hover:underline inline-block mx-auto sm:right-6 text-sm top-6 underline-offset-3">Customize this page</a><div class="bg-gray-50/50 border border-b-0 border-black/5 dark:bg-white/5 dark:border-white/10 flex-1 h-auto overflow-y-auto rounded-t-md"><div class="font-light leading-tight p-8 text-xl z-10">' + escapeHtml(messages.stack) + "</div></div></body></html>";
};

const errorDev = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

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

const chat_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: chat_post
}, Symbol.toStringTag, { value: 'Module' }));

const downloadOrder = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const config = useRuntimeConfig(event);
  const q = getQuery$1(event);
  const format = String((q == null ? void 0 : q.format) || "").toLowerCase();
  const items = Array.isArray(body == null ? void 0 : body.items) ? body.items.filter(Boolean) : [];
  if (!items.length) {
    setHeader(event, "Content-Type", "application/json");
    return { success: false, message: "Carrinho vazio." };
  }
  let company = null;
  if (typeof (body == null ? void 0 : body.empresaId) === "number" && Number.isFinite(body.empresaId)) {
    try {
      if (config.supabaseUrl && config.supabaseKey) {
        const supabase = createClient(config.supabaseUrl, config.supabaseKey);
        const { data, error } = await supabase.from("empresas").select("cnpj, razao_social, email, filial").eq("id", body.empresaId).single();
        if (!error && data) company = data;
      }
    } catch (_) {
    }
  }
  const now = /* @__PURE__ */ new Date();
  const formatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });
  const formattedDate = formatter.format(now);
  const orderJson = {
    generatedAt: now.toISOString(),
    generatedAtLabel: formattedDate,
    company,
    client: {
      email: String(((_a = body == null ? void 0 : body.user) == null ? void 0 : _a.email) || ""),
      fullName: String(((_b = body == null ? void 0 : body.user) == null ? void 0 : _b.fullName) || ""),
      sector: String(((_c = body == null ? void 0 : body.user) == null ? void 0 : _c.sector) || ""),
      whatsapp: String(((_d = body == null ? void 0 : body.user) == null ? void 0 : _d.whatsapp) || "")
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
        unidade_leitura: p.unidade_leitura
      },
      notes: p.notes
    })),
    totalItems: items.reduce((sum, p) => sum + (p.quantity || 0), 0)
  };
  const enriched = await enrichItems$1(items, config);
  const pdfBuffer = await generateOrderPdf$1({ items: enriched, company, client: orderJson.client, formattedDate });
  const safeTs = now.toISOString().replace(/[:T]/g, "-").slice(0, 16);
  if (format === "pdf") {
    const filenamePdf = `pedido_qualitec_${safeTs}.pdf`;
    setHeader(event, "Content-Type", "application/pdf");
    setHeader(event, "Content-Disposition", `attachment; filename="${filenamePdf}"`);
    return pdfBuffer;
  } else {
    const zip = new JSZip();
    zip.file("pedido.json", JSON.stringify(orderJson, null, 2), { createFolders: false });
    zip.file("pedido.pdf", pdfBuffer);
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    const filenameZip = `pedido_qualitec_${safeTs}.zip`;
    setHeader(event, "Content-Type", "application/zip");
    setHeader(event, "Content-Disposition", `attachment; filename="${filenameZip}"`);
    return zipBuffer;
  }
});
async function generateOrderPdf$1(args) {
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
      console.log("Logo found at:", logoPath);
      doc.image(logoPath, 40, logoY, logoBox);
    } catch (err) {
      console.error("Error loading logo:", err);
    }
  } else {
    console.log("Logo not found at:", logoPath);
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
  leftY += leftLineGap;
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
  const qualitecContato = {
    nome: "Marco A. Casmalla",
    fone: "+55 11 99918-4979",
    email: "marco@qualitec.ind.br"
  };
  let contactY = columnsTopY + 16;
  [qualitecContato.nome, qualitecContato.fone, qualitecContato.email].forEach((line) => {
    doc.text(line, rightColX, contactY, { width: rightColWidth, align: "left" });
    contactY += 14;
  });
  const headerBottomY = Math.max(leftBottomY, centerY, contactY);
  doc.moveDown(0.2);
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
    if (idx > 0) {
      const BOTTOM_MARGIN = 40;
      const PAGE_HEIGHT = doc.page.height || 842;
      const estimatedRows = 20;
      const estimatedBlockHeight = 14 + 0.5 * CM + 11 + 18 + estimatedRows * 16;
      const neededSpace = 3 * CM + estimatedBlockHeight;
      const availableSpace = PAGE_HEIGHT - BOTTOM_MARGIN - cursorY;
      if (availableSpace < neededSpace) {
        doc.addPage();
        cursorY = 40;
      } else {
        cursorY += 3 * CM;
      }
    }
    const productTitle = String(p.categoria || p.title || `Produto ${p.id}`).toUpperCase();
    doc.font("Helvetica-Bold").fontSize(14).fillColor(titleColor);
    doc.text(productTitle, 40, cursorY);
    cursorY += 0.5 * CM;
    doc.font("Helvetica-Bold").fontSize(11).fillColor(sectionColor);
    doc.text("Especifica\xE7\xF5es detalhadas:", 40, cursorY);
    cursorY += 18;
    const row = (label, value) => {
      const v = value != null && String(value).trim() ? String(value) : "\u2014";
      const lab = label.endsWith(":") ? label : `${label}:`;
      doc.font("Helvetica-Bold").fontSize(10).fillColor(labelColor);
      doc.text(lab, 40, cursorY);
      const labelW = doc.widthOfString(lab);
      const gap = 6;
      doc.font("Helvetica").fontSize(10).fillColor("#111827");
      doc.text(v, 40 + labelW + gap, cursorY);
      cursorY += 16;
    };
    row("Quantidade:", p.quantity);
    const partNumber = typeof p.id === "string" ? p.id : p.title || "\u2014";
    row("Part Number:", partNumber);
    row("Fabricante:", p.brand || "QUALITEC");
    row("Faixa de Press\xE3o:", p.faixa_trabalho);
    row("Di\xE2metro:", p.diametro_montagem);
    row("Conex\xE3o:", p.conexao_instrumento);
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
    row("Tipo de Medi\xE7\xE3o:", p.tipo_medicao);
    row("Posi\xE7\xE3o de Montagem:", p.posicao_montagem);
    row("Material do Inv\xF3lucro:", p.material_involucro);
    row("Material dos Internos:", p.material_internos);
    row("Visor:", p.visor);
    row("Classe de Exatid\xE3o:", p.classe_exatidao);
    row("Unidade de Leitura:", p.unidade_leitura);
    row("Enchimento de Glicerina:", boolText(p.glicerina));
    row("Certificados:", certText(p.certificados));
    row("Tubo Sif\xE3o:", boolText(p.tubo_sifao));
    row("Selo Diafragma:", boolText(p.selo_diafragma));
    row("Contato El\xE9trico:", boolText(p.contato_eletrico));
    row("V\xE1lvula de Isolamento:", boolText(p.valvula_isolamento));
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
  });
  doc.end();
  return bufferPromise;
}
async function enrichItems$1(items, config) {
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

const downloadOrder$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: downloadOrder
}, Symbol.toStringTag, { value: 'Module' }));

async function resolveUserIdSupabase$1(supabase, email, empresaId) {
  const { data, error } = await supabase.from("usuarios").select("id").eq("email", email.toUpperCase()).eq("empresa_id", empresaId).single();
  if (error || !data) return null;
  return Number(data.id);
}
async function resolveProductIdSupabase$1(supabase, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const { data: data2, error: error2 } = await supabase.from("produtos").select("id").eq("id", Number(idStr)).single();
    return !error2 && data2 ? Number(data2.id) : null;
  }
  const { data, error } = await supabase.from("produtos").select("id").eq("part_number", idStr).single();
  return !error && data ? Number(data.id) : null;
}
async function resolveUserIdMySql$1(conn, email, empresaId) {
  const [userRows] = await conn.execute(
    "SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?",
    [email.toUpperCase(), empresaId]
  );
  if (!Array.isArray(userRows) || userRows.length === 0) return null;
  return Number(userRows[0].id);
}
async function resolveProductIdMySql$1(conn, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const [rows2] = await conn.execute("SELECT id FROM produtos WHERE id = ?", [Number(idStr)]);
    return Array.isArray(rows2) && rows2.length ? Number(rows2[0].id) : null;
  }
  const [rows] = await conn.execute("SELECT id FROM produtos WHERE part_number = ?", [idStr]);
  return Array.isArray(rows) && rows.length ? Number(rows[0].id) : null;
}
const alias = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const email = String((body == null ? void 0 : body.email) || "").trim().toUpperCase();
  const empresaId = Number((body == null ? void 0 : body.empresaId) || 0);
  const id = body == null ? void 0 : body.id;
  const alias = String((body == null ? void 0 : body.alias) || "").trim();
  if (!email || !Number.isFinite(empresaId) || empresaId <= 0 || id == null) {
    return { success: false, message: "Par\xE2metros inv\xE1lidos" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const usuarioId = await resolveUserIdSupabase$1(supabase, email, empresaId);
      if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
      const produtoId = await resolveProductIdSupabase$1(supabase, id);
      if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
      const { data: updateData, error: updateError } = await supabase.from("favoritos").update({ alias: alias || null }).eq("usuario_id", usuarioId).eq("produto_id", produtoId).select().single();
      if (updateError || !updateData) {
        const { error: insertError } = await supabase.from("favoritos").insert({ usuario_id: usuarioId, produto_id: produtoId, alias: alias || null });
        if (insertError) {
          return { success: false, message: insertError.message };
        }
      }
      return { success: true };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const usuarioId = await resolveUserIdMySql$1(conn, email, empresaId);
        if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
        const produtoId = await resolveProductIdMySql$1(conn, id);
        if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
        const [updateRes] = await conn.execute(
          "UPDATE favoritos SET alias = ? WHERE usuario_id = ? AND produto_id = ?",
          [alias || null, usuarioId, produtoId]
        );
        if (!(updateRes == null ? void 0 : updateRes.affectedRows)) {
          await conn.execute(
            "INSERT INTO favoritos (usuario_id, produto_id, alias) VALUES (?, ?, ?)",
            [usuarioId, produtoId, alias || null]
          );
        }
        return { success: true };
      } finally {
        await conn.end();
      }
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Erro ao salvar alias" };
  }
});

const alias$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: alias
}, Symbol.toStringTag, { value: 'Module' }));

const list = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery$1(event);
  const email = String(query.email || "").trim().toUpperCase();
  const empresaId = Number(query.empresaId || 0);
  if (!email || !Number.isFinite(empresaId) || empresaId <= 0) {
    return { items: [] };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data: userRows, error: userError } = await supabase.from("usuarios").select("id").eq("email", email).eq("empresa_id", empresaId).single();
      if (userError || !userRows) {
        return { items: [] };
      }
      const { data: favoritos, error: favoritosError } = await supabase.from("favoritos").select("produto_id, alias").eq("usuario_id", userRows.id).order("created_at", { ascending: false });
      if (favoritosError) {
        return { error: favoritosError.message };
      }
      const items = Array.isArray(favoritos) ? favoritos.map((fav) => ({
        id: fav.produto_id,
        alias: fav.alias
      })) : [];
      return { items };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const [userRows] = await conn.execute(
          "SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?",
          [email, empresaId]
        );
        if (!Array.isArray(userRows) || userRows.length === 0) {
          return { items: [] };
        }
        const usuarioId = userRows[0].id;
        const [rows] = await conn.execute(
          "SELECT produto_id AS id, alias FROM favoritos WHERE usuario_id = ? ORDER BY created_at DESC",
          [usuarioId]
        );
        return { items: Array.isArray(rows) ? rows : [] };
      } finally {
        await conn.end();
      }
    }
    return { items: [] };
  } catch (error) {
    return { error: (error == null ? void 0 : error.message) || "Erro ao listar favoritos" };
  }
});

const list$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: list
}, Symbol.toStringTag, { value: 'Module' }));

async function resolveUserIdSupabase(supabase, email, empresaId) {
  const { data, error } = await supabase.from("usuarios").select("id").eq("email", email.toUpperCase()).eq("empresa_id", empresaId).single();
  if (error || !data) return null;
  return Number(data.id);
}
async function resolveProductIdSupabase(supabase, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const { data: data2, error: error2 } = await supabase.from("produtos").select("id").eq("id", Number(idStr)).single();
    return !error2 && data2 ? Number(data2.id) : null;
  }
  const { data, error } = await supabase.from("produtos").select("id").eq("part_number", idStr).single();
  return !error && data ? Number(data.id) : null;
}
async function resolveUserIdMySql(conn, email, empresaId) {
  const [userRows] = await conn.execute(
    "SELECT id FROM usuarios WHERE email = ? AND empresa_id = ?",
    [email.toUpperCase(), empresaId]
  );
  if (!Array.isArray(userRows) || userRows.length === 0) return null;
  return Number(userRows[0].id);
}
async function resolveProductIdMySql(conn, rawId) {
  const idStr = String(rawId);
  const isNumeric = /^\d+$/.test(idStr);
  if (isNumeric) {
    const [rows2] = await conn.execute("SELECT id FROM produtos WHERE id = ?", [Number(idStr)]);
    return Array.isArray(rows2) && rows2.length ? Number(rows2[0].id) : null;
  }
  const [rows] = await conn.execute("SELECT id FROM produtos WHERE part_number = ?", [idStr]);
  return Array.isArray(rows) && rows.length ? Number(rows[0].id) : null;
}
const toggle = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const email = String((body == null ? void 0 : body.email) || "").trim().toUpperCase();
  const empresaId = Number((body == null ? void 0 : body.empresaId) || 0);
  const id = body == null ? void 0 : body.id;
  if (!email || !Number.isFinite(empresaId) || empresaId <= 0 || id == null) {
    return { success: false, message: "Par\xE2metros inv\xE1lidos" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const usuarioId = await resolveUserIdSupabase(supabase, email, empresaId);
      if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
      const produtoId = await resolveProductIdSupabase(supabase, id);
      if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
      const { data: existsRows, error: existsError } = await supabase.from("favoritos").select("id").eq("usuario_id", usuarioId).eq("produto_id", produtoId).single();
      if (existsError && existsError.code !== "PGRST116") {
        return { success: false, message: existsError.message };
      }
      const exists = !existsError && existsRows;
      if (exists) {
        const { error: deleteError } = await supabase.from("favoritos").delete().eq("id", existsRows.id);
        if (deleteError) {
          return { success: false, message: deleteError.message };
        }
        return { success: true, active: false };
      } else {
        const { error: insertError } = await supabase.from("favoritos").insert({ usuario_id: usuarioId, produto_id: produtoId });
        if (insertError) {
          return { success: false, message: insertError.message };
        }
        return { success: true, active: true };
      }
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const usuarioId = await resolveUserIdMySql(conn, email, empresaId);
        if (!usuarioId) return { success: false, message: "Usu\xE1rio n\xE3o encontrado" };
        const produtoId = await resolveProductIdMySql(conn, id);
        if (!produtoId) return { success: false, message: "Produto n\xE3o encontrado" };
        const [existsRows] = await conn.execute(
          "SELECT id FROM favoritos WHERE usuario_id = ? AND produto_id = ?",
          [usuarioId, produtoId]
        );
        const exists = Array.isArray(existsRows) && existsRows.length > 0;
        if (exists) {
          const favId = Number(existsRows[0].id);
          await conn.execute("DELETE FROM favoritos WHERE id = ?", [favId]);
          return { success: true, active: false };
        } else {
          await conn.execute("INSERT INTO favoritos (usuario_id, produto_id) VALUES (?, ?)", [usuarioId, produtoId]);
          return { success: true, active: true };
        }
      } finally {
        await conn.end();
      }
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: (error == null ? void 0 : error.message) || "Erro ao alternar favorito" };
  }
});

const toggle$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: toggle
}, Symbol.toStringTag, { value: 'Module' }));

const getCompanyByCnpj = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const { cnpj } = body;
  if (!cnpj) {
    return { success: false, message: "CNPJ n\xE3o fornecido." };
  }
  const cleanCnpj = cnpj.replace(/\D/g, "");
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("empresas").select("razao_social").or(`cnpj.eq.${cleanCnpj},cnpj.eq.${cnpj}`).single();
      if (!error && data) {
        return { success: true, razao_social: data.razao_social };
      }
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const [rows] = await connection.execute(
          "SELECT razao_social FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
          [cleanCnpj]
        );
        if (Array.isArray(rows) && rows.length > 0) {
          const company = rows[0];
          return { success: true, razao_social: company.razao_social };
        }
      } finally {
        await connection.end();
      }
    }
    try {
      const external = await $fetch$1(
        `https://brasilapi.com.br/api/cnpj/v1/${cleanCnpj}`,
        { headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (TraeAI)" } }
      );
      if (external == null ? void 0 : external.razao_social) {
        return { success: true, razao_social: external.razao_social };
      }
      if (external == null ? void 0 : external.nome_fantasia) {
        return { success: true, razao_social: external.nome_fantasia };
      }
    } catch (e) {
    }
    try {
      const r = await $fetch$1(
        `https://www.receitaws.com.br/v1/cnpj/${cleanCnpj}`,
        { headers: { "Accept": "application/json", "User-Agent": "Mozilla/5.0 (TraeAI)" } }
      );
      if (r == null ? void 0 : r.nome) {
        return { success: true, razao_social: r.nome };
      }
      if (r == null ? void 0 : r.fantasia) {
        return { success: true, razao_social: r.fantasia };
      }
    } catch (e) {
    }
    return { success: false, message: "Empresa n\xE3o encontrada." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

const getCompanyByCnpj$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getCompanyByCnpj
}, Symbol.toStringTag, { value: 'Module' }));

const imgbb = defineEventHandler(async (event) => {
  const q = getQuery$1(event);
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

const imgbb$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: imgbb
}, Symbol.toStringTag, { value: 'Module' }));

const listTables = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: "forbidden" };
  }
  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    });
    const [rows] = await connection.execute("SHOW TABLES");
    await connection.end();
    return { tables: rows };
  } catch (error) {
    return { error: error.message };
  }
});

const listTables$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: listTables
}, Symbol.toStringTag, { value: 'Module' }));

const RATE_WINDOW_MS = 6e4;
const RATE_MAX_ATTEMPTS = 10;
const RATE_BLOCK_MS = 5 * 6e4;
const attemptsByIp = /* @__PURE__ */ new Map();
function getClientIp(event) {
  var _a;
  const hdr = String(event.node.req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  return hdr || ((_a = event.node.req.socket) == null ? void 0 : _a.remoteAddress) || "unknown";
}
function isValidEmail(email) {
  if (!email || email.length > 254) return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
function normalizeDigits(value) {
  return String(value || "").replace(/\D/g, "");
}
const login = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  const method = event.node.req.method || "GET";
  const ip = getClientIp(event);
  if (method !== "POST") {
    return { success: false, message: "M\xE9todo n\xE3o permitido" };
  }
  const now = Date.now();
  const ipState = attemptsByIp.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (ipState.blockedUntil && ipState.blockedUntil > now) {
    return { success: false, message: "Muitas tentativas. Tente novamente mais tarde." };
  }
  if (now > ipState.resetAt) {
    ipState.count = 0;
    ipState.resetAt = now + RATE_WINDOW_MS;
    ipState.blockedUntil = void 0;
  }
  ipState.count += 1;
  attemptsByIp.set(ip, ipState);
  if (ipState.count > RATE_MAX_ATTEMPTS) {
    ipState.blockedUntil = now + RATE_BLOCK_MS;
    attemptsByIp.set(ip, ipState);
    return { success: false, message: "Muitas tentativas. Tente novamente mais tarde." };
  }
  const rawEmail = String((body == null ? void 0 : body.email) || "").trim();
  const loginEmail = rawEmail.toUpperCase();
  const digits = normalizeDigits(body == null ? void 0 : body.cnpj);
  if (!isValidEmail(rawEmail)) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  }
  if (digits.length !== 14) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  }
  const supaUrl = config == null ? void 0 : config.supabaseUrl;
  const supaKey = config == null ? void 0 : config.supabaseSecretKey;
  if (supaUrl && supaKey) {
    const supabase = createClient(supaUrl, supaKey);
    try {
      const { data: companies } = await supabase.from("empresas").select("id, cnpj").or(`cnpj.eq.${digits},cnpj.eq.${body.cnpj}`).limit(1e4);
      let match = (Array.isArray(companies) ? companies : []).find((c) => normalizeDigits(String(c.cnpj || "")) === digits);
      if (!match && Array.isArray(companies)) {
        match = companies.find((c) => String(c.cnpj || "").trim() === String(body.cnpj || "").trim());
      }
      if (!match) {
        await new Promise((r) => setTimeout(r, 400));
        return { success: false, message: "Empresa n\xE3o encontrada" };
      }
      const empresaId = Number(match.id);
      const { data: users } = await supabase.from("usuarios").select("*").eq("email", loginEmail).eq("empresa_id", empresaId).limit(1);
      if (Array.isArray(users) && users.length > 0) {
        return { success: true, user: users[0] };
      }
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Credenciais inv\xE1lidas" };
    } catch (_) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Erro ao validar credenciais" };
    }
  }
  if (!config.dbHost || !config.dbUser || !config.dbPassword || !config.dbDatabase) {
    return { success: false, message: "Backend de dados n\xE3o configurado" };
  }
  const connection = await mysql.createConnection({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase
  });
  try {
    const [companyRows] = await connection.execute(
      "SELECT id, email FROM empresas WHERE REPLACE(REPLACE(REPLACE(REPLACE(cnpj, '.', ''), '/', ''), '-', ''), ' ', '') = ?",
      [digits]
    );
    if (!Array.isArray(companyRows) || companyRows.length === 0) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: false, message: "Credenciais inv\xE1lidas" };
    }
    const empresaId = companyRows[0].id;
    const [userRows] = await connection.execute("SELECT * FROM usuarios WHERE email = ? AND empresa_id = ?", [loginEmail, empresaId]);
    if (Array.isArray(userRows) && userRows.length > 0) {
      return { success: true, user: userRows[0] };
    }
    await new Promise((r) => setTimeout(r, 400));
    return { success: false, message: "Credenciais inv\xE1lidas" };
  } finally {
    await connection.end();
  }
});

const login$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: 'Module' }));

const details = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const idRaw = query.id;
  const partNumberRaw = query.part_number;
  if (!idRaw && !partNumberRaw) {
    return { error: "missing_id_or_part_number" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*").eq("ativo", 1).limit(1);
      if (idRaw) {
        queryBuilder = queryBuilder.eq("id", Number(idRaw));
      } else if (partNumberRaw) {
        queryBuilder = queryBuilder.eq("part_number", String(partNumberRaw));
      }
      const { data, error } = await queryBuilder;
      if (error) {
        return { error: error.message };
      }
      const product = data == null ? void 0 : data[0];
      if (!product) return { error: "not_found" };
      return { item: product };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const whereParts = ["ativo = 1"];
        const params = [];
        if (idRaw) {
          whereParts.push("id = ?");
          params.push(Number(idRaw));
        } else if (partNumberRaw) {
          whereParts.push("part_number = ?");
          params.push(String(partNumberRaw));
        }
        const whereSql = `WHERE ${whereParts.join(" AND ")}`;
        const sql = `
          SELECT id, categoria, codigo_erp, part_number, fabricante, tipo_medicao,
                 diametro_montagem, posicao_montagem, conexao_instrumento,
                 material_involucro, material_internos, visor, classe_exatidao,
                 unidade_leitura, faixa_trabalho, glicerina, certificados,
                 tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento,
                 ncm, estoque, preco, imagens, ativo
          FROM produtos
          ${whereSql}
          LIMIT 1
        `;
        const [rows] = await conn.execute(sql, params);
        const product = rows[0];
        if (!product) return { error: "not_found" };
        return { item: product };
      } finally {
        await conn.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

const details$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: details
}, Symbol.toStringTag, { value: 'Module' }));

const distinct = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const uiCategoria = query.categoria || "";
  const limit = Number(query.limit || 500);
  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  }
  function categoriaCandidates(ui) {
    const norm = normalize(ui);
    if (!ui || ui === "Todas as categorias") return [];
    if (norm.startsWith("MANOMETR")) {
      return ["MAN\xD4METRO", "MANOMETRO", "MAN\xD4METROS", "MANOMETROS"];
    }
    const set = /* @__PURE__ */ new Set();
    set.add(ui);
    set.add(ui.toUpperCase());
    set.add(norm);
    return Array.from(set);
  }
  const categoriaList = categoriaCandidates(uiCategoria);
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      let distinct = function(col, order = "ASC") {
        const values2 = /* @__PURE__ */ new Set();
        for (const produto of produtosArray) {
          const valor = produto[col];
          if (valor != null && valor !== "") {
            values2.add(String(valor));
          }
        }
        const sorted = Array.from(values2).sort(
          (a, b) => order === "ASC" ? a.localeCompare(b) : b.localeCompare(a)
        );
        return sorted.slice(0, limit);
      }, distinctBool = function(col) {
        function toUiBool(val) {
          if (val === null || val === void 0) return null;
          if (typeof val === "number") return val === 1 ? "Sim" : "N\xE3o";
          const s = String(val).trim().toLowerCase();
          if (!s) return null;
          if (["1", "sim", "s", "true", "yes", "y"].includes(s)) return "Sim";
          if (["0", "nao", "n\xE3o", "n", "false", "no"].includes(s)) return "N\xE3o";
          return "Sim";
        }
        const set = /* @__PURE__ */ new Set();
        for (const produto of produtosArray) {
          const valor = produto[col];
          const mapped = toUiBool(valor);
          if (mapped) set.add(mapped);
        }
        const out = Array.from(set);
        out.sort((a, b) => a === b ? 0 : a === "Sim" ? -1 : 1);
        return out;
      }, distinctFromJsonArray = function(col) {
        const set = /* @__PURE__ */ new Set();
        for (const produto of produtosArray) {
          const val = produto[col];
          if (!val) continue;
          try {
            const arr = Array.isArray(val) ? val : JSON.parse(val);
            if (Array.isArray(arr)) {
              for (const item of arr) {
                const s = String(item).trim();
                if (s) set.add(s);
              }
            }
          } catch {
          }
        }
        return Array.from(set).sort();
      };
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*").eq("ativo", 1);
      if (categoriaList.length > 0) {
        queryBuilder = queryBuilder.in("categoria", categoriaList);
      }
      const { data: produtos, error } = await queryBuilder;
      if (error) {
        return { error: error.message };
      }
      const produtosArray = produtos || [];
      const values = {
        part_number: distinct("part_number"),
        faixa_trabalho: distinct("faixa_trabalho"),
        fabricante: distinct("fabricante"),
        tipo_medicao: distinct("tipo_medicao"),
        diametro_montagem: distinct("diametro_montagem"),
        posicao_montagem: distinct("posicao_montagem"),
        conexao_instrumento: distinct("conexao_instrumento"),
        visor: distinct("visor"),
        classe_exatidao: distinct("classe_exatidao"),
        material_involucro: distinct("material_involucro"),
        material_internos: distinct("material_internos"),
        unidade_leitura: distinct("unidade_leitura"),
        glicerina: distinctBool("glicerina"),
        certificados: distinctFromJsonArray("certificados"),
        tubo_sifao: distinctBool("tubo_sifao"),
        selo_diafragma: distinctBool("selo_diafragma"),
        contato_eletrico: distinctBool("contato_eletrico"),
        valvula_isolamento: distinctBool("valvula_isolamento")
      };
      return { values };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const where = categoriaList.length ? `WHERE categoria IN (${categoriaList.map(() => "?").join(",")})` : "WHERE 1=1";
        const params = [...categoriaList];
        async function distinct(col, order = "ASC") {
          const sql = `SELECT DISTINCT ${col} AS v FROM produtos ${where} AND ${col} IS NOT NULL AND ${col} <> '' ORDER BY ${col} ${order} LIMIT ?`;
          const args = [...params, limit];
          const [rows] = await connection.query(sql, args);
          return rows.map((r) => String(r.v));
        }
        async function distinctBool(col) {
          const sql = `SELECT DISTINCT ${col} AS v FROM produtos ${where} ORDER BY ${col} ASC LIMIT ?`;
          const args = [...params, limit];
          const [rows] = await connection.query(sql, args);
          function toUiBool(val) {
            if (val === null || val === void 0) return null;
            if (typeof val === "number") return val === 1 ? "Sim" : "N\xE3o";
            const s = String(val).trim().toLowerCase();
            if (!s) return null;
            if (["1", "sim", "s", "true", "yes", "y"].includes(s)) return "Sim";
            if (["0", "nao", "n\xE3o", "n", "false", "no"].includes(s)) return "N\xE3o";
            return "Sim";
          }
          const set = /* @__PURE__ */ new Set();
          for (const r of rows) {
            const mapped = toUiBool(r.v);
            if (mapped) set.add(mapped);
          }
          const out = Array.from(set);
          out.sort((a, b) => a === b ? 0 : a === "Sim" ? -1 : 1);
          return out;
        }
        async function distinctFromJsonArray(col) {
          const sql = `SELECT ${col} FROM produtos ${where}`;
          const [rows] = await connection.query(sql, params);
          const set = /* @__PURE__ */ new Set();
          for (const r of rows) {
            const val = r[col];
            if (!val) continue;
            try {
              const arr = Array.isArray(val) ? val : JSON.parse(val);
              if (Array.isArray(arr)) {
                for (const item of arr) {
                  const s = String(item).trim();
                  if (s) set.add(s);
                }
              }
            } catch {
            }
          }
          return Array.from(set).sort();
        }
        const values = {
          part_number: await distinct("part_number"),
          faixa_trabalho: await distinct("faixa_trabalho"),
          fabricante: await distinct("fabricante"),
          tipo_medicao: await distinct("tipo_medicao"),
          diametro_montagem: await distinct("diametro_montagem"),
          posicao_montagem: await distinct("posicao_montagem"),
          conexao_instrumento: await distinct("conexao_instrumento"),
          visor: await distinct("visor"),
          classe_exatidao: await distinct("classe_exatidao"),
          material_involucro: await distinct("material_involucro"),
          material_internos: await distinct("material_internos"),
          unidade_leitura: await distinct("unidade_leitura"),
          glicerina: await distinctBool("glicerina"),
          certificados: await distinctFromJsonArray("certificados"),
          tubo_sifao: await distinctBool("tubo_sifao"),
          selo_diafragma: await distinctBool("selo_diafragma"),
          contato_eletrico: await distinctBool("contato_eletrico"),
          valvula_isolamento: await distinctBool("valvula_isolamento")
        };
        return { values };
      } finally {
        await connection.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

const distinct$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: distinct
}, Symbol.toStringTag, { value: 'Module' }));

function normalize$1(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function uiCategoriaToDbCandidates$1(val) {
  if (!val || val === "Todas as categorias") return [];
  const norm = normalize$1(val);
  if (norm.startsWith("MANOMETR")) {
    return ["MAN\xD4METRO", "MANOMETRO", "MAN\xD4METROS", "MANOMETROS"];
  }
  const set = /* @__PURE__ */ new Set();
  set.add(val);
  set.add(val.toUpperCase());
  set.add(norm);
  return Array.from(set);
}
function boolUiToDb$1(v) {
  if (v == null) return void 0;
  if (v === "") return void 0;
  return v === "Sim" ? 1 : v === "N\xE3o" ? 0 : void 0;
}
const FACET_COLUMNS = [
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
];
const facetCounts = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const uiCategoria = query.categoria || void 0;
  const categoriaCandidates = uiCategoriaToDbCandidates$1(uiCategoria);
  let filters = {};
  try {
    const raw = query.filters || "{}";
    filters = JSON.parse(raw);
  } catch {
    filters = {};
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*").eq("ativo", 1);
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in("categoria", categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (key === "part_number" && val) {
          queryBuilder = queryBuilder.eq("part_number", String(val));
        } else if (!FACET_COLUMNS.includes(key)) {
          if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
            const b = boolUiToDb$1(val);
            if (typeof b === "number") {
              queryBuilder = queryBuilder.eq(key, b);
            }
          } else if (key === "certificados") {
            queryBuilder = queryBuilder.contains(key, [String(val)]);
          } else if (val != null && val !== "") {
            queryBuilder = queryBuilder.eq(key, String(val));
          }
        }
      }
      const { data: produtos, error } = await queryBuilder;
      if (error) {
        return { error: error.message };
      }
      const counts = {};
      const totals = {};
      const produtosArray = produtos || [];
      for (const facet of FACET_COLUMNS) {
        counts[facet] = {};
        totals[facet] = 0;
      }
      for (const produto of produtosArray) {
        for (const facet of FACET_COLUMNS) {
          const valor = produto[facet];
          if (facet === "certificados") {
            if (Array.isArray(valor)) {
              for (const item of valor) {
                const s = String(item).trim();
                if (s) {
                  counts[facet][s] = (counts[facet][s] || 0) + 1;
                  totals[facet]++;
                }
              }
            }
          } else if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(facet)) {
            const label = valor === 1 ? "Sim" : valor === 0 ? "N\xE3o" : String(valor || "");
            if (label && label !== "") {
              counts[facet][label] = (counts[facet][label] || 0) + 1;
              totals[facet]++;
            }
          } else {
            const s = String(valor || "").trim();
            if (s && s !== "") {
              counts[facet][s] = (counts[facet][s] || 0) + 1;
              totals[facet]++;
            }
          }
        }
      }
      return { counts, totals };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const baseWhereParts = ["ativo = 1"];
        const baseParams = [];
        if (categoriaCandidates.length) {
          baseWhereParts.push(`categoria IN (${categoriaCandidates.map(() => "?").join(",")})`);
          baseParams.push(...categoriaCandidates);
        }
        const counts = {};
        const totals = {};
        for (const facet of FACET_COLUMNS) {
          const whereParts = [...baseWhereParts];
          const params = [...baseParams];
          for (const [key, val] of Object.entries(filters)) {
            if (key === facet) continue;
            if (val == null || val === "") continue;
            if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
              const b = boolUiToDb$1(val);
              if (typeof b === "number") {
                whereParts.push(`${key} = ?`);
                params.push(b);
              }
            } else if (key === "certificados") {
              whereParts.push("JSON_CONTAINS(certificados, JSON_QUOTE(?))");
              params.push(String(val));
            } else if (key === "part_number") {
              whereParts.push(`part_number = ?`);
              params.push(String(val));
            } else {
              whereParts.push(`${key} = ?`);
              params.push(String(val));
            }
          }
          const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
          const [totRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
          totals[facet] = (_b = (_a = totRows[0]) == null ? void 0 : _a.total) != null ? _b : 0;
          counts[facet] = {};
          if (facet === "certificados") {
            const [rows] = await conn.execute(`SELECT certificados FROM produtos ${whereSql}`, params);
            for (const r of rows) {
              const raw = r == null ? void 0 : r.certificados;
              if (!raw) continue;
              try {
                const arr = Array.isArray(raw) ? raw : JSON.parse(raw);
                if (Array.isArray(arr)) {
                  for (const item of arr) {
                    const s = String(item).trim();
                    if (!s) continue;
                    counts[facet][s] = (counts[facet][s] || 0) + 1;
                  }
                }
              } catch {
              }
            }
          } else if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(facet)) {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} GROUP BY ${facet}`, params);
            for (const r of rows) {
              const label = r.v === 1 ? "Sim" : r.v === 0 ? "N\xE3o" : String(r.v);
              counts[facet][label] = Number(r.c) || 0;
            }
          } else {
            const [rows] = await conn.execute(`SELECT ${facet} as v, COUNT(*) as c FROM produtos ${whereSql} AND ${facet} IS NOT NULL AND ${facet} <> '' GROUP BY ${facet}`, params);
            for (const r of rows) {
              const s = String(r.v);
              counts[facet][s] = Number(r.c) || 0;
            }
          }
        }
        return { counts, totals };
      } finally {
        await conn.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

const facetCounts$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: facetCounts
}, Symbol.toStringTag, { value: 'Module' }));

const getByIds = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const idsParam = query.ids || "";
  const ids = idsParam.split(",").map((s) => Number(String(s).trim())).filter((n) => Number.isFinite(n) && n > 0);
  if (ids.length < 2 || ids.length > 3) {
    return { error: "Forne\xE7a entre 2 e 3 ids de produtos" };
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("produtos").select("*").in("id", ids).order("id", { ascending: true });
      if (error) {
        return { error: error.message };
      }
      const idOrder = new Map(ids.map((id, index) => [id, index]));
      const orderedData = (data || []).sort((a, b) => {
        var _a, _b;
        const orderA = (_a = idOrder.get(a.id)) != null ? _a : 999;
        const orderB = (_b = idOrder.get(b.id)) != null ? _b : 999;
        return orderA - orderB;
      });
      return { items: orderedData };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const placeholders = ids.map(() => "?").join(",");
        const sql = `
          SELECT id, categoria, part_number, fabricante,
                 tipo_medicao, diametro_montagem, posicao_montagem,
                 conexao_instrumento, material_involucro, material_internos,
                 visor, classe_exatidao, unidade_leitura, faixa_trabalho,
                 glicerina, certificados, tubo_sifao, selo_diafragma,
                 contato_eletrico, valvula_isolamento,
                 ncm, estoque, preco
          FROM produtos
          WHERE id IN (${placeholders})
          ORDER BY FIELD(id, ${placeholders})
        `;
        const params = [...ids, ...ids];
        const [rows] = await conn.execute(sql, params);
        return { items: rows };
      } finally {
        await conn.end();
      }
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

const getByIds$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: getByIds
}, Symbol.toStringTag, { value: 'Module' }));

function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function uiCategoriaToDbCandidates(val) {
  if (!val || val === "Todas as categorias") return [];
  const norm = normalize(val);
  if (norm.startsWith("MANOMETR")) {
    return ["MAN\xD4METRO", "MANOMETRO", "MAN\xD4METROS", "MANOMETROS"];
  }
  const set = /* @__PURE__ */ new Set();
  set.add(val);
  set.add(val.toUpperCase());
  set.add(norm);
  return Array.from(set);
}
function boolUiToDb(v) {
  if (v == null) return void 0;
  if (v === "") return void 0;
  return v === "Sim" ? 1 : v === "N\xE3o" ? 0 : void 0;
}
const ALLOWED_FILTERS = /* @__PURE__ */ new Set([
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
const search = defineEventHandler(async (event) => {
  var _a, _b;
  const config = useRuntimeConfig();
  const query = getQuery$1(event);
  const page = Math.max(1, Number(query.page || 1));
  const pageSize = Math.min(100, Math.max(1, Number(query.pageSize || 12)));
  const uiCategoria = query.categoria || void 0;
  const categoriaCandidates = uiCategoriaToDbCandidates(uiCategoria);
  let filters = {};
  try {
    const raw = query.filters || "{}";
    filters = JSON.parse(raw);
  } catch {
    filters = {};
  }
  try {
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      let queryBuilder = supabase.from("produtos").select("*", { count: "exact" }).eq("ativo", 1);
      if (categoriaCandidates.length > 0) {
        queryBuilder = queryBuilder.in("categoria", categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === "") continue;
        if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === "number") {
            queryBuilder = queryBuilder.eq(key, b);
          }
        } else if (key === "certificados") {
          queryBuilder = queryBuilder.contains(key, [String(val)]);
        } else {
          queryBuilder = queryBuilder.eq(key, String(val));
        }
      }
      const offset = (page - 1) * pageSize;
      const safeLimit = Math.min(100, Math.max(1, pageSize));
      const { data, error, count } = await queryBuilder.order("fabricante", { ascending: true }).order("part_number", { ascending: true }).range(offset, offset + safeLimit - 1);
      if (error) {
        return { error: error.message };
      }
      return {
        page,
        pageSize: safeLimit,
        total: count || 0,
        items: data || []
      };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const conn = await createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      const whereParts = ["ativo = 1"];
      const params = [];
      if (categoriaCandidates.length) {
        whereParts.push(`categoria IN (${categoriaCandidates.map(() => "?").join(",")})`);
        params.push(...categoriaCandidates);
      }
      for (const [key, val] of Object.entries(filters)) {
        if (!ALLOWED_FILTERS.has(key)) continue;
        if (val == null || val === "") continue;
        if (["glicerina", "tubo_sifao", "selo_diafragma", "contato_eletrico", "valvula_isolamento"].includes(key)) {
          const b = boolUiToDb(val);
          if (typeof b === "number") {
            whereParts.push(`${key} = ?`);
            params.push(b);
          }
        } else if (key === "certificados") {
          whereParts.push("JSON_CONTAINS(certificados, JSON_QUOTE(?))");
          params.push(String(val));
        } else {
          whereParts.push(`${key} = ?`);
          params.push(String(val));
        }
      }
      const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";
      const [countRows] = await conn.execute(`SELECT COUNT(*) as total FROM produtos ${whereSql}`, params);
      const total = (_b = (_a = countRows[0]) == null ? void 0 : _a.total) != null ? _b : 0;
      const offset = (page - 1) * pageSize;
      const safeLimit = Math.min(100, Math.max(1, pageSize));
      const safeOffset = Math.max(0, offset);
      const listSql = `
        SELECT id, part_number, fabricante, faixa_trabalho, unidade_leitura,
               categoria, diametro_montagem, posicao_montagem, conexao_instrumento,
               material_involucro, material_internos, visor, classe_exatidao,
               glicerina, tubo_sifao, selo_diafragma, contato_eletrico, valvula_isolamento,
               ncm, estoque, preco
        FROM produtos
        ${whereSql}
        ORDER BY fabricante ASC, part_number ASC
        LIMIT ${safeLimit} OFFSET ${safeOffset}
      `;
      const [rows] = await conn.execute(listSql, params);
      await conn.end();
      return {
        page,
        pageSize: safeLimit,
        total,
        items: rows
      };
    }
    return { error: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { error: error.message };
  }
});

const search$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: search
}, Symbol.toStringTag, { value: 'Module' }));

const registerCompany = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const config = useRuntimeConfig(event);
  const body = await readBody(event);
  try {
    const digits = String(body.cnpj).replace(/\D/g, "");
    if (digits.length !== 14) {
      return { success: false, message: "CNPJ inv\xE1lido. Informe 14 d\xEDgitos." };
    }
    const maskedCnpj = `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    const digitsOnly = digits;
    if (config.supabaseUrl && config.supabaseKey) {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data: existingCompany } = await supabase.from("empresas").select("id, cnpj").or(`cnpj.eq.${maskedCnpj},cnpj.eq.${digitsOnly}`).single();
      if (existingCompany) {
        return { success: false, message: "CNPJ j\xE1 cadastrado no sistema." };
      }
      const { data, error } = await supabase.from("empresas").insert({
        cnpj: maskedCnpj,
        razao_social: (_a = body.razao_social) == null ? void 0 : _a.toUpperCase(),
        email: body.email,
        filial: (_b = body.filial) == null ? void 0 : _b.toUpperCase()
      }).select().single();
      if (error) {
        return { success: false, message: error.message };
      }
      return { success: true, result: data };
    }
    if (config.dbHost && config.dbUser && config.dbPassword && config.dbDatabase) {
      const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbDatabase
      });
      try {
        const [existingRows] = await connection.execute(
          "SELECT id FROM empresas WHERE cnpj = ? OR cnpj = ?",
          [maskedCnpj, digitsOnly]
        );
        if (Array.isArray(existingRows) && existingRows.length > 0) {
          return { success: false, message: "CNPJ j\xE1 cadastrado no sistema." };
        }
        const [result] = await connection.execute(
          "INSERT INTO empresas (cnpj, razao_social, email, filial) VALUES (?, ?, ?, ?)",
          [maskedCnpj, (_c = body.razao_social) == null ? void 0 : _c.toUpperCase(), body.email, (_d = body.filial) == null ? void 0 : _d.toUpperCase()]
        );
        return { success: true, result };
      } finally {
        await connection.end();
      }
    }
    return { success: false, message: "Backend de dados n\xE3o configurado." };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

const registerCompany$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: registerCompany
}, Symbol.toStringTag, { value: 'Module' }));

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

const registerUser$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: registerUser
}, Symbol.toStringTag, { value: 'Module' }));

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

const sendEmail$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: sendEmail
}, Symbol.toStringTag, { value: 'Module' }));

const tableSchema = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const { tableName } = getQuery$1(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { error: "forbidden" };
  }
  if (!tableName) {
    return { error: "O nome da tabela \xE9 obrigat\xF3rio" };
  }
  const safeName = String(tableName).trim();
  if (!/^[A-Za-z0-9_]+$/.test(safeName)) {
    setResponseStatus(event, 400);
    return { error: "invalid_table_name" };
  }
  try {
    const connection = await createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbDatabase
    });
    const [rows] = await connection.execute(`DESCRIBE ${safeName}`);
    await connection.end();
    return { schema: rows };
  } catch (error) {
    return { error: error.message };
  }
});

const tableSchema$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: tableSchema
}, Symbol.toStringTag, { value: 'Module' }));

const testConnection = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const adminKey = String((config == null ? void 0 : config.adminKey) || "");
  const headerKey = String(getHeader(event, "x-admin-key") || "");
  if (!adminKey || headerKey !== adminKey) {
    setResponseStatus(event, 403);
    return { message: "forbidden" };
  }
  if (config.supabaseUrl && config.supabaseKey) {
    try {
      const supabase = createClient(config.supabaseUrl, config.supabaseKey);
      const { data, error } = await supabase.from("empresas").select("id").limit(1);
      if (!error) {
        return { message: "Conex\xE3o com o Supabase bem-sucedida!" };
      }
      return { message: "Falha na conex\xE3o com o Supabase.", error };
    } catch (error) {
      console.error("Erro ao conectar com o Supabase:", error);
      return { message: "Falha na conex\xE3o com o Supabase.", error };
    }
  }
  return { message: "Nenhum backend de dados configurado." };
});

const testConnection$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: testConnection
}, Symbol.toStringTag, { value: 'Module' }));

const profile_get = defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const query = getQuery$1(event);
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

const profile_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile_get
}, Symbol.toStringTag, { value: 'Module' }));

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

const profile$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: profile
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": !(opts.ssrContext.noSSR)
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer(ssrContext);
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
