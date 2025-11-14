import { ref, computed, watch } from 'vue';
import { useUserProfile } from '~/composables/useUserProfile';

export interface FavoriteItem {
  id: string | number;
  title?: string;
  brand?: string;
  alias?: string;
}

// Estado compartilhado em módulo (persistido em localStorage e/ou servidor)
const items = ref<FavoriteItem[]>([]);

// Identidade do usuário (email + empresaId). Se disponível, usa servidor.
const { email, empresaId } = useUserProfile();
const serverEnabled = computed(() => !!email.value && !!empresaId.value && Number(empresaId.value) > 0);

function getStorageKey() {
  const e = String(email.value || '').trim();
  const emp = Number(empresaId.value);
  if (e && Number.isFinite(emp)) return `favorite-items:${e}:${emp}`;
  return 'favorite-items';
}

function reloadFromLocal() {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey();
    const saved = window.localStorage.getItem(key);
    if (saved) {
      const parsed: FavoriteItem[] = JSON.parse(saved);
      if (Array.isArray(parsed)) items.value = parsed.filter(Boolean);
    } else {
      items.value = [];
    }
  } catch (_) {
    // ignore
  }
}

// Carrega inicialmente do storage (chaveado por usuário quando disponível)
if (typeof window !== 'undefined') {
  // limpar chave legada não chaveada (evita vazamento entre usuários)
  try { window.localStorage.removeItem('favorite-items'); } catch (_) {}
  reloadFromLocal();
}

function persist() {
  if (typeof window !== 'undefined') {
    try {
      const key = getStorageKey();
      window.localStorage.setItem(key, JSON.stringify(items.value));
    } catch (_) {
      // ignore
    }
  }
}

async function reloadFromServer() {
  if (!serverEnabled.value) return;
  try {
    const data: any = await $fetch('/api/favoritos/list', {
      params: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value) }
    });
    const list: FavoriteItem[] = Array.isArray(data?.items) ? data.items : [];
    items.value = list.map((it: any) => ({ id: it.id, alias: it.alias }));
    persist();
  } catch (err) {
    // fallback silencioso
  }
}

// Recarrega automaticamente quando o usuário está disponível
if (typeof window !== 'undefined') {
  watch(serverEnabled, (v) => { if (v) reloadFromServer(); else reloadFromLocal(); }, { immediate: true });
  // Também recarrega localmente quando mudam email/empresa sem servidor
  watch([email, empresaId], () => { if (!serverEnabled.value) reloadFromLocal(); });
}

function has(id: FavoriteItem['id']) {
  return items.value.some((p) => p.id === id);
}

async function add(item: FavoriteItem) {
  if (item.id == null) return { ok: false as const, reason: 'invalid' as const };
  if (has(item.id)) return { ok: false as const, reason: 'exists' as const };
  if (serverEnabled.value) {
    try {
      const res: any = await $fetch('/api/favoritos/toggle', {
        method: 'POST', body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id: item.id }
      });
      if (res?.success) {
        await reloadFromServer();
        return { ok: true as const };
      }
    } catch (_) {}
    return { ok: false as const, reason: 'server' as const };
  }
  items.value.push({ id: item.id, title: item.title, brand: item.brand });
  persist();
  return { ok: true as const };
}

async function remove(id: FavoriteItem['id']) {
  if (serverEnabled.value) {
    try {
      const res: any = await $fetch('/api/favoritos/toggle', {
        method: 'POST', body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id }
      });
      if (res?.success) {
        await reloadFromServer();
        return;
      }
    } catch (_) {}
  }
  items.value = items.value.filter((p) => p.id !== id);
  persist();
}

async function toggle(item: FavoriteItem) {
  if (serverEnabled.value) {
    try {
      const res: any = await $fetch('/api/favoritos/toggle', {
        method: 'POST', body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id: item.id }
      });
      if (res?.success) {
        await reloadFromServer();
        return { ok: true as const, active: !!res.active };
      }
    } catch (_) {}
    return { ok: false as const, active: has(item.id) };
  }
  if (has(item.id)) {
    await remove(item.id);
    return { ok: true as const, active: false };
  } else {
    const res = await add(item);
    return { ok: res.ok, active: res.ok ? true : false };
  }
}

async function setAlias(id: FavoriteItem['id'], alias: string) {
  if (serverEnabled.value) {
    try {
      const res: any = await $fetch('/api/favoritos/alias', {
        method: 'POST', body: { email: String(email.value).toUpperCase(), empresaId: Number(empresaId.value), id, alias }
      });
      if (res?.success) {
        await reloadFromServer();
        return true;
      }
    } catch (_) {}
    return false;
  }
  // fallback local: persiste alias em localStorage
  const list = items.value.map((p) => (p.id === id ? { ...p, alias } : p));
  items.value = list;
  persist();
  return true;
}

const count = computed(() => items.value.length);

export function useFavorites() {
  return {
    items,
    add,
    remove,
    toggle,
    has,
    setAlias,
    count,
    refreshFromServer: reloadFromServer,
  };
}