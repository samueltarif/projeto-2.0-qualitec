import { defineComponent, ref, computed, mergeProps, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, unref, createCommentVNode, renderSlot, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, f as __nuxt_component_0$1, R as RainbowButton, d as cn } from './server.mjs';
import { useRoute, useRouter } from 'vue-router';
import { u as useCompare } from './useCompare-CHcHewrE.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import '@supabase/ssr';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "BackToProductsButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Voltar aos Produtos" },
    to: { default: "/produtos" },
    class: {},
    showIcon: { type: Boolean, default: true }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const router = useRouter();
    function handleClick() {
      if (props.to) {
        const current = router.currentRoute?.value?.path;
        if (current !== props.to) {
          router.replace(props.to).catch(() => {
          });
        }
      } else {
        emit("click");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        type: "button",
        class: unref(cn)("inline-flex items-center gap-2 px-3 py-2 text-sm !text-black dark:!text-white", props.class),
        onClick: handleClick,
        "aria-label": props.label
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.showIcon) {
              _push2(`<span class="i-lucide-arrow-left"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(`${ssrInterpolate(props.label)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              props.showIcon ? (openBlock(), createBlock("span", {
                key: 0,
                class: "i-lucide-arrow-left"
              })) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default", {}, () => [
                createTextVNode(toDisplayString(props.label), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BackToProductsButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const BackToProductsButton = Object.assign(_sfc_main$5, { __name: "BackToProductsButton" });
const baseOuter = "relative w-full overflow-hidden";
const baseInner = "relative z-10";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "UiComparePanel",
  __ssrInlineRender: true,
  props: {
    class: {},
    withSilk: { type: Boolean, default: false },
    hue: { default: 300 },
    saturation: { default: 0.5 },
    brightness: { default: 1 },
    speed: { default: 1 },
    padded: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const outerClasses = [baseOuter, props.class].filter(Boolean).join(" ");
    const innerClasses = [baseInner, props.padded ? "px-4 py-8" : ""].filter(Boolean).join(" ");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: unref(outerClasses) }, _attrs))}>`);
      if (__props.withSilk) {
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass(unref(innerClasses))}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiComparePanel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const UiComparePanel = Object.assign(_sfc_main$4, { __name: "UiComparePanel" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "UiAddButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Adicionar" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    class: {},
    size: { default: "sm" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedClass = computed(() => [
      "inline-flex items-center gap-2 text-sm !text-black dark:!text-white",
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
        "aria-label": "Adicionar"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.loading) {
              _push2(`<span class="i-lucide-loader-2 animate-spin"${_scopeId}></span>`);
            } else if (__props.showIcon) {
              _push2(`<span class="i-lucide-shopping-cart"${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(__props.label)}</span>`);
          } else {
            return [
              __props.loading ? (openBlock(), createBlock("span", {
                key: 0,
                class: "i-lucide-loader-2 animate-spin"
              })) : __props.showIcon ? (openBlock(), createBlock("span", {
                key: 1,
                class: "i-lucide-shopping-cart"
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiAddButton.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const UiAddButton = Object.assign(_sfc_main$3, { __name: "UiAddButton" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UiClearCompareButton",
  __ssrInlineRender: true,
  props: {
    label: { default: "Limpar Comparação" },
    type: { default: "button" },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    showIcon: { type: Boolean, default: true },
    class: {},
    size: { default: "sm" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const computedClass = computed(() => [
      "inline-flex items-center gap-2 text-sm !text-black dark:!text-white",
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
        "aria-label": "Limpar Comparação"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.showIcon && !__props.loading) {
              _push2(`<span class="i-lucide-trash-2"${_scopeId}></span>`);
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
                class: "i-lucide-trash-2"
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiClearCompareButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const UiClearCompareButton = Object.assign(_sfc_main$2, { __name: "UiClearCompareButton" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UiRemoveButton",
  __ssrInlineRender: true,
  props: {
    ariaLabel: { default: "Remover" },
    class: {},
    size: { default: "sm" },
    iconClass: { default: "i-lucide-x" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const sizeClasses = {
      xs: "p-1",
      sm: "p-1.5",
      md: "p-2"
    };
    const classes = computed(() => [
      "inline-flex items-center justify-center rounded-md",
      "text-red-400 hover:text-red-500",
      "transition-colors",
      sizeClasses[props.size],
      props.class || ""
    ].join(" "));
    const iconClassComputed = computed(() => [props.iconClass, "h-4 w-4"].join(" "));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        type: "button",
        class: classes.value,
        "aria-label": __props.ariaLabel,
        title: __props.ariaLabel
      }, _attrs))}><span class="${ssrRenderClass(iconClassComputed.value)}"></span></button>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiRemoveButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UiRemoveButton = Object.assign(_sfc_main$1, { __name: "UiRemoveButton" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "comparar",
  __ssrInlineRender: true,
  setup(__props) {
    useRoute();
    const { remove, clear } = useCompare();
    const items = ref([]);
    const gridTemplate = computed(() => {
      const cols = Math.max(2, Math.min(3, items.value.length));
      return `grid-template-columns: minmax(12rem, 0.9fr) repeat(${cols}, minmax(12rem, 1fr))`;
    });
    const specs = [
      { label: "CATEGORIA", key: "categoria" },
      { label: "TIPO DE MEDIÇÃO", key: "tipo_medicao" },
      { label: "DIÂMETRO DE MONTAGEM", key: "diametro_montagem" },
      { label: "POSIÇÃO DE MONTAGEM", key: "posicao_montagem" },
      { label: "CONEXÃO DO INSTRUMENTO", key: "conexao_instrumento" },
      { label: "MATERIAL DO INVÓLUCRO", key: "material_involucro" },
      { label: "MATERIAL DOS INTERNOS", key: "material_internos" },
      { label: "VISOR", key: "visor" },
      { label: "CLASSE DE EXATIDÃO", key: "classe_exatidao" },
      { label: "UNIDADE DE LEITURA", key: "unidade_leitura" },
      { label: "FAIXA DE TRABALHO", key: "faixa_trabalho" },
      { label: "ENCHIMENTO DE GLICERINA", key: "glicerina", type: "bool" },
      { label: "CERTIFICADOS", key: "certificados", type: "json" },
      { label: "TUBO SIFÃO", key: "tubo_sifao", type: "bool" },
      { label: "SELO DIAFRAGMA", key: "selo_diafragma", type: "bool" },
      { label: "CONTATO ELÉTRICO", key: "contato_eletrico", type: "bool" },
      { label: "VÁLVULA DE ISOLAMENTO", key: "valvula_isolamento", type: "bool" }
    ];
    function formatValue(v, spec) {
      if (spec.type === "bool") return v ? "Sim" : "Não";
      if (spec.type === "json") {
        try {
          const arr = Array.isArray(v) ? v : JSON.parse(v || "[]");
          return Array.isArray(arr) && arr.length ? arr.join(", ") : "—";
        } catch {
          return "—";
        }
      }
      return v ?? "—";
    }
    function normalizeSpecValue(v, spec) {
      if (spec.type === "bool") return v ? "sim" : "não";
      if (spec.type === "json") {
        try {
          const arr = Array.isArray(v) ? v : JSON.parse(v || "[]");
          return Array.isArray(arr) && arr.length ? String(arr.join(", ")).trim().toLowerCase() : "";
        } catch {
          return "";
        }
      }
      if (v == null) return "";
      return String(v).trim().toLowerCase();
    }
    function mode(values) {
      const freq = {};
      let best = "";
      let bestCount = 0;
      for (const val of values) {
        if (!val) continue;
        const count = (freq[val] || 0) + 1;
        freq[val] = count;
        if (count > bestCount) {
          best = val;
          bestCount = count;
        }
      }
      return best;
    }
    function isDifferent(p, spec) {
      const values = items.value.map((i) => normalizeSpecValue(i[spec.key], spec));
      const baseline = mode(values);
      if (!baseline) return false;
      const current = normalizeSpecValue(p[spec.key], spec);
      return current !== baseline;
    }
    function addToCart(p) {
      console.log("Adicionar ao carrinho:", p.id);
    }
    function handleRemove(id) {
      remove(id);
      items.value = items.value.filter((p) => p.id !== id);
    }
    function handleClear() {
      clear();
      items.value = [];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(UiComparePanel, mergeProps({ class: "min-h-screen w-full" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mx-auto max-w-7xl px-4 py-8" data-v-8f3da8f6${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3" data-v-8f3da8f6${_scopeId}><div class="min-w-0" data-v-8f3da8f6${_scopeId}><h1 class="text-2xl font-bold text-black dark:text-neutral-100" data-v-8f3da8f6${_scopeId}>Comparação de Produtos</h1><p class="text-sm text-black dark:text-neutral-300" data-v-8f3da8f6${_scopeId}>Compare as especificações dos produtos selecionados</p></div>`);
            _push2(ssrRenderComponent(BackToProductsButton, { class: "self-start md:self-auto shrink-0" }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (items.value.length < 2) {
              _push2(`<div class="mt-6 text-black dark:text-neutral-200" data-v-8f3da8f6${_scopeId}> Selecione ao menos 2 produtos para comparar. </div>`);
            } else {
              _push2(`<div class="mt-6" data-v-8f3da8f6${_scopeId}><div class="relative -mx-4 md:mx-0 overflow-x-auto" data-v-8f3da8f6${_scopeId}><div class="grid gap-0 min-w-max" style="${ssrRenderStyle(gridTemplate.value)}" data-v-8f3da8f6${_scopeId}><div class="sticky left-0 z-10 rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-semibold border border-neutral-700/60 backdrop-blur-md" data-v-8f3da8f6${_scopeId}>Especificação</div><!--[-->`);
              ssrRenderList(items.value, (p) => {
                _push2(`<div class="rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm border border-neutral-700/60 min-w-[12rem]" data-v-8f3da8f6${_scopeId}><div class="flex items-center justify-between" data-v-8f3da8f6${_scopeId}><div data-v-8f3da8f6${_scopeId}><div class="text-black dark:text-neutral-100 font-semibold truncate" data-v-8f3da8f6${_scopeId}>${ssrInterpolate(p.part_number || p.id)}</div><div class="text-[11px] md:text-xs text-black dark:text-blue-300 uppercase" data-v-8f3da8f6${_scopeId}>${ssrInterpolate(p.categoria || "—")}</div><div class="text-[11px] md:text-xs text-black dark:text-neutral-300" data-v-8f3da8f6${_scopeId}>${ssrInterpolate(p.fabricante || "QUALITEC")}</div></div>`);
                _push2(ssrRenderComponent(UiRemoveButton, {
                  size: "sm",
                  class: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-md shadow-sm dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 dark:border-red-700",
                  onClick: ($event) => handleRemove(p.id)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div><div class="relative -mx-4 md:mx-0 overflow-x-auto" data-v-8f3da8f6${_scopeId}><div class="grid gap-0 min-w-max" style="${ssrRenderStyle(gridTemplate.value)}" data-v-8f3da8f6${_scopeId}><!--[-->`);
              ssrRenderList(specs, (spec) => {
                _push2(`<!--[--><div class="sticky left-0 z-10 bg-neutral-900/50 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-300 font-medium border border-neutral-700/60 backdrop-blur-md" data-v-8f3da8f6${_scopeId}>${ssrInterpolate(spec.label)}</div><!--[-->`);
                ssrRenderList(items.value, (p) => {
                  _push2(`<div class="${ssrRenderClass(["bg-emerald-900/30 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-100 border border-neutral-700/60 min-w-[12rem]", isDifferent(p, spec) ? "md:diff-glow-red border-red-500/40 bg-red-50/20 dark:bg-red-900/10" : ""])}" data-v-8f3da8f6${_scopeId}><span class="${ssrRenderClass(isDifferent(p, spec) ? "diff-text-red md:diff-text-red" : "")}" data-v-8f3da8f6${_scopeId}>${ssrInterpolate(formatValue(p[spec.key], spec))}</span></div>`);
                });
                _push2(`<!--]--><!--]-->`);
              });
              _push2(`<!--]--></div></div><div class="relative -mx-4 md:mx-0 overflow-x-auto" data-v-8f3da8f6${_scopeId}><div class="grid gap-0 min-w-max" style="${ssrRenderStyle(gridTemplate.value)}" data-v-8f3da8f6${_scopeId}><div class="sticky left-0 z-10 bg-neutral-900/60 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-medium border border-neutral-700/60 backdrop-blur-md" data-v-8f3da8f6${_scopeId}>Ações</div><!--[-->`);
              ssrRenderList(items.value, (p) => {
                _push2(`<div class="bg-neutral-900/60 p-2 md:p-4 border border-neutral-700/60 min-w-[12rem]" data-v-8f3da8f6${_scopeId}><div class="flex items-center gap-3" data-v-8f3da8f6${_scopeId}>`);
                _push2(ssrRenderComponent(UiAddButton, {
                  onClick: ($event) => addToCart(p)
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div><div class="mt-4 flex justify-end" data-v-8f3da8f6${_scopeId}>`);
              _push2(ssrRenderComponent(UiClearCompareButton, {
                size: "sm",
                onClick: ($event) => handleClear()
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "mx-auto max-w-7xl px-4 py-8" }, [
                createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-3" }, [
                  createVNode("div", { class: "min-w-0" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-black dark:text-neutral-100" }, "Comparação de Produtos"),
                    createVNode("p", { class: "text-sm text-black dark:text-neutral-300" }, "Compare as especificações dos produtos selecionados")
                  ]),
                  createVNode(BackToProductsButton, { class: "self-start md:self-auto shrink-0" })
                ]),
                items.value.length < 2 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mt-6 text-black dark:text-neutral-200"
                }, " Selecione ao menos 2 produtos para comparar. ")) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mt-6"
                }, [
                  createVNode("div", { class: "relative -mx-4 md:mx-0 overflow-x-auto" }, [
                    createVNode("div", {
                      class: "grid gap-0 min-w-max",
                      style: gridTemplate.value
                    }, [
                      createVNode("div", { class: "sticky left-0 z-10 rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-semibold border border-neutral-700/60 backdrop-blur-md" }, "Especificação"),
                      (openBlock(true), createBlock(Fragment, null, renderList(items.value, (p) => {
                        return openBlock(), createBlock("div", {
                          key: p.id,
                          class: "rounded-t-lg bg-neutral-800/40 p-2 md:p-4 text-xs md:text-sm border border-neutral-700/60 min-w-[12rem]"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "text-black dark:text-neutral-100 font-semibold truncate" }, toDisplayString(p.part_number || p.id), 1),
                              createVNode("div", { class: "text-[11px] md:text-xs text-black dark:text-blue-300 uppercase" }, toDisplayString(p.categoria || "—"), 1),
                              createVNode("div", { class: "text-[11px] md:text-xs text-black dark:text-neutral-300" }, toDisplayString(p.fabricante || "QUALITEC"), 1)
                            ]),
                            createVNode(UiRemoveButton, {
                              size: "sm",
                              class: "bg-red-50 text-red-700 hover:bg-red-100 border border-red-300 rounded-md shadow-sm dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50 dark:border-red-700",
                              onClick: ($event) => handleRemove(p.id)
                            }, null, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ], 4)
                  ]),
                  createVNode("div", { class: "relative -mx-4 md:mx-0 overflow-x-auto" }, [
                    createVNode("div", {
                      class: "grid gap-0 min-w-max",
                      style: gridTemplate.value
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(specs, (spec) => {
                        return openBlock(), createBlock(Fragment, {
                          key: spec.key
                        }, [
                          createVNode("div", { class: "sticky left-0 z-10 bg-neutral-900/50 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-300 font-medium border border-neutral-700/60 backdrop-blur-md" }, toDisplayString(spec.label), 1),
                          (openBlock(true), createBlock(Fragment, null, renderList(items.value, (p) => {
                            return openBlock(), createBlock("div", {
                              key: p.id + "-" + spec.key,
                              class: ["bg-emerald-900/30 p-2 md:p-3 text-xs md:text-sm text-black dark:text-neutral-100 border border-neutral-700/60 min-w-[12rem]", isDifferent(p, spec) ? "md:diff-glow-red border-red-500/40 bg-red-50/20 dark:bg-red-900/10" : ""]
                            }, [
                              createVNode("span", {
                                class: isDifferent(p, spec) ? "diff-text-red md:diff-text-red" : ""
                              }, toDisplayString(formatValue(p[spec.key], spec)), 3)
                            ], 2);
                          }), 128))
                        ], 64);
                      }), 64))
                    ], 4)
                  ]),
                  createVNode("div", { class: "relative -mx-4 md:mx-0 overflow-x-auto" }, [
                    createVNode("div", {
                      class: "grid gap-0 min-w-max",
                      style: gridTemplate.value
                    }, [
                      createVNode("div", { class: "sticky left-0 z-10 bg-neutral-900/60 p-2 md:p-4 text-xs md:text-sm text-black dark:text-neutral-200 font-medium border border-neutral-700/60 backdrop-blur-md" }, "Ações"),
                      (openBlock(true), createBlock(Fragment, null, renderList(items.value, (p) => {
                        return openBlock(), createBlock("div", {
                          key: p.id + "-actions",
                          class: "bg-neutral-900/60 p-2 md:p-4 border border-neutral-700/60 min-w-[12rem]"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode(UiAddButton, {
                              onClick: ($event) => addToCart(p)
                            }, null, 8, ["onClick"])
                          ])
                        ]);
                      }), 128))
                    ], 4)
                  ]),
                  createVNode("div", { class: "mt-4 flex justify-end" }, [
                    createVNode(UiClearCompareButton, {
                      size: "sm",
                      onClick: ($event) => handleClear()
                    }, null, 8, ["onClick"])
                  ])
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/comparar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comparar = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f3da8f6"]]);

export { comparar as default };
//# sourceMappingURL=comparar-CjW9pDWw.mjs.map
