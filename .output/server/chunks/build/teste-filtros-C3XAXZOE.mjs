import { mergeProps, ref, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
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

const _sfc_main$1 = {
  __name: "TesteFiltros",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const error = ref("");
    const filters = ref([]);
    const apiData = ref(null);
    const debugInfo = computed(() => ({
      filters: filters.value,
      apiData: apiData.value,
      loading: loading.value,
      error: error.value
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-60f7050a><h2 data-v-60f7050a>Teste de Filtros</h2>`);
      if (loading.value) {
        _push(`<div data-v-60f7050a>Carregando filtros...</div>`);
      } else if (error.value) {
        _push(`<div class="error" data-v-60f7050a>Erro: ${ssrInterpolate(error.value)}</div>`);
      } else {
        _push(`<div data-v-60f7050a><!--[-->`);
        ssrRenderList(filters.value, (filter) => {
          _push(`<div class="filter-section" data-v-60f7050a><h3 data-v-60f7050a>${ssrInterpolate(filter.label)}</h3>`);
          if (filter.options && filter.options.length) {
            _push(`<select data-v-60f7050a><option value="" data-v-60f7050a>Todos</option><!--[-->`);
            ssrRenderList(filter.options, (option) => {
              _push(`<option${ssrRenderAttr("value", option)} data-v-60f7050a>${ssrInterpolate(option)}</option>`);
            });
            _push(`<!--]--></select>`);
          } else {
            _push(`<p class="empty" data-v-60f7050a>Sem opções disponíveis</p>`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`<div class="debug" data-v-60f7050a><h3 data-v-60f7050a>Debug Info:</h3><pre data-v-60f7050a>${ssrInterpolate(debugInfo.value)}</pre></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TesteFiltros.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TesteFiltros = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-60f7050a"]]);
const _sfc_main = {
  __name: "teste-filtros",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8" }, _attrs))}><h1 class="text-2xl font-bold mb-6">Teste de Filtros</h1>`);
      _push(ssrRenderComponent(TesteFiltros, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/teste-filtros.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=teste-filtros-C3XAXZOE.mjs.map
