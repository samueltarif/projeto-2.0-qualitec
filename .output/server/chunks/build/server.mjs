import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, toRef, isRef, ref, computed, watch, mergeProps, withCtx, unref, createVNode, toDisplayString, createTextVNode, hasInjectionContext, useAttrs, inject, Suspense, Fragment, useSSRContext, createApp, shallowReactive, resolveDynamicComponent, createBlock, renderSlot, openBlock, createCommentVNode, renderList, resolveDirective, withModifiers, withKeys, onErrorCaptured, onServerPrefetch, reactive, effectScope, isReadonly, isShallow, isReactive, toRaw, defineAsyncComponent, getCurrentScope } from 'vue';
import { v as hasProtocol, w as isScriptProtocol, q as joinURL, x as withQuery, y as sanitizeStatusCode, z as getContext, $ as $fetch$1, A as createHooks, B as executeAsync, h as getHeader, n as createError$1, C as toRouteMatcher, D as createRouter$1, E as defu, F as setCookie } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { RouterView, useRouter as useRouter$1, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderVNode, ssrRenderTeleport, ssrRenderList, ssrGetDirectiveProps, ssrGetDynamicModelProps, ssrRenderStyle, ssrRenderSuspense } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.1.3";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const _routes = [
  {
    name: "index",
    path: "/",
    component: () => import('./index-BuX8JVkf.mjs')
  },
  {
    name: "login",
    path: "/login",
    component: () => import('./login-CDQC_uyV.mjs')
  },
  {
    name: "comparar",
    path: "/comparar",
    component: () => import('./comparar-CjW9pDWw.mjs')
  },
  {
    name: "produtos",
    path: "/produtos",
    component: () => import('./produtos-DqVQwF-e.mjs')
  },
  {
    name: "demo-mobile",
    path: "/demo-mobile",
    component: () => import('./demo-mobile-CrZeaX0L.mjs')
  },
  {
    name: "teste-filtros",
    path: "/teste-filtros",
    component: () => import('./teste-filtros-C3XAXZOE.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      if (to.matched[to.matched.length - 1]?.components?.default === from.matched[from.matched.length - 1]?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
async function fetchWithRetry(req, init) {
  const retries = 3;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(req, init);
    } catch (error) {
      if (init?.signal?.aborted) {
        throw error;
      }
      if (attempt === retries) {
        console.error(`Error fetching request ${req}`, error, init);
        throw error;
      }
      console.warn(`Retrying fetch attempt ${attempt + 1} for request: ${req}`);
      await new Promise((resolve) => setTimeout(resolve, 100 * attempt));
    }
  }
  throw new Error("Unreachable code");
}
function setCookies(event, cookies) {
  const response = event.node.res;
  const headersWritable = () => !response.headersSent && !response.writableEnded;
  if (!headersWritable()) {
    return;
  }
  for (const { name, value, options } of cookies) {
    if (!headersWritable()) {
      break;
    }
    setCookie(event, name, value, options);
  }
}
const serverSupabaseClient = async (event) => {
  if (!event.context._supabaseClient) {
    const { url, key, cookiePrefix, cookieOptions, clientOptions: { auth = {}, global = {} } } = (/* @__PURE__ */ useRuntimeConfig()).public.supabase;
    event.context._supabaseClient = createServerClient(url, key, {
      auth,
      cookies: {
        getAll: () => parseCookieHeader(getHeader(event, "Cookie") ?? ""),
        setAll: (cookies) => setCookies(event, cookies)
      },
      cookieOptions: {
        ...cookieOptions,
        name: cookiePrefix
      },
      global: {
        fetch: fetchWithRetry,
        ...global
      }
    });
  }
  return event.context._supabaseClient;
};
const serverSupabaseUser = async (event) => {
  const client = await serverSupabaseClient(event);
  const { data, error } = await client.auth.getClaims();
  if (error) {
    throw createError$1({ statusMessage: error?.message });
  }
  return data?.claims ?? null;
};
const serverSupabaseSession = async (event) => {
  const client = await serverSupabaseClient(event);
  const { data: { session }, error } = await client.auth.getSession();
  if (error) {
    throw createError$1({ statusMessage: error?.message });
  }
  delete session?.user;
  return session;
};
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useSupabaseSession = () => useState("supabase_session", () => null);
const useSupabaseUser = () => useState("supabase_user", () => null);
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
const supabase_server_NZuw_NDm2ZtOgvg4QqXN_Xqdg_KPvGuBBWKrLH15GWY = /* @__PURE__ */ defineNuxtPlugin({
  name: "supabase",
  enforce: "pre",
  async setup({ provide: provide2 }) {
    let __temp, __restore;
    const { url, key, cookiePrefix, useSsrCookies, cookieOptions, clientOptions } = (/* @__PURE__ */ useRuntimeConfig()).public.supabase;
    const event = useRequestEvent();
    const client = createServerClient(url, key, {
      ...clientOptions,
      cookies: {
        getAll: () => parseCookieHeader(getHeader(event, "Cookie") ?? ""),
        setAll: (cookies) => setCookies(event, cookies)
      },
      cookieOptions: {
        ...cookieOptions,
        name: cookiePrefix
      },
      global: {
        fetch: fetchWithRetry,
        ...clientOptions.global
      }
    });
    provide2("supabase", { client });
    if (useSsrCookies) {
      const [
        session,
        user
      ] = ([__temp, __restore] = executeAsync(() => Promise.all([
        serverSupabaseSession(event).catch(() => null),
        serverSupabaseUser(event).catch(() => null)
      ])), __temp = await __temp, __restore(), __temp);
      useSupabaseSession().value = session;
      useSupabaseUser().value = user;
    }
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const unocss_6Z4vW7S9aX_q2svWbGBc_X2b5QbQdkNmvzr_3kqqCd0 = /* @__PURE__ */ defineNuxtPlugin(() => {
});
const __nuxt_component_0$2 = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const mask_8SPQv3AneNhMbFpdZL1OKGERWLnPvt6hHWjY3wVt69Q = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("mask", {
    mounted(el, binding) {
      const input = el instanceof HTMLInputElement ? el : el.querySelector("input");
      if (!input) return;
      const pattern = String(binding.value || "");
      if (!pattern || !pattern.includes("#")) {
        return;
      }
      const formatWithPattern = (raw) => {
        const digits = String(raw || "").replace(/\D/g, "");
        let out = "";
        let di = 0;
        for (let i = 0; i < pattern.length; i++) {
          const ch = pattern[i];
          if (ch === "#") {
            if (di < digits.length) {
              out += digits[di++];
            } else {
              break;
            }
          } else {
            out += ch;
          }
        }
        return out;
      };
      let updating = false;
      const handler = (e) => {
        const target = e.target;
        if (!target || updating) return;
        updating = true;
        const formatted = formatWithPattern(target.value || "");
        target.value = formatted;
        const ev = new Event("input", { bubbles: true });
        target.dispatchEvent(ev);
        updating = false;
      };
      input.addEventListener("input", handler);
      input.addEventListener("blur", handler);
      handler({ target: input });
      input.__maskCleanup = () => {
        input.removeEventListener("input", handler);
        input.removeEventListener("blur", handler);
      };
    },
    beforeUnmount(el) {
      const input = el instanceof HTMLInputElement ? el : el.querySelector("input");
      if (input && input.__maskCleanup) input.__maskCleanup();
    }
  });
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  supabase_server_NZuw_NDm2ZtOgvg4QqXN_Xqdg_KPvGuBBWKrLH15GWY,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8,
  unocss_6Z4vW7S9aX_q2svWbGBc_X2b5QbQdkNmvzr_3kqqCd0,
  mask_8SPQv3AneNhMbFpdZL1OKGERWLnPvt6hHWjY3wVt69Q
];
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_1$2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const storageKey = "theme-preference";
const currentTheme = ref("light");
function applyTheme(theme) {
  currentTheme.value = theme;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(storageKey, theme);
  }
}
function useTheme() {
  const setTheme = (theme) => applyTheme(theme);
  const toggleTheme = () => applyTheme(currentTheme.value === "dark" ? "light" : "dark");
  return {
    currentTheme,
    setTheme,
    toggleTheme
  };
}
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Span",
  __ssrInlineRender: true,
  props: {
    is: { default: "span" },
    size: { default: "md" },
    weight: { default: "medium" },
    class: {},
    variant: { default: "default" }
  },
  setup(__props) {
    const props = __props;
    const { currentTheme: currentTheme2 } = useTheme();
    const sizeClasses = {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base"
    };
    const weightClasses = {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    };
    const computedClass = computed(() => {
      return [
        "inline-flex items-center",
        sizeClasses[props.size],
        weightClasses[props.weight],
        props.class || ""
      ].join(" ");
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.is), mergeProps({ class: computedClass.value }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.variant === "themeIcon") {
              _push2(`<span class="flex items-center"${_scopeId}>`);
              if (unref(currentTheme2) !== "dark") {
                _push2(`<svg class="h-5 w-5 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.55)]" viewBox="0 0 24 24" fill="none" aria-hidden="true"${_scopeId}><defs${_scopeId}><radialGradient id="sunGrad" cx="50%" cy="50%" r="50%"${_scopeId}><stop offset="0%" stop-color="#FDBA74"${_scopeId}></stop><stop offset="100%" stop-color="#F59E0B"${_scopeId}></stop></radialGradient></defs><circle cx="12" cy="12" r="5" fill="url(#sunGrad)"${_scopeId}></circle><g stroke="#FDBA74" stroke-linecap="round" stroke-width="1.5"${_scopeId}><path d="M12 1.5v3"${_scopeId}></path><path d="M12 19.5v3"${_scopeId}></path><path d="M1.5 12h3"${_scopeId}></path><path d="M19.5 12h3"${_scopeId}></path><path d="M4.22 4.22l2.12 2.12"${_scopeId}></path><path d="M17.66 17.66l2.12 2.12"${_scopeId}></path><path d="M19.78 4.22l-2.12 2.12"${_scopeId}></path><path d="M6.34 17.66l-2.12 2.12"${_scopeId}></path></g></svg>`);
              } else {
                _push2(`<svg class="h-5 w-5 transition-transform duration-300 dark:drop-shadow-[0_0_14px_#39FF14]" viewBox="0 0 24 24" fill="none" aria-hidden="true"${_scopeId}><defs${_scopeId}><radialGradient id="moonGrad" cx="50%" cy="50%" r="50%"${_scopeId}><stop offset="0%" stop-color="#A7F3D0"${_scopeId}></stop><stop offset="100%" stop-color="#22D3EE"${_scopeId}></stop></radialGradient></defs><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="url(#moonGrad)"${_scopeId}></path><g fill="#CFFAFE"${_scopeId}><circle cx="7" cy="7" r="0.8"${_scopeId}></circle><circle cx="16" cy="5" r="0.6"${_scopeId}></circle><circle cx="18" cy="13" r="0.5"${_scopeId}></circle></g></svg>`);
              }
              _push2(`</span>`);
            } else {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            }
          } else {
            return [
              __props.variant === "themeIcon" ? (openBlock(), createBlock("span", {
                key: 0,
                class: "flex items-center"
              }, [
                unref(currentTheme2) !== "dark" ? (openBlock(), createBlock("svg", {
                  key: 0,
                  class: "h-5 w-5 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,0,0,0.55)]",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  "aria-hidden": "true"
                }, [
                  createVNode("defs", null, [
                    createVNode("radialGradient", {
                      id: "sunGrad",
                      cx: "50%",
                      cy: "50%",
                      r: "50%"
                    }, [
                      createVNode("stop", {
                        offset: "0%",
                        "stop-color": "#FDBA74"
                      }),
                      createVNode("stop", {
                        offset: "100%",
                        "stop-color": "#F59E0B"
                      })
                    ])
                  ]),
                  createVNode("circle", {
                    cx: "12",
                    cy: "12",
                    r: "5",
                    fill: "url(#sunGrad)"
                  }),
                  createVNode("g", {
                    stroke: "#FDBA74",
                    "stroke-linecap": "round",
                    "stroke-width": "1.5"
                  }, [
                    createVNode("path", { d: "M12 1.5v3" }),
                    createVNode("path", { d: "M12 19.5v3" }),
                    createVNode("path", { d: "M1.5 12h3" }),
                    createVNode("path", { d: "M19.5 12h3" }),
                    createVNode("path", { d: "M4.22 4.22l2.12 2.12" }),
                    createVNode("path", { d: "M17.66 17.66l2.12 2.12" }),
                    createVNode("path", { d: "M19.78 4.22l-2.12 2.12" }),
                    createVNode("path", { d: "M6.34 17.66l-2.12 2.12" })
                  ])
                ])) : (openBlock(), createBlock("svg", {
                  key: 1,
                  class: "h-5 w-5 transition-transform duration-300 dark:drop-shadow-[0_0_14px_#39FF14]",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  "aria-hidden": "true"
                }, [
                  createVNode("defs", null, [
                    createVNode("radialGradient", {
                      id: "moonGrad",
                      cx: "50%",
                      cy: "50%",
                      r: "50%"
                    }, [
                      createVNode("stop", {
                        offset: "0%",
                        "stop-color": "#A7F3D0"
                      }),
                      createVNode("stop", {
                        offset: "100%",
                        "stop-color": "#22D3EE"
                      })
                    ])
                  ]),
                  createVNode("path", {
                    d: "M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z",
                    fill: "url(#moonGrad)"
                  }),
                  createVNode("g", { fill: "#CFFAFE" }, [
                    createVNode("circle", {
                      cx: "7",
                      cy: "7",
                      r: "0.8"
                    }),
                    createVNode("circle", {
                      cx: "16",
                      cy: "5",
                      r: "0.6"
                    }),
                    createVNode("circle", {
                      cx: "18",
                      cy: "13",
                      r: "0.5"
                    })
                  ])
                ]))
              ])) : renderSlot(_ctx.$slots, "default", { key: 1 })
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Span.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const UiSpan = Object.assign(_sfc_main$r, { __name: "UiSpan" });
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "GradientButton",
  __ssrInlineRender: true,
  props: {
    borderWidth: { default: 2 },
    colors: { default: () => [
      "#FF0000",
      "#FFA500",
      "#FFFF00",
      "#008000",
      "#0000FF",
      "#4B0082",
      "#EE82EE",
      "#FF0000"
    ] },
    duration: { default: 2500 },
    borderRadius: { default: 8 },
    blur: { default: 4 },
    class: {},
    bgColor: { default: "rgba(0, 0, 0, 1)" },
    disabled: { type: Boolean },
    type: { default: "button" }
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    computed(() => `${props.duration}ms`);
    computed(() => props.colors.join(", "));
    computed(() => `${props.borderWidth}px`);
    computed(() => `${props.borderRadius}px`);
    computed(() => `${props.blur}px`);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSpan = UiSpan;
      _push(`<button${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
        type: props.type,
        disabled: props.disabled,
        class: unref(cn)(
          "inline-flex items-center justify-center bg-transparent p-0 m-0 disabled:opacity-60 disabled:cursor-not-allowed",
          props.class
        )
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiSpan, { class: "inline-flex items-center" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</button>`);
    };
  }
});
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GradientButton.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const GradientButton = Object.assign(_sfc_main$q, { __name: "GradientButton" });
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "ThemeToggle",
  __ssrInlineRender: true,
  setup(__props) {
    const { toggleTheme, currentTheme: currentTheme2 } = useTheme();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(GradientButton, mergeProps({
        type: "button",
        onClick: ($event) => unref(toggleTheme)(),
        class: "inline-flex items-center gap-2 px-3 py-2 text-sm",
        "aria-pressed": unref(currentTheme2) === "dark",
        "aria-label": "Alternar tema"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(UiSpan, {
              size: "md",
              weight: "medium",
              class: "flex items-center",
              variant: "themeIcon"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(UiSpan, {
                size: "md",
                weight: "medium",
                class: "flex items-center",
                variant: "themeIcon"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ThemeToggle.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const ThemeToggle = Object.assign(_sfc_main$p, { __name: "UiThemeToggle" });
const items$1 = ref([]);
function add$1(product, qty = 1) {
  if (!product || product.id == null) return { ok: false, reason: "invalid" };
  const found = items$1.value.find((p) => p.id === product.id);
  if (found) {
    found.quantity += Math.max(1, qty);
  } else {
    items$1.value.push({
      id: product.id,
      title: product.title,
      brand: product.brand,
      categoria: product.categoria,
      diametro_montagem: product.diametro_montagem,
      conexao_instrumento: product.conexao_instrumento,
      faixa_trabalho: product.faixa_trabalho,
      unidade_leitura: product.unidade_leitura,
      quantity: Math.max(1, qty)
    });
  }
  return { ok: true };
}
function decrement(id, qty = 1) {
  const found = items$1.value.find((p) => p.id === id);
  if (!found) return;
  found.quantity = Math.max(0, found.quantity - Math.max(1, qty));
  if (found.quantity === 0) items$1.value = items$1.value.filter((p) => p.id !== id);
}
function remove$1(id) {
  items$1.value = items$1.value.filter((p) => p.id !== id);
}
function clear() {
  items$1.value = [];
}
const count$1 = computed(() => items$1.value.reduce((sum, p) => sum + (p.quantity || 0), 0));
const has$1 = (id) => items$1.value.some((p) => p.id === id);
function setQuantity(id, qty) {
  const found = items$1.value.find((p) => p.id === id);
  if (!found) return;
  found.quantity = Math.max(1, Number.isFinite(qty) ? qty : 1);
}
function setNotes(id, notes) {
  const found = items$1.value.find((p) => p.id === id);
  if (!found) return;
  found.notes = String(notes ?? "");
}
function useCart() {
  return { items: items$1, add: add$1, remove: remove$1, decrement, clear, count: count$1, has: has$1, setQuantity, setNotes };
}
const counter = ref(0);
const isOpen = computed(() => counter.value > 0);
function open() {
  counter.value += 1;
}
function close() {
  counter.value = Math.max(0, counter.value - 1);
}
function set(openState) {
  counter.value = openState ? Math.max(1, counter.value) : 0;
}
watch(isOpen, (v) => {
  try {
    const cls = "overlay-open";
    if (v) (void 0).body.classList.add(cls);
    else (void 0).body.classList.remove(cls);
  } catch (_) {
  }
});
function useOverlay() {
  return { overlayOpen: isOpen, open, close, set };
}
const defaultPanel = "relative z-10 bg-white dark:bg-neutral-900 shadow-xl rounded-lg border border-neutral-200 dark:border-neutral-800";
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "UiModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    withBackdrop: { type: Boolean, default: true },
    closeOnBackdrop: { type: Boolean, default: true },
    closeOnEsc: { type: Boolean, default: true },
    showCloseButton: { type: Boolean, default: true },
    closeButtonLabel: { default: "Fechar" },
    closeButtonPlacement: { default: "right" },
    ariaLabel: { default: "Modal" },
    panelClass: {},
    affectsHeader: { type: Boolean, default: true }
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const panelClasses = [defaultPanel, props.panelClass].filter(Boolean).join(" ");
    const closePos = props.closeButtonPlacement === "left" ? "left-3" : "right-3";
    const closeButtonClasses = ["absolute", "top-3", closePos, "z-50", "rounded-md", "px-3", "py-1", "text-sm", "bg-neutral-100", "dark:bg-neutral-800", "hover:bg-neutral-200", "dark:hover:bg-neutral-700"].join(" ");
    const { open: overlayOpen, close: overlayClose } = useOverlay();
    watch(() => props.visible, (v) => {
      if (!props.affectsHeader) return;
      if (v) overlayOpen();
      else overlayClose();
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.visible) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.ariaLabel)} data-v-c3a7d1fa>`);
          if (__props.withBackdrop) {
            _push2(`<div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-v-c3a7d1fa></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<div class="${ssrRenderClass(unref(panelClasses))}" data-v-c3a7d1fa>`);
          if (__props.showCloseButton) {
            _push2(`<button type="button" class="${ssrRenderClass(unref(closeButtonClasses))}" data-v-c3a7d1fa>${ssrInterpolate(__props.closeButtonLabel)}</button>`);
          } else {
            _push2(`<!---->`);
          }
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent);
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UiModal.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const UiModal = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$o, [["__scopeId", "data-v-c3a7d1fa"]]), { __name: "UiModal" });
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "UiTextarea",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    placeholder: {},
    rows: { default: 3 },
    label: {},
    disabled: { type: Boolean, default: false },
    maxLength: {},
    class: {},
    ariaLabel: { default: "Campo de observações" }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const wrapperClass = ["w-full", props.class].filter(Boolean).join(" ");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: unref(wrapperClass) }, _attrs))}>`);
      if (__props.label) {
        _push(`<label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<textarea${ssrRenderAttr("rows", __props.rows)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("maxlength", __props.maxLength)} class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"${ssrRenderAttr("aria-label", __props.ariaLabel)}>${ssrInterpolate(__props.modelValue)}</textarea>`);
      if (__props.maxLength) {
        _push(`<div class="mt-1 text-[11px] text-neutral-500 dark:text-neutral-400">${ssrInterpolate(__props.modelValue?.length || 0)} / ${ssrInterpolate(__props.maxLength)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UiTextarea.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const __nuxt_component_1$1 = Object.assign(_sfc_main$n, { __name: "UiTextarea" });
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "ProductDetailsModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    product: {}
  },
  emits: ["close", "add-cart", "download-pdf"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const qty = ref(1);
    function increment() {
      qty.value = Math.min(9999, qty.value + 1);
    }
    function decrement2() {
      qty.value = Math.max(1, qty.value - 1);
    }
    function onQtyInput(e) {
      const val = Number(e.target.value || "1");
      qty.value = isNaN(val) ? 1 : Math.max(1, Math.min(9999, Math.floor(val)));
    }
    function formatBool(v) {
      return Number(v) === 1 ? "SIM" : "NÃO";
    }
    function formatCerts(certs) {
      try {
        if (!certs) return "—";
        const arr = Array.isArray(certs) ? certs : JSON.parse(String(certs));
        return Array.isArray(arr) && arr.length ? arr.join(", ") : "—";
      } catch {
        return "—";
      }
    }
    function emitClose() {
      emit("close");
    }
    function emitAddToCart() {
      emit("add-cart", qty.value);
    }
    function emitDownloadPdf() {
      emit("download-pdf");
    }
    const SpecRow = defineComponent({
      name: "SpecRow",
      props: { label: { type: String, required: true }, value: { type: String, default: "—" } },
      setup(p) {
        return () => h("div", null, [
          h("label", { class: "block text-xs text-neutral-500 dark:text-neutral-400" }, p.label),
          h("div", { class: "mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100" }, p.value || "—")
        ]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(UiModal, mergeProps({
        visible: __props.visible,
        "with-backdrop": true,
        "close-on-backdrop": true,
        "close-on-esc": true,
        "show-close-button": true,
        "close-button-label": "×",
        "aria-label": "Detalhes do Produto",
        "panel-class": "w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md",
        "affects-header": false,
        onClose: emitClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100"${_scopeId}>Detalhes do Produto</h2></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm"${_scopeId}><div${_scopeId}><div class="text-neutral-500 dark:text-neutral-400"${_scopeId}>SKU:</div><div class="mt-1 font-medium text-neutral-800 dark:text-neutral-100"${_scopeId}>${ssrInterpolate(__props.product.part_number || __props.product.id)}</div></div><div${_scopeId}><div class="text-neutral-500 dark:text-neutral-400"${_scopeId}>Categoria:</div><div class="mt-1"${_scopeId}><span class="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300"${_scopeId}>${ssrInterpolate(__props.product.categoria || "—")}</span></div></div></div><div class="text-sm text-neutral-700 dark:text-neutral-200"${_scopeId}>${ssrInterpolate(__props.product.tipo_medicao || __props.product.fabricante || "—")}</div><div${_scopeId}><div class="text-base font-semibold text-neutral-900 dark:text-neutral-100"${_scopeId}>Especificações Técnicas</div><div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Faixa de Pressão",
              value: __props.product.faixa_trabalho
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Diâmetro",
              value: __props.product.diametro_montagem
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Conexão",
              value: __props.product.conexao_instrumento
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Precisão",
              value: __props.product.classe_exatidao
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Tipo de Medição",
              value: __props.product.tipo_medicao
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Posição de Montagem",
              value: __props.product.posicao_montagem
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Visor",
              value: __props.product.visor
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Material dos Internos",
              value: __props.product.material_internos
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Unidade de Leitura",
              value: __props.product.unidade_leitura
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Enchimento de Glicerina",
              value: formatBool(__props.product.glicerina)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Tubo Sifão",
              value: formatBool(__props.product.tubo_sifao)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Contato Elétrico",
              value: formatBool(__props.product.contato_eletrico)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Selo Diafragma",
              value: formatBool(__props.product.selo_diafragma)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Válvula de Isolamento",
              value: formatBool(__props.product.valvula_isolamento)
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SpecRow), {
              label: "Certificados",
              value: formatCerts(__props.product.certificados)
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div${_scopeId}><div class="text-base font-semibold text-neutral-900 dark:text-neutral-100"${_scopeId}>Quantidade</div><div class="mt-2 flex items-center gap-3"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><button type="button" class="rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"${_scopeId}>−</button><input type="number" min="1"${ssrRenderAttr("value", qty.value)} class="w-24 text-center rounded-md border px-2 py-1 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"${_scopeId}><button type="button" class="rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"${_scopeId}>+</button></div></div><div class="mt-4 flex flex-wrap items-center gap-3"${_scopeId}><button type="button" class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-sm" aria-label="Adicionar ao Carrinho"${_scopeId}><span class="i-lucide-shopping-cart"${_scopeId}></span> Adicionar ao Carrinho </button><button type="button" class="inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Download PDF Técnico"${_scopeId}><span class="i-lucide-file-down"${_scopeId}></span> Download PDF Técnico </button></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("h2", { class: "text-2xl font-bold text-neutral-900 dark:text-neutral-100" }, "Detalhes do Produto")
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" }, [
                  createVNode("div", null, [
                    createVNode("div", { class: "text-neutral-500 dark:text-neutral-400" }, "SKU:"),
                    createVNode("div", { class: "mt-1 font-medium text-neutral-800 dark:text-neutral-100" }, toDisplayString(__props.product.part_number || __props.product.id), 1)
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "text-neutral-500 dark:text-neutral-400" }, "Categoria:"),
                    createVNode("div", { class: "mt-1" }, [
                      createVNode("span", { class: "inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:text-blue-300" }, toDisplayString(__props.product.categoria || "—"), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "text-sm text-neutral-700 dark:text-neutral-200" }, toDisplayString(__props.product.tipo_medicao || __props.product.fabricante || "—"), 1),
                createVNode("div", null, [
                  createVNode("div", { class: "text-base font-semibold text-neutral-900 dark:text-neutral-100" }, "Especificações Técnicas"),
                  createVNode("div", { class: "mt-3 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode(unref(SpecRow), {
                      label: "Faixa de Pressão",
                      value: __props.product.faixa_trabalho
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Diâmetro",
                      value: __props.product.diametro_montagem
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Conexão",
                      value: __props.product.conexao_instrumento
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Precisão",
                      value: __props.product.classe_exatidao
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Tipo de Medição",
                      value: __props.product.tipo_medicao
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Posição de Montagem",
                      value: __props.product.posicao_montagem
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Visor",
                      value: __props.product.visor
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Material dos Internos",
                      value: __props.product.material_internos
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Unidade de Leitura",
                      value: __props.product.unidade_leitura
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Enchimento de Glicerina",
                      value: formatBool(__props.product.glicerina)
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Tubo Sifão",
                      value: formatBool(__props.product.tubo_sifao)
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Contato Elétrico",
                      value: formatBool(__props.product.contato_eletrico)
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Selo Diafragma",
                      value: formatBool(__props.product.selo_diafragma)
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Válvula de Isolamento",
                      value: formatBool(__props.product.valvula_isolamento)
                    }, null, 8, ["value"]),
                    createVNode(unref(SpecRow), {
                      label: "Certificados",
                      value: formatCerts(__props.product.certificados)
                    }, null, 8, ["value"])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "text-base font-semibold text-neutral-900 dark:text-neutral-100" }, "Quantidade"),
                  createVNode("div", { class: "mt-2 flex items-center gap-3" }, [
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode("button", {
                        type: "button",
                        class: "rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        onClick: decrement2
                      }, "−"),
                      createVNode("input", {
                        type: "number",
                        min: "1",
                        value: qty.value,
                        onInput: ($event) => onQtyInput($event),
                        class: "w-24 text-center rounded-md border px-2 py-1 text-sm bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                      }, null, 40, ["value", "onInput"]),
                      createVNode("button", {
                        type: "button",
                        class: "rounded-md border px-2 py-1 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        onClick: increment
                      }, "+")
                    ])
                  ]),
                  createVNode("div", { class: "mt-4 flex flex-wrap items-center gap-3" }, [
                    createVNode("button", {
                      type: "button",
                      class: "inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow-sm",
                      onClick: emitAddToCart,
                      "aria-label": "Adicionar ao Carrinho"
                    }, [
                      createVNode("span", { class: "i-lucide-shopping-cart" }),
                      createTextVNode(" Adicionar ao Carrinho ")
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                      onClick: emitDownloadPdf,
                      "aria-label": "Download PDF Técnico"
                    }, [
                      createVNode("span", { class: "i-lucide-file-down" }),
                      createTextVNode(" Download PDF Técnico ")
                    ])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductDetailsModal.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const ProductDetailsModal = Object.assign(_sfc_main$m, { __name: "ProductDetailsModal" });
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "UiDetailsButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Detalhes" },
    ariaLabel: { default: "Ver detalhes" },
    class: {},
    item: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const classes = [
      "text-blue-600 hover:text-blue-700 dark:text-blue-400",
      "text-sm transition-colors",
      props.class || ""
    ].join(" ");
    const visible = ref(false);
    const product = ref(null);
    ref(false);
    const { add: addCart } = useCart();
    function onAddCart(qty) {
      if (!product.value) return;
      const p = product.value;
      const id = p.id ?? p.part_number;
      const title = p.titulo ?? p.nome ?? p.descricao ?? p.part_number ?? `Produto ${id ?? ""}`;
      const brand = p.fabricante ?? "QUALITEC";
      addCart({ id, title, brand, categoria: p.categoria, diametro_montagem: p.diametro_montagem, conexao_instrumento: p.conexao_instrumento, faixa_trabalho: p.faixa_trabalho, unidade_leitura: p.unidade_leitura }, Math.max(1, qty));
    }
    function onDownloadPdf() {
      try {
        const imgs = product.value?.imagens;
        const parsed = Array.isArray(imgs) ? imgs : imgs ? JSON.parse(String(imgs)) : [];
        const pdfUrl = Array.isArray(parsed) ? parsed.find((x) => typeof x === "string" && x.toLowerCase().endsWith(".pdf")) : parsed?.pdf;
        if (pdfUrl) {
          (void 0).open(String(pdfUrl), "_blank");
        }
      } catch (_) {
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button type="button" class="${ssrRenderClass(unref(classes))}"${ssrRenderAttr("aria-label", __props.ariaLabel)}${ssrRenderAttr("title", __props.ariaLabel)}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.label)}`);
      }, _push, _parent);
      _push(`</button>`);
      if (product.value) {
        _push(ssrRenderComponent(ProductDetailsModal, {
          visible: visible.value,
          product: product.value,
          onClose: ($event) => visible.value = false,
          onAddCart,
          onDownloadPdf
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiDetailsButton.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const UiDetailsButton = Object.assign(_sfc_main$l, { __name: "UiDetailsButton" });
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "UiRemoveTextButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Remover" },
    ariaLabel: { default: "Remover item" },
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const classes = [
      "text-red-500 hover:text-red-600",
      "text-sm transition-colors",
      props.class || ""
    ].join(" ");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: unref(classes),
        "aria-label": __props.ariaLabel,
        title: __props.ariaLabel
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, () => {
        _push(`${ssrInterpolate(__props.label)}`);
      }, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiRemoveTextButton.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const UiRemoveTextButton = Object.assign(_sfc_main$k, { __name: "UiRemoveTextButton" });
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "RainbowButton",
  __ssrInlineRender: true,
  props: {
    class: {},
    is: { default: "button" },
    speed: { default: 2 },
    type: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    const speedInSeconds = computed(() => `${props.speed}s`);
    return (_ctx, _push, _parent, _attrs) => {
      const _cssVars = { style: {
        ":--v0f20da84": speedInSeconds.value
      } };
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(__props.is), mergeProps({
        type: __props.type,
        class: unref(cn)(
          "rainbow-button",
          // Layout básico e visual de botão
          "group relative inline-flex h-11 cursor-pointer select-none items-center justify-center rounded-xl px-8 py-2 font-medium",
          // Borda gradiente e preenchimento claro/escuro
          "bg-[length:200%] [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent]",
          "bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          "dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))]",
          // Texto
          "text-neutral-900 dark:text-neutral-100",
          // Feedback visual: sombra, transição e hover/active
          "shadow-sm transition-transform transition-shadow ease-out duration-200",
          "hover:shadow-md hover:-translate-y-[1px] active:translate-y-[1px] hover:brightness-110",
          // Acessibilidade
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
          // Estados
          "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
          // Glow inferior sutil
          "before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:bg-[linear-gradient(90deg,var(--color-1),var(--color-5),var(--color-3),var(--color-4),var(--color-2))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))]",
          props.class
        )
      }, _attrs, _cssVars), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/RainbowButton.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const RainbowButton = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$j, [["__scopeId", "data-v-84c5fe7e"]]), { __name: "UiRainbowButton" });
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "UiClearCartButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Limpar Carrinho" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedClass = computed(() => [
      "inline-flex items-center gap-2 px-4 py-2 text-sm !text-black dark:!text-white",
      "disabled:opacity-60 disabled:cursor-not-allowed",
      props.class || ""
    ].join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        is: "button",
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        class: computedClass.value,
        onClick: ($event) => emit("click"),
        "aria-label": "Limpar Carrinho"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.showIcon && !__props.loading) {
              _push2(`<span class="i-lucide-recycle"${_scopeId}></span>`);
            } else if (__props.loading) {
              _push2(`<span class="i-lucide-loader-2 animate-spin"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              __props.showIcon && !__props.loading ? (openBlock(), createBlock("span", {
                key: 0,
                class: "i-lucide-recycle"
              })) : __props.loading ? (openBlock(), createBlock("span", {
                key: 1,
                class: "i-lucide-loader-2 animate-spin"
              })) : createCommentVNode("", true),
              createVNode("span", { class: "font-medium" }, toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiClearCartButton.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const UiClearCartButton = Object.assign(_sfc_main$i, { __name: "UiClearCartButton" });
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "UiSendOrderButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Enviar Pedido" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedClass = computed(() => [
      "inline-flex items-center gap-2 px-4 py-2 text-sm !text-black dark:!text-white",
      "disabled:opacity-60 disabled:cursor-not-allowed",
      props.class || ""
    ].join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        is: "button",
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        class: computedClass.value,
        onClick: ($event) => emit("click"),
        "aria-label": "Enviar Pedido"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.showIcon && !__props.loading) {
              _push2(`<span class="i-lucide-rocket"${_scopeId}></span>`);
            } else if (__props.loading) {
              _push2(`<span class="i-lucide-loader-2 animate-spin"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              __props.showIcon && !__props.loading ? (openBlock(), createBlock("span", {
                key: 0,
                class: "i-lucide-rocket"
              })) : __props.loading ? (openBlock(), createBlock("span", {
                key: 1,
                class: "i-lucide-loader-2 animate-spin"
              })) : createCommentVNode("", true),
              createVNode("span", { class: "font-medium" }, toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiSendOrderButton.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const UiSendOrderButton = Object.assign(_sfc_main$h, { __name: "UiSendOrderButton" });
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "UiDownloadButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Download" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedClass = computed(() => [
      "inline-flex items-center gap-2 px-4 py-2 text-sm !text-black dark:!text-white",
      "disabled:opacity-60 disabled:cursor-not-allowed",
      props.class || ""
    ].join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        is: "button",
        type: __props.type,
        disabled: __props.disabled || __props.loading,
        class: computedClass.value,
        onClick: ($event) => emit("click"),
        "aria-label": "Download"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.showIcon && !__props.loading) {
              _push2(`<span class="i-lucide-download"${_scopeId}></span>`);
            } else if (__props.loading) {
              _push2(`<span class="i-lucide-loader-2 animate-spin"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              __props.showIcon && !__props.loading ? (openBlock(), createBlock("span", {
                key: 0,
                class: "i-lucide-download"
              })) : __props.loading ? (openBlock(), createBlock("span", {
                key: 1,
                class: "i-lucide-loader-2 animate-spin"
              })) : createCommentVNode("", true),
              createVNode("span", { class: "font-medium" }, toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiDownloadButton.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const UiDownloadButton = Object.assign(_sfc_main$g, { __name: "UiDownloadButton" });
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: "text"
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<input${ssrRenderAttrs(mergeProps({
        type: __props.type,
        value: __props.modelValue,
        placeholder: __props.placeholder,
        class: "input-base block w-full rounded-lg border p-2.5 focus:border-primary focus:ring-primary",
        required: __props.required
      }, _attrs))}>`);
    };
  }
});
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Input.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$f, { __name: "UiInput" });
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "OrderEmailModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean },
    orderPayload: {}
  },
  emits: ["close", "sent"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const subject = ref("Pedido Qualitec");
    const message = ref("Segue o pedido Qualitec em anexo.");
    const extras = ref("");
    const loading = ref(false);
    const feedback = ref(null);
    const autoSent = ref(false);
    function emitClose() {
      emit("close");
    }
    async function onSend() {
      feedback.value = null;
      const s = subject.value.trim();
      const m = message.value.trim();
      if (!s || !m) {
        feedback.value = { success: false, message: "Preencha o assunto e a mensagem." };
        emit("sent", feedback.value);
        return;
      }
      loading.value = true;
      try {
        const base = "vendas2@qualitec.ind.br";
        const extra = extras.value.trim();
        const to = extra ? `${base}, ${extra}` : base;
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": "qualitec-admin-2024"
          },
          body: JSON.stringify({ subject: s, message: m, to, order: props.orderPayload })
        });
        const data = await res.json();
        if (data.success) {
          feedback.value = { success: true, message: "Email enviado com sucesso!" };
        } else {
          feedback.value = { success: false, message: data.message || "Falha ao enviar email." };
        }
        emit("sent", feedback.value);
      } catch (e) {
        feedback.value = { success: false, message: e?.message || "Erro ao enviar." };
        emit("sent", feedback.value);
      } finally {
        loading.value = false;
      }
    }
    watch(() => props.visible, async (isOpen2) => {
      if (!isOpen2 || autoSent.value) return;
      autoSent.value = true;
      feedback.value = null;
      const s = subject.value.trim() || "Pedido Qualitec";
      const m = message.value.trim() || "Segue o pedido Qualitec em anexo.";
      try {
        const res = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": "qualitec-admin-2024"
          },
          body: JSON.stringify({ subject: s, message: m, to: "vendas2@qualitec.ind.br", order: props.orderPayload })
        });
        const data = await res.json();
        if (data.success) {
          feedback.value = { success: true, message: "Enviado automaticamente para vendas2@qualitec.ind.br." };
          emit("sent", feedback.value);
        } else {
          feedback.value = { success: false, message: data.message || "Falha no envio automático." };
        }
      } catch (e) {
        feedback.value = { success: false, message: e?.message || "Erro no envio automático." };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(UiModal, mergeProps({
        visible: __props.visible,
        "with-backdrop": true,
        "close-on-backdrop": true,
        "close-on-esc": true,
        "show-close-button": true,
        "close-button-label": "×",
        "aria-label": "Enviar por Email",
        "panel-class": "w-full max-w-md p-4 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md",
        onClose: emitClose
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4 text-sm" data-v-faecaff9${_scopeId}><h2 class="text-lg font-semibold" data-v-faecaff9${_scopeId}>Enviar por Email</h2><div class="rounded-md border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30 p-3" data-v-faecaff9${_scopeId}><div class="flex items-start gap-2" data-v-faecaff9${_scopeId}><span class="i-lucide-info text-blue-600 dark:text-blue-300 mt-0.5" data-v-faecaff9${_scopeId}></span><div data-v-faecaff9${_scopeId}><div class="font-semibold text-blue-700 dark:text-blue-300" data-v-faecaff9${_scopeId}>Envio Automático</div><p class="mt-1 text-blue-700/90 dark:text-blue-200/90" data-v-faecaff9${_scopeId}> O pedido será enviado automaticamente para <span class="font-medium" data-v-faecaff9${_scopeId}>vendas2@qualitec.ind.br</span> com os dados de login da sua empresa. Você pode adicionar destinatários extras abaixo. </p></div></div></div><div data-v-faecaff9${_scopeId}><label class="mb-1 block text-xs label" data-v-faecaff9${_scopeId}>Destinatários Extras (opcional, até 9 adicionais, separados por vírgula)</label>`);
            _push2(ssrRenderComponent(__nuxt_component_0, {
              modelValue: extras.value,
              "onUpdate:modelValue": ($event) => extras.value = $event,
              placeholder: "email1@exemplo.com, email2@exemplo.com (opcional)"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-faecaff9${_scopeId}><label class="mb-1 block text-xs label" data-v-faecaff9${_scopeId}>Assunto</label>`);
            _push2(ssrRenderComponent(__nuxt_component_0, {
              modelValue: subject.value,
              "onUpdate:modelValue": ($event) => subject.value = $event,
              placeholder: "Pedido Qualitec"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-faecaff9${_scopeId}><label class="mb-1 block text-xs label" data-v-faecaff9${_scopeId}>Mensagem</label>`);
            _push2(ssrRenderComponent(__nuxt_component_1$1, {
              modelValue: message.value,
              "onUpdate:modelValue": ($event) => message.value = $event,
              rows: 4,
              placeholder: "Digite sua mensagem..."
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="rounded-md border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30 p-3 text-green-700 dark:text-green-300" data-v-faecaff9${_scopeId}><div class="flex items-center gap-2" data-v-faecaff9${_scopeId}><span class="i-lucide-check-circle" data-v-faecaff9${_scopeId}></span><span data-v-faecaff9${_scopeId}>PDF do pedido anexado neste email</span></div></div><div class="mt-2 flex justify-end gap-2" data-v-faecaff9${_scopeId}><button type="button" class="px-3 py-2 rounded-md border text-sm"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} data-v-faecaff9${_scopeId}>Cancelar</button>`);
            _push2(ssrRenderComponent(RainbowButton, {
              type: "button",
              onClick: onSend,
              disabled: loading.value,
              class: "inline-flex items-center gap-2 h-10 px-4 rounded-md before:hidden !text-black dark:!text-white shadow-sm hover:shadow-md",
              "aria-label": "Enviar Email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!loading.value) {
                    _push3(`<span class="i-lucide-send" data-v-faecaff9${_scopeId2}></span>`);
                  } else {
                    _push3(`<span class="i-lucide-loader-2 animate-spin" data-v-faecaff9${_scopeId2}></span>`);
                  }
                  _push3(`<span class="font-medium" data-v-faecaff9${_scopeId2}>${ssrInterpolate(loading.value ? "Enviando..." : "Enviar Email")}</span>`);
                } else {
                  return [
                    !loading.value ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "i-lucide-send"
                    })) : (openBlock(), createBlock("span", {
                      key: 1,
                      class: "i-lucide-loader-2 animate-spin"
                    })),
                    createVNode("span", { class: "font-medium" }, toDisplayString(loading.value ? "Enviando..." : "Enviar Email"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (feedback.value) {
              _push2(`<div class="${ssrRenderClass([feedback.value.success ? "text-green-700" : "text-red-700", "text-xs"])}" data-v-faecaff9${_scopeId}>${ssrInterpolate(feedback.value.message)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4 text-sm" }, [
                createVNode("h2", { class: "text-lg font-semibold" }, "Enviar por Email"),
                createVNode("div", { class: "rounded-md border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/30 p-3" }, [
                  createVNode("div", { class: "flex items-start gap-2" }, [
                    createVNode("span", { class: "i-lucide-info text-blue-600 dark:text-blue-300 mt-0.5" }),
                    createVNode("div", null, [
                      createVNode("div", { class: "font-semibold text-blue-700 dark:text-blue-300" }, "Envio Automático"),
                      createVNode("p", { class: "mt-1 text-blue-700/90 dark:text-blue-200/90" }, [
                        createTextVNode(" O pedido será enviado automaticamente para "),
                        createVNode("span", { class: "font-medium" }, "vendas2@qualitec.ind.br"),
                        createTextVNode(" com os dados de login da sua empresa. Você pode adicionar destinatários extras abaixo. ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "mb-1 block text-xs label" }, "Destinatários Extras (opcional, até 9 adicionais, separados por vírgula)"),
                  createVNode(__nuxt_component_0, {
                    modelValue: extras.value,
                    "onUpdate:modelValue": ($event) => extras.value = $event,
                    placeholder: "email1@exemplo.com, email2@exemplo.com (opcional)"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "mb-1 block text-xs label" }, "Assunto"),
                  createVNode(__nuxt_component_0, {
                    modelValue: subject.value,
                    "onUpdate:modelValue": ($event) => subject.value = $event,
                    placeholder: "Pedido Qualitec"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", null, [
                  createVNode("label", { class: "mb-1 block text-xs label" }, "Mensagem"),
                  createVNode(__nuxt_component_1$1, {
                    modelValue: message.value,
                    "onUpdate:modelValue": ($event) => message.value = $event,
                    rows: 4,
                    placeholder: "Digite sua mensagem..."
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                createVNode("div", { class: "rounded-md border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/30 p-3 text-green-700 dark:text-green-300" }, [
                  createVNode("div", { class: "flex items-center gap-2" }, [
                    createVNode("span", { class: "i-lucide-check-circle" }),
                    createVNode("span", null, "PDF do pedido anexado neste email")
                  ])
                ]),
                createVNode("div", { class: "mt-2 flex justify-end gap-2" }, [
                  createVNode("button", {
                    type: "button",
                    class: "px-3 py-2 rounded-md border text-sm",
                    onClick: emitClose,
                    disabled: loading.value
                  }, "Cancelar", 8, ["disabled"]),
                  createVNode(RainbowButton, {
                    type: "button",
                    onClick: onSend,
                    disabled: loading.value,
                    class: "inline-flex items-center gap-2 h-10 px-4 rounded-md before:hidden !text-black dark:!text-white shadow-sm hover:shadow-md",
                    "aria-label": "Enviar Email"
                  }, {
                    default: withCtx(() => [
                      !loading.value ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "i-lucide-send"
                      })) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "i-lucide-loader-2 animate-spin"
                      })),
                      createVNode("span", { class: "font-medium" }, toDisplayString(loading.value ? "Enviando..." : "Enviar Email"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                feedback.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: ["text-xs", feedback.value.success ? "text-green-700" : "text-red-700"]
                }, toDisplayString(feedback.value.message), 3)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OrderEmailModal.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const OrderEmailModal = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$e, [["__scopeId", "data-v-faecaff9"]]), { __name: "OrderEmailModal" });
const email$1 = ref("");
const empresaId$1 = ref(null);
const fullName = ref("");
const sector = ref("");
const whatsapp = ref("");
function save() {
  return;
}
function setEmail(e) {
  email$1.value = e || "";
}
function setEmpresaId(id) {
  const val = typeof id === "number" && Number.isFinite(id) ? id : null;
  empresaId$1.value = val;
}
const whatsappDigits = computed(() => (whatsapp.value || "").replace(/\D/g, ""));
const isComplete = computed(() => {
  return fullName.value.trim().length >= 3 && sector.value.trim().length >= 2 && whatsappDigits.value.length === 13;
});
const isIncomplete = computed(() => !isComplete.value);
function saveProfile(payload) {
  fullName.value = (payload.fullName || "").trim();
  sector.value = (payload.sector || "").trim();
  whatsapp.value = (payload.whatsapp || "").trim();
}
async function refreshFromServer() {
  const e = (email$1.value || "").trim();
  const emp = empresaId$1.value;
  if (!e || emp == null || !Number.isFinite(emp)) return;
  try {
    const params = new URLSearchParams({ email: e, empresaId: String(emp) });
    const resp = await fetch(`/api/user/profile?${params.toString()}`);
    const data = await resp.json();
    if (data?.success && data?.profile) {
      fullName.value = String(data.profile.fullName || "");
      sector.value = String(data.profile.sector || "");
      whatsapp.value = String(data.profile.whatsapp || "");
      save();
    }
  } catch (_) {
  }
}
function useUserProfile() {
  return { email: email$1, empresaId: empresaId$1, fullName, sector, whatsapp, isComplete, isIncomplete, setEmail, setEmpresaId, saveProfile, refreshFromServer };
}
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "CartModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close", "details"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { items: items2, count: count2, remove: remove2, clear: clear2, setQuantity: setQuantity2, setNotes: setNotes2 } = useCart();
    const router = useRouter$1();
    const showSendEmail = ref(false);
    const profile = useUserProfile();
    const orderPayload = computed(() => ({
      items: items2?.value ?? items2,
      user: {
        email: profile.email?.value ?? "",
        fullName: profile.fullName?.value ?? "",
        sector: profile.sector?.value ?? "",
        whatsapp: profile.whatsapp?.value ?? ""
      },
      empresaId: profile.empresaId?.value ?? null
    }));
    function emitClose() {
      emit("close");
    }
    function onRemove(id) {
      remove2?.(id);
      if ((items2?.value?.length ?? items2.length) === 0) {
        emitClose();
        const current = router.currentRoute?.value?.path;
        if (current !== "/produtos") {
          router.replace("/produtos").catch(() => {
          });
        }
      }
    }
    function onQtyInput(id, e) {
      const val = Number(e.target.value || "1");
      setQuantity2?.(id, isNaN(val) ? 1 : Math.max(1, val));
    }
    function onNotesUpdate(id, text) {
      setNotes2?.(id, String(text ?? ""));
    }
    function sendOrder() {
      showSendEmail.value = true;
    }
    async function download() {
      try {
        const payload = orderPayload.value;
        if (!payload?.items || Array.isArray(payload.items) && payload.items.length === 0) {
          alert("Seu carrinho está vazio.");
          return;
        }
        const resp = await fetch("/api/download-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!resp.ok) throw new Error("Falha ao gerar arquivos.");
        const blob = await resp.blob();
        const ts = (/* @__PURE__ */ new Date()).toISOString().replace(/[:T]/g, "-").slice(0, 16);
        const filename = `pedido_qualitec_${ts}.zip`;
        const url = URL.createObjectURL(blob);
        const a = (void 0).createElement("a");
        a.href = url;
        a.download = filename;
        (void 0).body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      } catch (_) {
        alert("Não foi possível baixar os arquivos. Tente novamente.");
      }
    }
    function onClear() {
      clear2?.();
      emitClose();
      const current = router.currentRoute?.value?.path;
      if (current !== "/produtos") {
        router.replace("/produtos").catch(() => {
        });
      }
    }
    function goBackToProducts() {
      emitClose();
      const current = router.currentRoute?.value?.path;
      if (current !== "/produtos") {
        router.replace("/produtos").catch(() => {
        });
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(UiModal, {
        visible: __props.visible,
        "with-backdrop": true,
        "close-on-backdrop": true,
        "close-on-esc": true,
        "show-close-button": true,
        "close-button-label": "Fechar",
        "aria-label": "Carrinho de Produtos",
        "panel-class": "w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md",
        onClose: emitClose
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100"${_scopeId}>Carrinho de Produtos</h2>`);
            if (unref(count2) > 0) {
              _push2(`<span class="mt-[1cm] text-sm text-neutral-600 dark:text-neutral-300"${_scopeId}>${ssrInterpolate(unref(count2))} itens</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(items2).length > 0) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(unref(items2), (p) => {
                _push2(`<div class="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-800/40 shadow-sm"${_scopeId}><div class="px-4 py-4 flex items-start justify-between"${_scopeId}><div${_scopeId}><div class="text-lg font-semibold text-neutral-900 dark:text-neutral-100"${_scopeId}>${ssrInterpolate(p.title || "Produto " + p.id)}</div><div class="text-xs text-neutral-600 dark:text-neutral-300"${_scopeId}>Categoria: ${ssrInterpolate(p.categoria || "—")}</div></div><div class="flex items-center gap-4"${_scopeId}>`);
                _push2(ssrRenderComponent(UiDetailsButton, { item: p }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(UiRemoveTextButton, {
                  onClick: ($event) => onRemove(p.id)
                }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="px-4 pb-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2"${_scopeId}>Quantidade</label><input type="number" min="1"${ssrRenderAttr("value", p.quantity)} class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"${_scopeId}></div>`);
                _push2(ssrRenderComponent(__nuxt_component_1$1, {
                  label: "Observações",
                  modelValue: p.notes || "",
                  placeholder: "Adicione observações sobre este item...",
                  rows: 3,
                  "onUpdate:modelValue": ($event) => onNotesUpdate(p.id, $event)
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="mt-6"${_scopeId}><div class="text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2"${_scopeId}>Especificações Técnicas</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-xs text-neutral-500 dark:text-neutral-400"${_scopeId}>Diâmetro</label><div class="mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100"${_scopeId}>${ssrInterpolate(p.diametro_montagem || "—")}</div></div><div${_scopeId}><label class="block text-xs text-neutral-500 dark:text-neutral-400"${_scopeId}>Conexão</label><div class="mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100"${_scopeId}>${ssrInterpolate(p.conexao_instrumento || "—")}</div></div></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="rounded-lg border border-dashed border-neutral-300/70 dark:border-neutral-700/70 h-40 flex items-center justify-center text-neutral-600 dark:text-neutral-300"${_scopeId}> Seu carrinho está vazio. </div>`);
            }
            _push2(`<div class="flex flex-wrap items-center gap-3 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(UiClearCartButton, {
              onClick: ($event) => onClear()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(UiSendOrderButton, {
              onClick: ($event) => sendOrder()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(UiDownloadButton, {
              onClick: ($event) => download()
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(RainbowButton, {
              type: "button",
              class: "gap-2 text-sm !text-black dark:!text-white",
              onClick: goBackToProducts,
              "aria-label": "Voltar aos Produtos"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="i-lucide-arrow-left"${_scopeId2}></span><span class="font-medium"${_scopeId2}>Voltar aos Produtos</span>`);
                } else {
                  return [
                    createVNode("span", { class: "i-lucide-arrow-left" }),
                    createVNode("span", { class: "font-medium" }, "Voltar aos Produtos")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-6" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("h2", { class: "text-2xl font-bold text-neutral-900 dark:text-neutral-100" }, "Carrinho de Produtos"),
                  unref(count2) > 0 ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "mt-[1cm] text-sm text-neutral-600 dark:text-neutral-300"
                  }, toDisplayString(unref(count2)) + " itens", 1)) : createCommentVNode("", true)
                ]),
                unref(items2).length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "space-y-6"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(items2), (p) => {
                    return openBlock(), createBlock("div", {
                      key: p.id,
                      class: "rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-800/40 shadow-sm"
                    }, [
                      createVNode("div", { class: "px-4 py-4 flex items-start justify-between" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "text-lg font-semibold text-neutral-900 dark:text-neutral-100" }, toDisplayString(p.title || "Produto " + p.id), 1),
                          createVNode("div", { class: "text-xs text-neutral-600 dark:text-neutral-300" }, "Categoria: " + toDisplayString(p.categoria || "—"), 1)
                        ]),
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode(UiDetailsButton, { item: p }, null, 8, ["item"]),
                          createVNode(UiRemoveTextButton, {
                            onClick: ($event) => onRemove(p.id)
                          }, null, 8, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "px-4 pb-4" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2" }, "Quantidade"),
                            createVNode("input", {
                              type: "number",
                              min: "1",
                              value: p.quantity,
                              onInput: ($event) => onQtyInput(p.id, $event),
                              class: "w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-100 p-2.5 focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                            }, null, 40, ["value", "onInput"])
                          ]),
                          createVNode(__nuxt_component_1$1, {
                            label: "Observações",
                            modelValue: p.notes || "",
                            placeholder: "Adicione observações sobre este item...",
                            rows: 3,
                            "onUpdate:modelValue": ($event) => onNotesUpdate(p.id, $event)
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode("div", { class: "text-sm font-semibold text-neutral-700 dark:text-neutral-200 mb-2" }, "Especificações Técnicas"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-xs text-neutral-500 dark:text-neutral-400" }, "Diâmetro"),
                              createVNode("div", { class: "mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100" }, toDisplayString(p.diametro_montagem || "—"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-xs text-neutral-500 dark:text-neutral-400" }, "Conexão"),
                              createVNode("div", { class: "mt-1 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/40 p-2.5 text-sm text-neutral-900 dark:text-neutral-100" }, toDisplayString(p.conexao_instrumento || "—"), 1)
                            ])
                          ])
                        ])
                      ])
                    ]);
                  }), 128))
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "rounded-lg border border-dashed border-neutral-300/70 dark:border-neutral-700/70 h-40 flex items-center justify-center text-neutral-600 dark:text-neutral-300"
                }, " Seu carrinho está vazio. ")),
                createVNode("div", { class: "flex flex-wrap items-center gap-3 pt-2" }, [
                  createVNode(UiClearCartButton, {
                    onClick: ($event) => onClear()
                  }, null, 8, ["onClick"]),
                  createVNode(UiSendOrderButton, {
                    onClick: ($event) => sendOrder()
                  }, null, 8, ["onClick"]),
                  createVNode(UiDownloadButton, {
                    onClick: ($event) => download()
                  }, null, 8, ["onClick"]),
                  createVNode(RainbowButton, {
                    type: "button",
                    class: "gap-2 text-sm !text-black dark:!text-white",
                    onClick: goBackToProducts,
                    "aria-label": "Voltar aos Produtos"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "i-lucide-arrow-left" }),
                      createVNode("span", { class: "font-medium" }, "Voltar aos Produtos")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(OrderEmailModal, {
        visible: showSendEmail.value,
        orderPayload: orderPayload.value,
        onClose: ($event) => showSendEmail.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartModal.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const CartModal = Object.assign(_sfc_main$d, { __name: "CartModal" });
const baseClass = "relative inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-white/40 dark:border-neutral-800/50 bg-white/60 dark:bg-neutral-800/40 text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400 backdrop-blur-md transition-colors flex-none shrink-0 shadow-[0_0_10px_rgba(0,0,0,0.55)] dark:shadow-[0_0_16px_#39FF14] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_0_20px_#39FF14] transition-shadow";
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "CartIconButton",
  __ssrInlineRender: true,
  props: {
    to: {},
    class: {}
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { count: count2 } = useCart();
    const showCart = ref(false);
    const btnClass = computed(() => [baseClass, props.class].filter(Boolean).join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button type="button" class="${ssrRenderClass(btnClass.value)}" aria-label="Carrinho" title="Carrinho"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 3h2l2 12h10l2-8H6" stroke="#60A5FA" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="9" cy="19" r="1.7" fill="#93C5FD"></circle><circle cx="17" cy="19" r="1.7" fill="#93C5FD"></circle></svg>`);
      if (unref(count2) > 0) {
        _push(`<span class="absolute -top-2 -right-2 min-w-[22px] h-5 px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center shadow-md">${ssrInterpolate(unref(count2))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button>`);
      _push(ssrRenderComponent(CartModal, {
        visible: showCart.value,
        onClose: ($event) => showCart.value = false
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CartIconButton.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const CartIconButton = Object.assign(_sfc_main$c, { __name: "CartIconButton" });
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "FavoriteIconButton",
  __ssrInlineRender: true,
  props: {
    active: { type: Boolean, default: false },
    ariaLabel: { default: "Favoritos" },
    title: { default: "Favoritos" },
    size: { default: "w-9 h-9" },
    class: {}
  },
  emits: ["click", "update:active", "toggle"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isActive = ref(!!props.active);
    watch(() => props.active, (val) => {
      isActive.value = !!val;
    });
    const buttonClass = computed(() => [
      "inline-flex items-center justify-center flex-none shrink-0",
      props.size,
      "rounded-xl border border-white/40 dark:border-neutral-800/50",
      "bg-white/60 dark:bg-neutral-800/40",
      isActive.value ? "text-yellow-600 dark:text-yellow-300" : "text-yellow-500 dark:text-yellow-400",
      "hover:text-yellow-600 dark:hover:text-yellow-300",
      "backdrop-blur-md transition-colors",
      // Neon glow: preto no tema claro, verde fluorescente no tema escuro
      "shadow-[0_0_10px_rgba(0,0,0,0.55)] dark:shadow-[0_0_16px_#39FF14] hover:shadow-[0_0_12px_rgba(0,0,0,0.7)] dark:hover:shadow-[0_0_20px_#39FF14] transition-shadow",
      props.class
    ].filter(Boolean).join(" "));
    const iconClass = computed(() => "h-5 w-5");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        "aria-label": __props.ariaLabel,
        title: __props.title,
        "aria-pressed": isActive.value ? "true" : "false",
        class: buttonClass.value
      }, _attrs))}><svg class="${ssrRenderClass(iconClass.value)}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.27l5.18 3.04-1.64-5.81L20.9 9.5l-6-.19L12 3.5 9.1 9.31l-6 .19 5.36 4.99-1.64 5.81L12 17.27z"></path></svg></button>`);
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FavoriteIconButton.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const FavoriteIconButton = Object.assign(_sfc_main$b, { __name: "FavoriteIconButton" });
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "ProfileIcon",
  __ssrInlineRender: true,
  props: {
    size: { default: "h-5 w-5" },
    strokeColor: { default: "currentColor" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const sizeClass = computed(() => [
      props.size,
      props.class,
      // Neon glow diretamente no SVG via drop-shadow
      "drop-shadow-[0_0_8px_rgba(0,0,0,0.55)] dark:drop-shadow-[0_0_14px_#39FF14] transition-all"
    ].filter(Boolean).join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${ssrRenderAttrs(mergeProps({
        class: sizeClass.value,
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true"
      }, _attrs))}><circle cx="12" cy="8" r="3.2"${ssrRenderAttr("stroke", __props.strokeColor)} stroke-width="1.6"></circle><path d="M4.5 19c1.8-3.5 5-5 7.5-5s5.7 1.5 7.5 5"${ssrRenderAttr("stroke", __props.strokeColor)} stroke-width="1.6" stroke-linecap="round"></path></svg>`);
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfileIcon.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const ProfileIcon = Object.assign(_sfc_main$a, { __name: "ProfileIcon" });
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "UiFormField",
  __ssrInlineRender: true,
  props: {
    id: {},
    label: {},
    modelValue: {},
    type: { default: "text" },
    placeholder: { default: "" },
    required: { type: Boolean, default: false },
    mask: { default: void 0 },
    inputAttrs: { default: () => ({}) }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const internalValue = computed({
      get() {
        return props.modelValue;
      },
      set(v) {
        emit("update:modelValue", v);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _directive_mask = resolveDirective("mask");
      let _temp0;
      _push(`<div${ssrRenderAttrs(_attrs)}><label${ssrRenderAttr("for", __props.id)} class="block text-sm font-medium mb-1">${ssrInterpolate(__props.label)}</label><input${ssrRenderAttrs((_temp0 = mergeProps({
        id: __props.id,
        type: __props.type,
        required: __props.required,
        placeholder: __props.placeholder,
        class: "w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      }, __props.inputAttrs, ssrGetDirectiveProps(_ctx, _directive_mask, __props.mask)), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, internalValue.value))))}>`);
      ssrRenderSlot(_ctx.$slots, "help", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/UiFormField.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const UiFormField = Object.assign(_sfc_main$9, { __name: "UiFormField" });
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "LogoutButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Sair" },
    to: { default: "/login" },
    class: {}
  },
  emits: ["logout"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const router = useRouter$1();
    function handleClick() {
      try {
        emit("logout");
      } catch (_) {
      }
      router.push(props.to);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        type: "button",
        class: unref(cn)("inline-flex items-center gap-2 px-3 py-2 text-sm !text-black dark:!text-white", props.class),
        onClick: handleClick,
        "aria-label": "Sair"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="flex items-center"${_scopeId}><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"${_scopeId}><path d="M10 17l-5-5 5-5" stroke="#F87171" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"${_scopeId}></path><path d="M15 12H6" stroke="#F87171" stroke-width="1.5" stroke-linecap="round"${_scopeId}></path><rect x="16" y="5" width="3" height="14" rx="1.5" fill="#FCA5A5"${_scopeId}></rect></svg></span><span class="font-medium"${_scopeId}>${ssrInterpolate(props.label)}</span>`);
          } else {
            return [
              createVNode("span", { class: "flex items-center" }, [
                (openBlock(), createBlock("svg", {
                  class: "h-5 w-5",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  "aria-hidden": "true"
                }, [
                  createVNode("path", {
                    d: "M10 17l-5-5 5-5",
                    stroke: "#F87171",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }),
                  createVNode("path", {
                    d: "M15 12H6",
                    stroke: "#F87171",
                    "stroke-width": "1.5",
                    "stroke-linecap": "round"
                  }),
                  createVNode("rect", {
                    x: "16",
                    y: "5",
                    width: "3",
                    height: "14",
                    rx: "1.5",
                    fill: "#FCA5A5"
                  })
                ]))
              ]),
              createVNode("span", { class: "font-medium" }, toDisplayString(props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LogoutButton.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const LogoutButton = Object.assign(_sfc_main$8, { __name: "LogoutButton" });
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "ProfileModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean, default: false },
    initialFullName: { default: "" },
    initialSector: { default: "" },
    initialWhatsapp: { default: "" },
    initialInfo: { default: "" }
  },
  emits: ["close", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const fullName2 = ref(props.initialFullName);
    const sector2 = ref(props.initialSector);
    const whatsapp2 = ref(props.initialWhatsapp);
    const info = ref(props.initialInfo);
    const panelClass = computed(() => "w-[92vw] max-w-lg rounded-lg p-0");
    watch(() => props.visible, (v) => {
      if (v) {
        fullName2.value = props.initialFullName || "";
        sector2.value = props.initialSector || "";
        whatsapp2.value = props.initialWhatsapp || "";
      }
    });
    function onClose() {
      emit("close");
    }
    function onSave() {
      emit("save", {
        fullName: fullName2.value.trim(),
        sector: sector2.value.trim(),
        whatsapp: whatsapp2.value.trim(),
        info: info.value.trim()
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(UiModal, mergeProps({
        visible: __props.visible,
        onClose,
        withBackdrop: true,
        closeOnBackdrop: true,
        closeOnEsc: true,
        showCloseButton: true,
        closeButtonLabel: "Fechar",
        ariaLabel: "Completar cadastro do perfil",
        panelClass: panelClass.value
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h2 class="text-lg font-semibold mb-4"${_scopeId}>Completar cadastro</h2><form class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(UiFormField, {
              id: "fullName",
              label: "Nome completo",
              modelValue: fullName2.value,
              "onUpdate:modelValue": ($event) => fullName2.value = $event,
              required: "",
              placeholder: "Seu nome completo"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(UiFormField, {
              id: "sector",
              label: "Setor",
              modelValue: sector2.value,
              "onUpdate:modelValue": ($event) => sector2.value = $event,
              placeholder: "Ex.: Compras, Engenharia, Comercial"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(UiFormField, {
              id: "whatsapp",
              label: "WhatsApp",
              type: "tel",
              modelValue: whatsapp2.value,
              "onUpdate:modelValue": ($event) => whatsapp2.value = $event,
              mask: "## (##) #####-####",
              placeholder: "55 (11) 95137-2631"
            }, {
              help: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-xs text-neutral-500 mt-1"${_scopeId2}>Formato: 55 (DD) #####-####</p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-xs text-neutral-500 mt-1" }, "Formato: 55 (DD) #####-####")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-between items-center gap-3 pt-2"${_scopeId}>`);
            _push2(ssrRenderComponent(LogoutButton, {
              label: "Sair do catálogo",
              onLogout: onClose
            }, null, _parent2, _scopeId));
            _push2(`<div class="flex justify-end gap-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"${_scopeId}>Cancelar</button><button type="submit" class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"${_scopeId}>Salvar</button></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h2", { class: "text-lg font-semibold mb-4" }, "Completar cadastro"),
                createVNode("form", {
                  onSubmit: withModifiers(onSave, ["prevent"]),
                  class: "space-y-4"
                }, [
                  createVNode(UiFormField, {
                    id: "fullName",
                    label: "Nome completo",
                    modelValue: fullName2.value,
                    "onUpdate:modelValue": ($event) => fullName2.value = $event,
                    required: "",
                    placeholder: "Seu nome completo"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(UiFormField, {
                    id: "sector",
                    label: "Setor",
                    modelValue: sector2.value,
                    "onUpdate:modelValue": ($event) => sector2.value = $event,
                    placeholder: "Ex.: Compras, Engenharia, Comercial"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(UiFormField, {
                    id: "whatsapp",
                    label: "WhatsApp",
                    type: "tel",
                    modelValue: whatsapp2.value,
                    "onUpdate:modelValue": ($event) => whatsapp2.value = $event,
                    mask: "## (##) #####-####",
                    placeholder: "55 (11) 95137-2631"
                  }, {
                    help: withCtx(() => [
                      createVNode("p", { class: "text-xs text-neutral-500 mt-1" }, "Formato: 55 (DD) #####-####")
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", { class: "flex justify-between items-center gap-3 pt-2" }, [
                    createVNode(LogoutButton, {
                      label: "Sair do catálogo",
                      onLogout: onClose
                    }),
                    createVNode("div", { class: "flex justify-end gap-2" }, [
                      createVNode("button", {
                        type: "button",
                        class: "px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                        onClick: onClose
                      }, "Cancelar"),
                      createVNode("button", {
                        type: "submit",
                        class: "px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                      }, "Salvar")
                    ])
                  ])
                ], 32)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfileModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const ProfileModal = Object.assign(_sfc_main$7, { __name: "ProfileModal" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ProfileIconButton",
  __ssrInlineRender: true,
  props: {
    ariaLabel: { default: "Perfil" },
    title: { default: "Perfil" },
    size: { default: "w-8 h-8 sm:w-9 sm:h-9" },
    strokeColor: { default: "currentColor" },
    class: {}
  },
  emits: ["click", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const showProfile = ref(false);
    const { email: email2, empresaId: empresaId2, fullName: fullName2, sector: sector2, whatsapp: whatsapp2, isIncomplete: isIncomplete2, saveProfile: saveProfile2 } = useUserProfile();
    const mounted = ref(false);
    const buttonClass = computed(() => {
      const base = [
        "inline-flex items-center justify-center flex-none shrink-0",
        props.size,
        "rounded-xl border",
        "bg-white/60 dark:bg-neutral-800/40",
        "backdrop-blur-md transition-colors",
        props.class
      ];
      if (!mounted.value) {
        base.push("border-white/40 dark:border-neutral-800/50 text-neutral-700 dark:text-neutral-200");
        return base.filter(Boolean).join(" ");
      }
      base.push(
        isIncomplete2.value ? "border-red-500/70 text-red-500 neon-shadow hover:text-red-600 animate-neon" : "border-white/40 dark:border-neutral-800/50 text-neutral-700 dark:text-neutral-200 hover:text-blue-600 dark:hover:text-blue-400"
      );
      return base.filter(Boolean).join(" ");
    });
    const iconSize = computed(() => "h-5 w-5");
    const derivedTitle = computed(() => {
      if (!mounted.value) return props.title;
      return isIncomplete2.value ? "Perfil incompleto — clique para finalizar" : props.title;
    });
    async function handleSave(payload) {
      saveProfile2(payload);
      emit("save", payload);
      try {
        const resp = await fetch("/api/user/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email2.value,
            empresaId: empresaId2.value,
            fullName: payload.fullName,
            sector: payload.sector,
            whatsapp: payload.whatsapp
          })
        });
        const data = await resp.json();
        if (!data?.success) {
          alert(data?.message || "Não foi possível salvar seu perfil.");
        }
      } catch (e) {
        alert("Erro de rede ao salvar seu perfil.");
      }
      showProfile.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><button type="button"${ssrRenderAttr("aria-label", derivedTitle.value)}${ssrRenderAttr("title", derivedTitle.value)} class="${ssrRenderClass(buttonClass.value)}" data-v-3fcb38ac>`);
      _push(ssrRenderComponent(ProfileIcon, {
        size: iconSize.value,
        strokeColor: __props.strokeColor
      }, null, _parent));
      _push(`</button>`);
      _push(ssrRenderComponent(ProfileModal, {
        visible: showProfile.value,
        initialFullName: unref(fullName2),
        initialSector: unref(sector2),
        initialWhatsapp: unref(whatsapp2),
        onClose: ($event) => showProfile.value = false,
        onSave: handleSave
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfileIconButton.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ProfileIconButton = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-3fcb38ac"]]), { __name: "ProfileIconButton" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "HeaderButtons",
  __ssrInlineRender: true,
  props: {
    isLoginPage: { type: Boolean, default: false }
  },
  emits: ["open-favorites"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3" }, _attrs))}>`);
      if (!__props.isLoginPage) {
        _push(ssrRenderComponent(CartIconButton, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(ThemeToggle, null, null, _parent));
      if (!__props.isLoginPage) {
        _push(ssrRenderComponent(ProfileIconButton, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!__props.isLoginPage) {
        _push(ssrRenderComponent(FavoriteIconButton, {
          size: "w-8 h-8 sm:w-9 sm:h-9",
          onClick: ($event) => emit("open-favorites")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeaderButtons.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const HeaderButtons = Object.assign(_sfc_main$5, { __name: "HeaderButtons" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    type: { default: "button" },
    variant: { default: "primary" },
    size: { default: "sm" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    ariaLabel: {}
  },
  emits: ["click"],
  setup(__props) {
    const props = __props;
    const variantClasses = {
      primary: "btn btn-primary",
      secondary: "btn btn-secondary",
      outline: "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-600 dark:text-blue-400",
      ghost: "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors bg-transparent hover:bg-[var(--input-bg)]"
    };
    const sizeClasses = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2.5 text-sm",
      lg: "px-5 py-3 text-base"
    };
    const attrs = useAttrs();
    const computedClass = computed(() => {
      return [
        "focus:outline-none focus:ring-2 shadow-sm hover:shadow-md",
        variantClasses[props.variant],
        sizeClasses[props.size],
        props.block ? "w-full justify-center" : "justify-center",
        attrs.class || ""
      ].join(" ");
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: __props.type,
        class: computedClass.value,
        disabled: __props.disabled,
        "aria-label": __props.ariaLabel
      }, _attrs))}>`);
      if (_ctx.$slots.icon) {
        _push(`<span class="mr-2 inline-flex">`);
        ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/Button.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$4, { __name: "UiButton" });
const items = ref([]);
const { email, empresaId } = useUserProfile();
const serverEnabled = computed(() => !!email.value && !!empresaId.value && Number(empresaId.value) > 0);
function persist() {
}
async function reloadFromServer() {
  if (!serverEnabled.value) return;
  try {
    const data = await $fetch("/api/favoritos/list", {
      params: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value) }
    });
    const list = Array.isArray(data?.items) ? data.items : [];
    items.value = list.map((it) => ({ id: it.id, alias: it.alias }));
    persist();
  } catch (err) {
  }
}
function has(id) {
  return items.value.some((p) => p.id === id);
}
async function add(item) {
  if (item.id == null) return { ok: false, reason: "invalid" };
  if (has(item.id)) return { ok: false, reason: "exists" };
  if (serverEnabled.value) {
    try {
      const res = await $fetch("/api/favoritos/toggle", {
        method: "POST",
        body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id: item.id }
      });
      if (res?.success) {
        await reloadFromServer();
        return { ok: true };
      }
    } catch (_) {
    }
    return { ok: false, reason: "server" };
  }
  items.value.push({ id: item.id, title: item.title, brand: item.brand });
  return { ok: true };
}
async function remove(id) {
  if (serverEnabled.value) {
    try {
      const res = await $fetch("/api/favoritos/toggle", {
        method: "POST",
        body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id }
      });
      if (res?.success) {
        await reloadFromServer();
        return;
      }
    } catch (_) {
    }
  }
  items.value = items.value.filter((p) => p.id !== id);
}
async function toggle(item) {
  if (serverEnabled.value) {
    try {
      const res = await $fetch("/api/favoritos/toggle", {
        method: "POST",
        body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id: item.id }
      });
      if (res?.success) {
        await reloadFromServer();
        return { ok: true, active: !!res.active };
      }
    } catch (_) {
    }
    return { ok: false, active: has(item.id) };
  }
  if (has(item.id)) {
    await remove(item.id);
    return { ok: true, active: false };
  } else {
    const res = await add(item);
    return { ok: res.ok, active: res.ok ? true : false };
  }
}
async function setAlias(id, alias) {
  if (serverEnabled.value) {
    try {
      const res = await $fetch("/api/favoritos/alias", {
        method: "POST",
        body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id, alias }
      });
      if (res?.success) {
        await reloadFromServer();
        return true;
      }
    } catch (_) {
    }
    return false;
  }
  const list = items.value.map((p) => p.id === id ? { ...p, alias } : p);
  items.value = list;
  return true;
}
const count = computed(() => items.value.length);
function useFavorites() {
  return {
    items,
    add,
    remove,
    toggle,
    has,
    setAlias,
    count,
    refreshFromServer: reloadFromServer
  };
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FavoritesModal",
  __ssrInlineRender: true,
  props: {
    visible: { type: Boolean }
  },
  emits: ["close"],
  setup(__props) {
    const props = __props;
    const { items: items2, setAlias: setAlias2 } = useFavorites();
    const loading = ref(false);
    const details = ref({});
    const aliasEditing = ref({});
    const query = ref("");
    const products = computed(() => Object.values(details.value));
    const filteredProducts = computed(() => {
      const q = query.value.trim().toLowerCase();
      const list = products.value;
      if (!q) return list;
      return list.filter((p) => {
        const alias = aliasFor(p).toLowerCase();
        const idStr = p?.id != null ? String(p.id).toLowerCase() : "";
        const part = p?.part_number ? String(p.part_number).toLowerCase() : "";
        const nome = String(p?.nome || "").toLowerCase();
        const desc = String(p?.descricao || "").toLowerCase();
        const titulo = String(p?.titulo || "").toLowerCase();
        const fab = String(p?.fabricante || p?.marca || "").toLowerCase();
        const cat = String(p?.categoria || "").toLowerCase();
        return [alias, idStr, part, nome, desc, titulo, fab, cat].some((s) => s && s.includes(q));
      });
    });
    const aliasMap = computed(() => {
      const map = /* @__PURE__ */ new Map();
      (items2.value || []).forEach((f) => {
        if (f && f.id != null) map.set(String(f.id), String(f.alias || ""));
      });
      return map;
    });
    function favKey(p) {
      const id = p?.id;
      const part = p?.part_number;
      if (id != null && aliasMap.value.has(String(id))) return String(id);
      if (part != null && aliasMap.value.has(String(part))) return String(part);
      return String(id ?? part ?? "");
    }
    function syncAliasEditing() {
      const dict = {};
      (items2.value || []).forEach((f) => {
        if (f && f.id != null) dict[String(f.id)] = String(f.alias || "");
      });
      aliasEditing.value = dict;
    }
    function aliasFor(p) {
      const key = favKey(p);
      const fromEdit = aliasEditing.value[key];
      if (fromEdit) return fromEdit;
      const fromMap = aliasMap.value.get(key);
      return typeof fromMap === "string" ? fromMap : "";
    }
    async function fetchDetailsForFavorites() {
      loading.value = true;
      try {
        const ids = items2.value.map((f) => f?.id).filter((id) => id != null);
        const results = await Promise.all(
          ids.map(async (rawId) => {
            const idStr = String(rawId);
            const isNumeric = /^\d+$/.test(idStr);
            const params = isNumeric ? { id: Number(idStr) } : { part_number: idStr };
            try {
              const data = await $fetch("/api/produtos/details", { params });
              const item = data?.item || null;
              if (item) return { key: idStr, item };
            } catch (err) {
              console.warn("Falha ao buscar detalhes do favorito", rawId, err);
            }
            return { key: idStr, item: null };
          })
        );
        const dict = {};
        for (const r of results) {
          if (r.item) dict[r.key] = r.item;
        }
        details.value = dict;
        syncAliasEditing();
      } finally {
        loading.value = false;
      }
    }
    function parseImages(imagens) {
      try {
        if (!imagens) return [];
        if (Array.isArray(imagens)) return imagens;
        const parsed = JSON.parse(typeof imagens === "string" ? imagens : String(imagens));
        if (Array.isArray(parsed)) return parsed;
        if (Array.isArray(parsed?.images)) return parsed.images;
        return [];
      } catch {
        return [];
      }
    }
    function isIbb(url) {
      return typeof url === "string" && url.startsWith("https://ibb.co/");
    }
    function toProxy(url) {
      return isIbb(url) ? `/api/imgbb?u=${encodeURIComponent(url)}` : url;
    }
    function resolveImage(token) {
      if (!token) return "";
      const s = String(token);
      if (/^https?:\/\//i.test(s)) return toProxy(s);
      const clean = s.replace(/^public\//i, "").replace(/^\/+/, "");
      return `/${clean}`;
    }
    function firstImage(p) {
      const raw = parseImages(p?.imagens);
      const urls = raw.map(resolveImage).filter((x) => typeof x === "string" && !x.toLowerCase().endsWith(".pdf"));
      const img = urls[0];
      return img || "/images/manometro.png";
    }
    const showDetails = ref(false);
    const selectedProduct = ref(null);
    function openDetails(p) {
      selectedProduct.value = p;
      showDetails.value = true;
    }
    watch(
      () => props.visible,
      (v) => {
        if (v) fetchDetailsForFavorites();
      }
    );
    watch(items2, () => {
      syncAliasEditing();
      if (props.visible) fetchDetailsForFavorites();
    });
    async function saveAlias(p) {
      const key = favKey(p);
      const alias = aliasEditing.value[key] ?? "";
      await setAlias2?.(key, alias);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(UiModal, mergeProps({
        visible: __props.visible,
        "panel-class": "w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl shadow-xl",
        onClose: ($event) => _ctx.$emit("close")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-4 gap-3"${_scopeId}><h2 class="text-xl font-semibold"${_scopeId}>Favoritos</h2><div class="w-full max-w-xs"${_scopeId}>`);
            _push2(ssrRenderComponent(__nuxt_component_0, {
              modelValue: query.value,
              "onUpdate:modelValue": ($event) => query.value = $event,
              placeholder: "Pesquisar favoritos...",
              "aria-label": "Pesquisar favoritos"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (loading.value) {
              _push2(`<div class="py-10 text-center opacity-70"${_scopeId}>Carregando favoritos...</div>`);
            } else {
              _push2(`<div${_scopeId}>`);
              if (products.value.length === 0) {
                _push2(`<div class="py-10 text-center opacity-70"${_scopeId}> Nenhum produto favoritado ainda. </div>`);
              } else {
                _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"${_scopeId}><!--[-->`);
                ssrRenderList(filteredProducts.value, (p) => {
                  _push2(`<div class="rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 p-3 bg-white/70 dark:bg-neutral-800/70"${_scopeId}><div class="aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-700"${_scopeId}><img${ssrRenderAttr("src", firstImage(p))} alt="Imagem do produto" class="w-full h-full object-cover"${_scopeId}></div><div class="mt-3"${_scopeId}><div class="text-sm opacity-70"${_scopeId}>Nome personalizado</div><div class="mt-1 flex items-center gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(__nuxt_component_0, {
                    modelValue: aliasEditing.value[favKey(p)],
                    "onUpdate:modelValue": ($event) => aliasEditing.value[favKey(p)] = $event,
                    placeholder: "Opcional: nome ou número",
                    onBlur: ($event) => saveAlias(p),
                    onKeyup: ($event) => saveAlias(p)
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(__nuxt_component_1, {
                    variant: "outline",
                    size: "xs",
                    onClick: ($event) => saveAlias(p)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Salvar`);
                      } else {
                        return [
                          createTextVNode("Salvar")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div><div class="mt-3"${_scopeId}><div class="text-sm opacity-70"${_scopeId}>Part Number</div><div class="text-base font-medium truncate"${_scopeId}>${ssrInterpolate(p.part_number ?? p.id)}</div></div><div class="mt-3 flex items-center gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(RainbowButton, {
                    class: "flex-1",
                    onClick: ($event) => openDetails(p)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`Ver detalhes`);
                      } else {
                        return [
                          createTextVNode("Ver detalhes")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              }
              _push2(`</div>`);
            }
            _push2(ssrRenderComponent(ProductDetailsModal, {
              visible: showDetails.value,
              product: selectedProduct.value,
              onClose: ($event) => showDetails.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-4 gap-3" }, [
                createVNode("h2", { class: "text-xl font-semibold" }, "Favoritos"),
                createVNode("div", { class: "w-full max-w-xs" }, [
                  createVNode(__nuxt_component_0, {
                    modelValue: query.value,
                    "onUpdate:modelValue": ($event) => query.value = $event,
                    placeholder: "Pesquisar favoritos...",
                    "aria-label": "Pesquisar favoritos"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ]),
              loading.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "py-10 text-center opacity-70"
              }, "Carregando favoritos...")) : (openBlock(), createBlock("div", { key: 1 }, [
                products.value.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "py-10 text-center opacity-70"
                }, " Nenhum produto favoritado ainda. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(filteredProducts.value, (p) => {
                    return openBlock(), createBlock("div", {
                      key: p.id || p.part_number,
                      class: "rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 p-3 bg-white/70 dark:bg-neutral-800/70"
                    }, [
                      createVNode("div", { class: "aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-700" }, [
                        createVNode("img", {
                          src: firstImage(p),
                          alt: "Imagem do produto",
                          class: "w-full h-full object-cover",
                          onError: (e) => e.target.src = "/images/manometro.png"
                        }, null, 40, ["src", "onError"])
                      ]),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("div", { class: "text-sm opacity-70" }, "Nome personalizado"),
                        createVNode("div", { class: "mt-1 flex items-center gap-2" }, [
                          createVNode(__nuxt_component_0, {
                            modelValue: aliasEditing.value[favKey(p)],
                            "onUpdate:modelValue": ($event) => aliasEditing.value[favKey(p)] = $event,
                            placeholder: "Opcional: nome ou número",
                            onBlur: ($event) => saveAlias(p),
                            onKeyup: withKeys(($event) => saveAlias(p), ["enter"])
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur", "onKeyup"]),
                          createVNode(__nuxt_component_1, {
                            variant: "outline",
                            size: "xs",
                            onClick: ($event) => saveAlias(p)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Salvar")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("div", { class: "text-sm opacity-70" }, "Part Number"),
                        createVNode("div", { class: "text-base font-medium truncate" }, toDisplayString(p.part_number ?? p.id), 1)
                      ]),
                      createVNode("div", { class: "mt-3 flex items-center gap-2" }, [
                        createVNode(RainbowButton, {
                          class: "flex-1",
                          onClick: ($event) => openDetails(p)
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Ver detalhes")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ]);
                  }), 128))
                ]))
              ])),
              createVNode(ProductDetailsModal, {
                visible: showDetails.value,
                product: selectedProduct.value,
                onClose: ($event) => showDetails.value = false
              }, null, 8, ["visible", "product", "onClose"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FavoritesModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const FavoritesModal = Object.assign(_sfc_main$3, { __name: "FavoritesModal" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const isLoginPage = computed(() => route.path === "/login");
    const { overlayOpen } = useOverlay();
    const hideHeader = computed(() => overlayOpen.value || route.path === "/comparar");
    const showFavorites = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtRouteAnnouncer = __nuxt_component_0$2;
      const _component_NuxtPage = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-4 py-3" style="${ssrRenderStyle(!hideHeader.value ? null : { display: "none" })}">`);
      _push(ssrRenderComponent(HeaderButtons, {
        isLoginPage: isLoginPage.value,
        onOpenFavorites: ($event) => showFavorites.value = true
      }, null, _parent));
      _push(`</header>`);
      _push(ssrRenderComponent(_component_NuxtRouteAnnouncer, null, null, _parent));
      _push(`<main class="pt-20 md:pt-24">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</main>`);
      _push(ssrRenderComponent(FavoritesModal, {
        visible: showFavorites.value,
        onClose: ($event) => showFavorites.value = false
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    _error.stack ? _error.stack.split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n") : "";
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-sjjKH8D2.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-DtWDDJ8U.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { FavoriteIconButton as F, ProductDetailsModal as P, RainbowButton as R, UiModal as U, _export_sfc as _, useNuxtApp as a, useRuntimeConfig as b, nuxtLinkDefaults as c, cn as d, entry$1 as default, __nuxt_component_0 as e, __nuxt_component_0$1 as f, __nuxt_component_1$1 as g, useState as h, __nuxt_component_1 as i, useCart as j, useFavorites as k, navigateTo as n, resolveRouteObject as r, useRouter as u };
//# sourceMappingURL=server.mjs.map
