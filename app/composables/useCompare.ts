import { ref, computed } from 'vue';

export interface CompareItem {
  id: string | number;
  title: string;
  brand?: string;
}

const MAX_ITEMS = 3;
const items = ref<CompareItem[]>([]);

// Load persisted items (client-side only)
if (typeof window !== 'undefined') {
  try {
    const saved = window.localStorage.getItem('compare-items');
    if (saved) {
      const parsed: CompareItem[] = JSON.parse(saved);
      items.value = Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
    }
  } catch (_) {
    // ignore
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('compare-items', JSON.stringify(items.value));
    } catch (_) {
      // ignore
    }
  }
}

function add(product: CompareItem) {
  if (items.value.find((p) => p.id === product.id)) {
    return { ok: false, reason: 'exists' as const };
  }
  if (items.value.length >= MAX_ITEMS) {
    return { ok: false, reason: 'full' as const };
  }
  items.value.push(product);
  persist();
  return { ok: true as const };
}

function remove(id: CompareItem['id']) {
  items.value = items.value.filter((p) => p.id !== id);
  persist();
}

function clear() {
  items.value = [];
  persist();
}

const count = computed(() => items.value.length);
const isFull = computed(() => count.value >= MAX_ITEMS);
const canCompare = computed(() => count.value >= 2);
const has = (id: CompareItem['id']) => items.value.some((p) => p.id === id);

export function useCompare() {
  return {
    items,
    add,
    remove,
    clear,
    count,
    isFull,
    canCompare,
    has,
    MAX_ITEMS,
  };
}