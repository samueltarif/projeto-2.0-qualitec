import { f as __nuxt_component_0$1, _ as _export_sfc, U as UiModal, k as useFavorites, F as FavoriteIconButton, R as RainbowButton, j as useCart, P as ProductDetailsModal } from './server.mjs';
import { defineComponent, ref, computed, toRefs, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, withModifiers, createCommentVNode, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderAttrs, ssrRenderSlot, ssrRenderTeleport, ssrRenderClass } from 'vue/server-renderer';
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
import 'vue-router';
import '@supabase/ssr';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "UiPanel",
  __ssrInlineRender: true,
  props: {
    class: {},
    variant: { default: "default" },
    align: { default: "start" }
  },
  setup(__props) {
    const props = __props;
    const surfaceDefault = ["bg-white/80 dark:bg-neutral-900/80", "backdrop-blur-sm"];
    const surfaceAccent = [
      "bg-gradient-to-b",
      "from-neutral-50/95 to-neutral-100/70",
      "dark:from-neutral-800/75 dark:to-neutral-900/85",
      "backdrop-blur-sm"
    ];
    const surfaceGlass = ["bg-white/60 dark:bg-neutral-900/40", "backdrop-blur-md"];
    const boxDefault = ["rounded-xl", "shadow-md", "border", "border-neutral-200/70", "dark:border-neutral-800/70"];
    const boxAccent = ["rounded-2xl", "shadow-lg", "ring-1", "ring-neutral-200/60", "dark:ring-neutral-700/50"];
    const boxGlass = ["rounded-xl", "shadow-lg", "border", "border-white/25", "dark:border-white/10"];
    const paddingDefault = ["px-5 sm:px-6", "py-4 sm:py-5"];
    const paddingAccent = ["px-6 sm:px-8", "py-5 sm:py-6"];
    const base2 = [
      ...props.variant === "accent" ? surfaceAccent : props.variant === "glass" ? surfaceGlass : surfaceDefault,
      ...props.variant === "accent" ? boxAccent : props.variant === "glass" ? boxGlass : boxDefault,
      ...props.variant === "accent" ? paddingAccent : paddingDefault
    ].join(" ");
    const alignClass = props.align === "stretch" ? "self-stretch" : props.align === "auto" ? "" : "self-start";
    const classes = [base2, alignClass, props.class].filter(Boolean).join(" ");
    const panelStyle = { marginTop: "5cm" };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(classes),
        style: panelStyle
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiPanel.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const UiPanel = Object.assign(_sfc_main$6, { __name: "UiPanel" });
const base$1 = "px-3 py-1 text-sm !text-black dark:!text-white";
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "UiPrevButton",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean, default: false },
    class: {},
    label: { default: "Anterior" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const classes = [base$1, props.class].filter(Boolean).join(" ");
    function handleClick() {
      if (!props.disabled) emit("click");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        is: "button",
        disabled: __props.disabled,
        class: unref(classes),
        onClick: handleClick,
        "aria-label": "Anterior"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiPrevButton.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const UiPrevButton = Object.assign(_sfc_main$5, { __name: "UiPrevButton" });
const base = "px-3 py-1 text-sm !text-black dark:!text-white";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "UiNextButton",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean, default: false },
    class: {},
    label: { default: "Próxima" }
  },
  emits: ["click"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const classes = [base, props.class].filter(Boolean).join(" ");
    function handleClick() {
      if (!props.disabled) emit("click");
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(RainbowButton, mergeProps({
        is: "button",
        disabled: __props.disabled,
        class: unref(classes),
        onClick: handleClick,
        "aria-label": "Próxima"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(__props.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/UiNextButton.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const UiNextButton = Object.assign(_sfc_main$4, { __name: "UiNextButton" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductActionButtons",
  __ssrInlineRender: true,
  props: {
    item: {},
    class: {},
    orientation: { default: "vertical" },
    fullWidth: { type: Boolean, default: true },
    showDetails: { type: Boolean, default: true },
    showCompare: { type: Boolean, default: true },
    showCart: { type: Boolean, default: true },
    showApplications: { type: Boolean, default: true },
    showTechInfo: { type: Boolean, default: true },
    detailsLabel: { default: "Detalhes" },
    compareLabel: { default: "Comparar Produtos" },
    cartLabel: { default: "Carrinho" },
    applicationsLabel: { default: "Aplicações" },
    techInfoLabel: { default: "Info. Técnicas" }
  },
  emits: ["details", "compare", "cart", "applications", "techInfo"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { add } = useCompare();
    const { add: addCart } = useCart();
    const visible = ref(false);
    const product = ref(null);
    const loading = ref(false);
    const containerClass = computed(() => {
      const base2 = props.orientation === "vertical" ? "mt-2 space-y-2 flex flex-col items-center justify-center" : "mt-2 flex items-center justify-center gap-2";
      return [base2, props.class].filter(Boolean).join(" ");
    });
    const rainbowClass = computed(() => {
      const width = props.fullWidth ? "w-3/4" : "";
      return [width, "h-6 px-4 py-1 gap-1 text-xs !text-black dark:!text-white pointer-events-auto"].filter(Boolean).join(" ");
    });
    async function emitDetails() {
      emit("details", props.item);
      const id = props.item?.id;
      const part = props.item?.part_number ?? props.item?.codigo ?? props.item?.sku;
      if (id == null && !part) return;
      loading.value = true;
      try {
        const data = await $fetch("/api/produtos/details", { params: { id, part_number: part } });
        if (data?.item) {
          product.value = data.item;
          visible.value = true;
        }
      } catch (_) {
      } finally {
        loading.value = false;
      }
    }
    function emitCompare() {
      const item = props.item || {};
      const id = item.id ?? item.part_number ?? item.codigo ?? item.sku;
      const title = item.nome ?? item.descricao ?? item.titulo ?? item.part_number ?? `Produto ${id ?? ""}`;
      const brand = item.fabricante ?? item.marca ?? "QUALITEC";
      if (id != null) {
        add({ id, title, brand });
      }
      emit("compare", props.item);
    }
    function emitCart() {
      const item = props.item || {};
      const id = item.id ?? item.part_number ?? item.codigo ?? item.sku;
      const title = item.nome ?? item.descricao ?? item.titulo ?? item.part_number ?? `Produto ${id ?? ""}`;
      const brand = item.fabricante ?? item.marca ?? "QUALITEC";
      const categoria = item.categoria;
      const diametro_montagem = item.diametro_montagem;
      const conexao_instrumento = item.conexao_instrumento;
      const faixa_trabalho = item.faixa_trabalho;
      const unidade_leitura = item.unidade_leitura;
      if (id != null) {
        addCart({ id, title, brand, categoria, diametro_montagem, conexao_instrumento, faixa_trabalho, unidade_leitura }, 1);
      }
      emit("cart", props.item);
    }
    function emitApplications() {
      emit("applications", props.item);
    }
    function emitTechInfo() {
      emit("techInfo", props.item);
    }
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
      _push(`<!--[--><div class="${ssrRenderClass(containerClass.value)}" data-v-fd7a5ab9>`);
      if (__props.showDetails) {
        _push(ssrRenderComponent(RainbowButton, {
          type: "button",
          class: rainbowClass.value,
          onClick: emitDetails,
          "aria-label": "Detalhes"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="i-lucide-info" data-v-fd7a5ab9${_scopeId}></span> ${ssrInterpolate(__props.detailsLabel)}`);
            } else {
              return [
                createVNode("span", { class: "i-lucide-info" }),
                createTextVNode(" " + toDisplayString(__props.detailsLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showCompare) {
        _push(ssrRenderComponent(RainbowButton, {
          type: "button",
          class: rainbowClass.value,
          onClick: emitCompare,
          "aria-label": "Comparar"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="i-lucide-scale" data-v-fd7a5ab9${_scopeId}></span> ${ssrInterpolate(__props.compareLabel)}`);
            } else {
              return [
                createVNode("span", { class: "i-lucide-scale" }),
                createTextVNode(" " + toDisplayString(__props.compareLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showApplications) {
        _push(ssrRenderComponent(RainbowButton, {
          type: "button",
          class: rainbowClass.value,
          onClick: emitApplications,
          "aria-label": "Aplicações"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="i-lucide-layers" data-v-fd7a5ab9${_scopeId}></span> ${ssrInterpolate(__props.applicationsLabel)}`);
            } else {
              return [
                createVNode("span", { class: "i-lucide-layers" }),
                createTextVNode(" " + toDisplayString(__props.applicationsLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showTechInfo) {
        _push(ssrRenderComponent(RainbowButton, {
          type: "button",
          class: rainbowClass.value,
          onClick: emitTechInfo,
          "aria-label": "Info. Técnicas"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="i-lucide-file-text" data-v-fd7a5ab9${_scopeId}></span> ${ssrInterpolate(__props.techInfoLabel)}`);
            } else {
              return [
                createVNode("span", { class: "i-lucide-file-text" }),
                createTextVNode(" " + toDisplayString(__props.techInfoLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.showCart) {
        _push(ssrRenderComponent(RainbowButton, {
          type: "button",
          class: rainbowClass.value,
          onClick: emitCart,
          "aria-label": "Carrinho"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="i-lucide-shopping-cart" data-v-fd7a5ab9${_scopeId}></span> ${ssrInterpolate(__props.cartLabel)}`);
            } else {
              return [
                createVNode("span", { class: "i-lucide-shopping-cart" }),
                createTextVNode(" " + toDisplayString(__props.cartLabel), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (visible.value && product.value) {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductActionButtons.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ProductActionButtons = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-fd7a5ab9"]]), { __name: "ProductActionButtons" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductCardContent",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  emits: ["details", "compare", "cart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const faixaFormatada = computed(() => {
      const faixa = props.item?.faixa_trabalho ? String(props.item.faixa_trabalho) : "";
      const unidade = props.item?.unidade_leitura ? String(props.item.unidade_leitura) : "";
      return `${faixa}${unidade ? " " + unidade : ""}`;
    });
    const { has, toggle } = useFavorites();
    const favId = computed(() => {
      const i = props.item || {};
      return i.id ?? i.part_number ?? i.codigo ?? i.sku;
    });
    const favTitle = computed(() => {
      const i = props.item || {};
      const id = favId.value;
      return i.nome ?? i.descricao ?? i.titulo ?? i.part_number ?? (id != null ? `Produto ${id}` : "Produto");
    });
    const favBrand = computed(() => {
      const i = props.item || {};
      return i.fabricante ?? i.marca ?? "QUALITEC";
    });
    const isFav = computed(() => {
      const id = favId.value;
      return id != null ? has(id) : false;
    });
    function onToggleFav() {
      const id = favId.value;
      if (id == null) return;
      toggle({ id, title: favTitle.value, brand: favBrand.value });
    }
    const showHelp = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-4 pb-4 pt-6 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-md" }, _attrs))} data-v-cf4adfab><div class="flex items-center justify-between w-full" data-v-cf4adfab><div class="text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400" data-v-cf4adfab>${ssrInterpolate(__props.item.fabricante || "QUALITEC")}</div><div class="ml-auto flex items-center gap-2" data-v-cf4adfab>`);
      _push(ssrRenderComponent(FavoriteIconButton, {
        active: isFav.value,
        size: "w-7 h-7",
        "aria-label": "Favoritar",
        title: "Favoritar",
        onToggle: onToggleFav
      }, null, _parent));
      _push(`<button type="button" class="text-blue-600 hover:text-blue-700 dark:text-blue-400" aria-label="Ajuda" data-v-cf4adfab><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-v-cf4adfab><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8" data-v-cf4adfab></circle><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2-3 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" data-v-cf4adfab></path><circle cx="12" cy="17" r="1" fill="currentColor" data-v-cf4adfab></circle></svg></button></div></div><div class="mt-2 space-y-1 text-sm" data-v-cf4adfab><div class="flex justify-between" data-v-cf4adfab><span class="text-neutral-500 dark:text-neutral-400" data-v-cf4adfab>Diâmetro:</span><span class="font-medium text-neutral-800 dark:text-neutral-100" data-v-cf4adfab>${ssrInterpolate(__props.item.diametro_montagem)}</span></div><div class="flex justify-between" data-v-cf4adfab><span class="text-neutral-500 dark:text-neutral-400" data-v-cf4adfab>Conexão:</span><span class="font-medium text-neutral-800 dark:text-neutral-100" data-v-cf4adfab>${ssrInterpolate(__props.item.conexao_instrumento)}</span></div><div class="flex justify-between" data-v-cf4adfab><span class="text-neutral-500 dark:text-neutral-400" data-v-cf4adfab>Faixa de Pressão:</span><span class="font-medium text-neutral-800 dark:text-neutral-100" data-v-cf4adfab>${ssrInterpolate(faixaFormatada.value)}</span></div></div>`);
      _push(ssrRenderComponent(ProductActionButtons, {
        class: "mt-4",
        item: __props.item,
        onDetails: ($event) => emit("details", __props.item),
        onCompare: ($event) => emit("compare", __props.item),
        onCart: ($event) => emit("cart", __props.item)
      }, null, _parent));
      ssrRenderTeleport(_push, (_push2) => {
        if (showHelp.value) {
          _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" data-v-cf4adfab><div class="absolute inset-0 bg-black/60 backdrop-blur-sm" data-v-cf4adfab></div><div class="relative z-10 mx-4 w-full max-w-[calc(42rem+10cm)] rounded-2xl bg-white/90 dark:bg-neutral-900/80 shadow-2xl ring-1 ring-black/10 dark:ring-white/10" data-v-cf4adfab><div class="flex items-center justify-between px-5 py-4 border-b border-neutral-200/70 dark:border-neutral-800" data-v-cf4adfab><h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100" data-v-cf4adfab>O que é um medidor (Manômetro) de pressão?</h3><button type="button" class="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" aria-label="Fechar" data-v-cf4adfab><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true" data-v-cf4adfab><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" data-v-cf4adfab></path></svg></button></div><div class="px-5 py-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-4 max-h-[70vh] overflow-y-auto" data-v-cf4adfab><p data-v-cf4adfab>Os manômetros são instrumentos para medir e exibir a pressão de um meio. Os manômetros são instrumentos de medição de pressão com elementos de pressão elásticos, que foram usados milhões de vezes em várias aplicações industriais. Dependendo da área de aplicação do manômetro, os tubos Bourdon, elementos de diafragma ou elementos de cápsula são usados como elementos de pressão.</p><h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100" data-v-cf4adfab>Quais pressões são medidas pelos manômetros?</h4><p data-v-cf4adfab>Os manômetros medem a pressão manométrica, a pressão absoluta e a pressão diferencial. Além disso, os manômetros Qualitec podem ser usados não apenas para medir a pressão manométrica positiva, mas também para medir a pressão manométrica negativa.</p><h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100" data-v-cf4adfab>Como funciona um medidor de pressão?</h4><p data-v-cf4adfab>Os manômetros funcionam de forma diferente dependendo do tipo. Na tecnologia de medição industrial, são usados dois tipos diferentes de manômetros - manômetros com tubo Bourdon e manômetros com diafragma. Eles têm princípios funcionais diferentes e, portanto, são adequados para diferentes aplicações.</p><p data-v-cf4adfab>Nos manômetros com tubo Bourdon, a pressão é medida por um tubo Bourdon que transmite a pressão diretamente ao ponteiro. Dentro da caixa há um tubo curvo, no qual o meio entra e faz com que o tubo Bourdon se estique. Esse estiramento é transmitido ao movimento por meio de um segmento dentado e é exibido no mostrador como a deflexão correspondente.</p><p data-v-cf4adfab>Os manômetros de tubo Bourdon podem ser usados de várias maneiras e abrangem a maioria das aplicações. Entretanto, quando atingem seus limites, são usados manômetros de diafragma. Nos manômetros de diafragma, a pressão é transmitida por meio de um diafragma em forma de onda para um elo. Isso transfere a pressão para o movimento.</p><h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100" data-v-cf4adfab>De que material deve ser feito o meu manômetro?</h4><p data-v-cf4adfab>A Qualitec oferece todas as formas comuns de caixas. Para aplicações padrão, uma versão de plástico com um sistema de medição de liga de cobre é suficiente para meios neutros, como ar comprimido, água ou óleo. Para aplicações hidráulicas, recomendamos uma caixa cromada robusta com um enchimento de glicerina que amortece o sistema de medição contra vibrações e, portanto, garante uma boa legibilidade do instrumento.</p><p data-v-cf4adfab>Para tarefas de medição em substâncias agressivas, não altamente viscosas e não cristalizantes, mesmo em ambientes agressivos, as variantes do manômetro feitas de aço inoxidável são adequadas. O sistema de medição também pode ser revestido com um material especial, como PTFE, ouro, Hastelloy e muitos outros. Isso protege o instrumento de meios agressivos.</p><h4 class="mt-2 text-base font-semibold text-neutral-900 dark:text-neutral-100" data-v-cf4adfab>O que significa a classe de precisão de um medidor de pressão?</h4><p data-v-cf4adfab>No mostrador de um medidor de pressão, sempre encontramos uma indicação da classe de precisão. A classe de precisão de um medidor de pressão define o desvio permitido do mostrador em porcentagem do valor total da escala. Para caixas de plástico, esse desvio é de 4% ou 2,5%, enquanto para instrumentos de aço cromado ou aço inoxidável é de 1,6% ou 1,0%.</p><p data-v-cf4adfab>Para manômetros de teste, a classe de precisão é de 0,6%, 0,25% ou até 0,1%, dependendo da faixa de exibição usada. O que isso significa na prática? Com uma faixa de medição de 0 a 100 bar e uma classe de precisão de 1,0%, o desvio permitido é de 1 bar em toda a faixa de medição.</p><div class="mt-3 flex justify-end gap-2" data-v-cf4adfab><button type="button" class="px-3 py-2 text-sm font-medium rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90" data-v-cf4adfab>Entendi</button></div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCardContent.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ProductCardContent = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-cf4adfab"]]), { __name: "ProductCardContent" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductsGrid",
  __ssrInlineRender: true,
  props: {
    items: {},
    loading: { type: Boolean },
    resultsCount: {},
    selectedCategory: {},
    currentPage: {},
    totalPages: {},
    class: {}
  },
  emits: ["details", "compare", "cart", "prev", "next"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { items, loading, resultsCount, selectedCategory, currentPage, totalPages } = toRefs(props);
    const GALLERY_PAGES = [
      "https://ibb.co/cKQDTSdv",
      "https://ibb.co/B2kWrRJ6",
      "https://ibb.co/xqCRsnQF"
    ];
    const showGallery = ref(false);
    const galleryImages = ref([]);
    const galleryOriginals = ref([]);
    const activeImageIndex = ref(0);
    const galleryEl = ref(null);
    function toProxy(url) {
      return url.startsWith("https://ibb.co/") ? `/api/imgbb?u=${encodeURIComponent(url)}` : url;
    }
    function imagesFor(item) {
      return GALLERY_PAGES.map(toProxy);
    }
    function onImgError(e) {
      const target = e.target;
      if (target) target.src = "/manometro.png";
    }
    function openGallery(item, index = 0) {
      galleryImages.value = imagesFor();
      galleryOriginals.value = GALLERY_PAGES.slice();
      activeImageIndex.value = index;
      showGallery.value = true;
    }
    function closeGallery() {
      showGallery.value = false;
    }
    const currentImage = computed(() => {
      const imgs = galleryImages.value;
      if (!imgs || !imgs.length) return "/manometro.png";
      return imgs[Math.max(0, Math.min(activeImageIndex.value, imgs.length - 1))];
    });
    function nextImage() {
      const imgs = galleryImages.value;
      if (!imgs || !imgs.length) return;
      activeImageIndex.value = (activeImageIndex.value + 1) % imgs.length;
    }
    function prevImage() {
      const imgs = galleryImages.value;
      if (!imgs || !imgs.length) return;
      activeImageIndex.value = (activeImageIndex.value + imgs.length - 1) % imgs.length;
    }
    function isIbb(url) {
      return typeof url === "string" && url.startsWith("https://ibb.co/");
    }
    const currentOriginal = computed(() => {
      const origs = galleryOriginals.value;
      if (!origs || !origs.length) return "";
      return origs[Math.max(0, Math.min(activeImageIndex.value, origs.length - 1))];
    });
    function enterFullscreen() {
      try {
        const el = galleryEl.value;
        if (el && el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el && el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        }
      } catch (e) {
      }
    }
    function onKey(e) {
      if (!showGallery.value) return;
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      }
    }
    watch(showGallery, (open) => {
      if (open) {
        (void 0).addEventListener("keydown", onKey);
      } else {
        (void 0).removeEventListener("keydown", onKey);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(UiPanel, {
        class: "flex-1",
        variant: "accent"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h1 class="text-xl font-semibold text-neutral-800 dark:text-neutral-100" data-v-5911e9d6${_scopeId}>Catálogo</h1><p class="mt-2 text-sm text-neutral-600 dark:text-neutral-300" data-v-5911e9d6${_scopeId}>Resultados atuais conforme filtros.</p><div class="mt-4" data-v-5911e9d6${_scopeId}><div class="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300" data-v-5911e9d6${_scopeId}><div data-v-5911e9d6${_scopeId}> Categoria: <span class="font-medium" data-v-5911e9d6${_scopeId}>${ssrInterpolate(unref(selectedCategory))}</span> · Página ${ssrInterpolate(unref(currentPage))} de ${ssrInterpolate(unref(totalPages))}</div><div data-v-5911e9d6${_scopeId}>${ssrInterpolate(unref(resultsCount))} produtos </div></div><div class="mt-4" data-v-5911e9d6${_scopeId}>`);
            if (unref(loading)) {
              _push2(`<div class="py-3 text-neutral-600 dark:text-neutral-300" data-v-5911e9d6${_scopeId}>Carregando...</div>`);
            } else if (unref(items).length === 0) {
              _push2(`<div class="py-3 text-neutral-600 dark:text-neutral-300" data-v-5911e9d6${_scopeId}>Nenhum produto encontrado.</div>`);
            } else {
              _push2(`<div class="neon-green-wrap" data-v-5911e9d6${_scopeId}><div class="grid grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-8" data-v-5911e9d6${_scopeId}><!--[-->`);
              ssrRenderList(unref(items), (item) => {
                _push2(`<div class="rounded-xl overflow-hidden border border-white/25 dark:border-white/10 shadow-lg bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md" data-v-5911e9d6${_scopeId}><div class="relative group" data-v-5911e9d6${_scopeId}><img${ssrRenderAttr("src", imagesFor()[0])} class="h-28 w-full object-cover" alt="Imagem do produto" data-v-5911e9d6${_scopeId}><div class="absolute bottom-2 right-2 flex gap-2" data-v-5911e9d6${_scopeId}><!--[-->`);
                ssrRenderList(imagesFor().slice(1, 3), (img, i) => {
                  _push2(`<button type="button" class="h-9 w-9 rounded-md overflow-hidden shadow-sm ring-1 ring-white/40 dark:ring-neutral-700/60"${ssrRenderAttr("aria-label", "Abrir imagem " + (i + 2))} data-v-5911e9d6${_scopeId}><img${ssrRenderAttr("src", img)} class="h-full w-full object-cover" alt="Miniatura" data-v-5911e9d6${_scopeId}></button>`);
                });
                _push2(`<!--]--></div></div>`);
                _push2(ssrRenderComponent(ProductCardContent, {
                  item,
                  onDetails: ($event) => emit("details", item),
                  onCompare: ($event) => emit("compare", item),
                  onCart: ($event) => emit("cart", item)
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            }
            _push2(`</div><div class="mt-6 flex items-center justify-between" data-v-5911e9d6${_scopeId}>`);
            _push2(ssrRenderComponent(UiPrevButton, {
              disabled: unref(currentPage) <= 1 || unref(loading),
              onClick: ($event) => emit("prev")
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(UiNextButton, {
              disabled: unref(currentPage) >= unref(totalPages) || unref(loading),
              onClick: ($event) => emit("next")
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300" data-v-5911e9d6${_scopeId}><div data-v-5911e9d6${_scopeId}> Categoria: <span class="font-medium" data-v-5911e9d6${_scopeId}>${ssrInterpolate(unref(selectedCategory))}</span> · Página ${ssrInterpolate(unref(currentPage))} de ${ssrInterpolate(unref(totalPages))}</div><div data-v-5911e9d6${_scopeId}>${ssrInterpolate(unref(resultsCount))} produtos </div></div></div>`);
          } else {
            return [
              createVNode("h1", { class: "text-xl font-semibold text-neutral-800 dark:text-neutral-100" }, "Catálogo"),
              createVNode("p", { class: "mt-2 text-sm text-neutral-600 dark:text-neutral-300" }, "Resultados atuais conforme filtros."),
              createVNode("div", { class: "mt-4" }, [
                createVNode("div", { class: "flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300" }, [
                  createVNode("div", null, [
                    createTextVNode(" Categoria: "),
                    createVNode("span", { class: "font-medium" }, toDisplayString(unref(selectedCategory)), 1),
                    createTextVNode(" · Página " + toDisplayString(unref(currentPage)) + " de " + toDisplayString(unref(totalPages)), 1)
                  ]),
                  createVNode("div", null, toDisplayString(unref(resultsCount)) + " produtos ", 1)
                ]),
                createVNode("div", { class: "mt-4" }, [
                  unref(loading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "py-3 text-neutral-600 dark:text-neutral-300"
                  }, "Carregando...")) : unref(items).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "py-3 text-neutral-600 dark:text-neutral-300"
                  }, "Nenhum produto encontrado.")) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "neon-green-wrap"
                  }, [
                    createVNode("div", { class: "grid grid-cols-2 2xl:grid-cols-3 gap-6 2xl:gap-8" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(items), (item) => {
                        return openBlock(), createBlock("div", {
                          key: item.id,
                          class: "rounded-xl overflow-hidden border border-white/25 dark:border-white/10 shadow-lg bg-white/60 dark:bg-neutral-900/40 backdrop-blur-md"
                        }, [
                          createVNode("div", { class: "relative group" }, [
                            createVNode("img", {
                              src: imagesFor()[0],
                              class: "h-28 w-full object-cover",
                              alt: "Imagem do produto",
                              onError: onImgError,
                              onClick: ($event) => openGallery(item, 0)
                            }, null, 40, ["src", "onClick"]),
                            createVNode("div", { class: "absolute bottom-2 right-2 flex gap-2" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(imagesFor().slice(1, 3), (img, i) => {
                                return openBlock(), createBlock("button", {
                                  key: "thumb-" + i,
                                  type: "button",
                                  class: "h-9 w-9 rounded-md overflow-hidden shadow-sm ring-1 ring-white/40 dark:ring-neutral-700/60",
                                  onClick: withModifiers(($event) => openGallery(item, i + 1), ["stop"]),
                                  "aria-label": "Abrir imagem " + (i + 2)
                                }, [
                                  createVNode("img", {
                                    src: img,
                                    class: "h-full w-full object-cover",
                                    alt: "Miniatura",
                                    onError: onImgError
                                  }, null, 40, ["src"])
                                ], 8, ["onClick", "aria-label"]);
                              }), 128))
                            ])
                          ]),
                          createVNode(ProductCardContent, {
                            item,
                            onDetails: ($event) => emit("details", item),
                            onCompare: ($event) => emit("compare", item),
                            onCart: ($event) => emit("cart", item)
                          }, null, 8, ["item", "onDetails", "onCompare", "onCart"])
                        ]);
                      }), 128))
                    ])
                  ]))
                ]),
                createVNode("div", { class: "mt-6 flex items-center justify-between" }, [
                  createVNode(UiPrevButton, {
                    disabled: unref(currentPage) <= 1 || unref(loading),
                    onClick: ($event) => emit("prev")
                  }, null, 8, ["disabled", "onClick"]),
                  createVNode(UiNextButton, {
                    disabled: unref(currentPage) >= unref(totalPages) || unref(loading),
                    onClick: ($event) => emit("next")
                  }, null, 8, ["disabled", "onClick"])
                ]),
                createVNode("div", { class: "mt-3 flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-300" }, [
                  createVNode("div", null, [
                    createTextVNode(" Categoria: "),
                    createVNode("span", { class: "font-medium" }, toDisplayString(unref(selectedCategory)), 1),
                    createTextVNode(" · Página " + toDisplayString(unref(currentPage)) + " de " + toDisplayString(unref(totalPages)), 1)
                  ]),
                  createVNode("div", null, toDisplayString(unref(resultsCount)) + " produtos ", 1)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(UiModal, {
        visible: showGallery.value,
        "with-backdrop": true,
        "close-on-backdrop": true,
        "close-on-esc": true,
        "show-close-button": true,
        "close-button-placement": "left",
        "panel-class": "w-screen h-screen p-0 bg-transparent",
        onClose: closeGallery
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="relative w-full h-full" data-v-5911e9d6${_scopeId}><img${ssrRenderAttr("src", currentImage.value)} class="max-h-full h-full w-auto max-w-full mx-auto object-contain" alt="Imagem ampliada" data-v-5911e9d6${_scopeId}><button type="button" class="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl" aria-label="Imagem anterior" data-v-5911e9d6${_scopeId}> &lt; </button><button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl" aria-label="Próxima imagem" data-v-5911e9d6${_scopeId}> &gt; </button><div class="absolute top-2 right-2 flex items-center gap-3" data-v-5911e9d6${_scopeId}><button type="button" class="rounded-md bg-white/80 dark:bg-neutral-800/80 px-3 py-1 text-sm shadow" data-v-5911e9d6${_scopeId}> Tela cheia </button></div></div><div class="mt-3 text-center" data-v-5911e9d6${_scopeId}>`);
            if (currentOriginal.value && isIbb(currentOriginal.value)) {
              _push2(`<a${ssrRenderAttr("href", currentOriginal.value)} target="_blank" rel="noopener noreferrer" class="text-sm text-blue-600 hover:underline dark:text-blue-400" data-v-5911e9d6${_scopeId}> Abrir imagem original </a>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "galleryEl",
                ref: galleryEl,
                class: "relative w-full h-full"
              }, [
                createVNode("img", {
                  src: currentImage.value,
                  class: "max-h-full h-full w-auto max-w-full mx-auto object-contain",
                  alt: "Imagem ampliada",
                  onError: onImgError
                }, null, 40, ["src"]),
                createVNode("button", {
                  type: "button",
                  class: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl",
                  onClick: prevImage,
                  "aria-label": "Imagem anterior"
                }, " < "),
                createVNode("button", {
                  type: "button",
                  class: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 px-3 py-2 shadow text-2xl",
                  onClick: nextImage,
                  "aria-label": "Próxima imagem"
                }, " > "),
                createVNode("div", { class: "absolute top-2 right-2 flex items-center gap-3" }, [
                  createVNode("button", {
                    type: "button",
                    class: "rounded-md bg-white/80 dark:bg-neutral-800/80 px-3 py-1 text-sm shadow",
                    onClick: enterFullscreen
                  }, " Tela cheia ")
                ])
              ], 512),
              createVNode("div", { class: "mt-3 text-center" }, [
                currentOriginal.value && isIbb(currentOriginal.value) ? (openBlock(), createBlock("a", {
                  key: 0,
                  href: currentOriginal.value,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  class: "text-sm text-blue-600 hover:underline dark:text-blue-400"
                }, " Abrir imagem original ", 8, ["href"])) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductsGrid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProductsGrid = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-5911e9d6"]]), { __name: "ProductsGrid" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "produtos",
  __ssrInlineRender: true,
  setup(__props) {
    const resultsCount = ref(0);
    const currentPage = ref(1);
    const pageSize = ref(6);
    const selectedCategory = ref("Todas as categorias");
    const activeFiltersState = ref({});
    const items = ref([]);
    const loading = ref(false);
    const totalPages = computed(() => Math.max(1, Math.ceil(resultsCount.value / pageSize.value)));
    async function fetchProducts() {
      loading.value = true;
      try {
        const data = await $fetch("/api/produtos/search", {
          params: {
            categoria: selectedCategory.value,
            page: currentPage.value,
            pageSize: pageSize.value,
            filters: JSON.stringify(activeFiltersState.value)
          }
        });
        items.value = data?.items || [];
        resultsCount.value = data?.total || 0;
      } catch (e) {
      } finally {
        loading.value = false;
      }
    }
    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value -= 1;
        fetchProducts();
      }
    }
    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value += 1;
        fetchProducts();
      }
    }
    function onDetails(item) {
      console.log("Detalhes", item?.id || item?.part_number);
    }
    function onCompare(item) {
      console.log("Comparar", item?.id || item?.part_number);
    }
    function addToCart(item) {
      console.log("Adicionar ao carrinho", item?.id || item?.part_number);
    }
    ref(false);
    ref([]);
    ref("");
    ref(false);
    ref([]);
    ref(false);
    ref("");
    ref(false);
    ref(false);
    ref([]);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<!--[--><section class="min-h-screen w-full relative overflow-hidden"><div class="relative z-10 mx-auto max-w-7xl 2xl:max-w-[1600px] px-4 2xl:px-6 py-8"><div class="flex flex-col md:flex-row gap-6">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(ProductsGrid, {
        items: items.value,
        loading: loading.value,
        "results-count": resultsCount.value,
        "selected-category": selectedCategory.value,
        "current-page": currentPage.value,
        "total-pages": totalPages.value,
        onDetails,
        onCompare,
        onCart: addToCart,
        onPrev: prevPage,
        onNext: nextPage
      }, null, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div></section>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/produtos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=produtos-DqVQwF-e.mjs.map
