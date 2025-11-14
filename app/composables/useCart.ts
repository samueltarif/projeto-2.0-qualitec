import { ref, computed } from 'vue';

export interface CartItem {
  id: string | number;
  title?: string;
  brand?: string;
  quantity: number;
  // Campos adicionais para exibir no modal do carrinho
  categoria?: string;
  diametro_montagem?: string;
  conexao_instrumento?: string;
  faixa_trabalho?: string;
  unidade_leitura?: string;
  notes?: string;
}

const items = ref<CartItem[]>([]);

// Load from localStorage (client-only)
if (typeof window !== 'undefined') {
  try {
    const saved = window.localStorage.getItem('cart-items');
    if (saved) {
      const parsed: CartItem[] = JSON.parse(saved);
      if (Array.isArray(parsed)) items.value = parsed.filter(Boolean);
    }
  } catch (_) {
    // ignore
  }
}

function persist() {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('cart-items', JSON.stringify(items.value));
    } catch (_) {
      // ignore
    }
  }
}

function add(product: { id: CartItem['id']; title?: string; brand?: string; categoria?: string; diametro_montagem?: string; conexao_instrumento?: string; faixa_trabalho?: string; unidade_leitura?: string }, qty = 1) {
  if (!product || product.id == null) return { ok: false as const, reason: 'invalid' as const };
  const found = items.value.find((p) => p.id === product.id);
  if (found) {
    found.quantity += Math.max(1, qty);
  } else {
    items.value.push({
      id: product.id,
      title: product.title,
      brand: product.brand,
      categoria: product.categoria,
      diametro_montagem: product.diametro_montagem,
      conexao_instrumento: product.conexao_instrumento,
      faixa_trabalho: product.faixa_trabalho,
      unidade_leitura: product.unidade_leitura,
      quantity: Math.max(1, qty),
    });
  }
  persist();
  return { ok: true as const };
}

function decrement(id: CartItem['id'], qty = 1) {
  const found = items.value.find((p) => p.id === id);
  if (!found) return;
  found.quantity = Math.max(0, found.quantity - Math.max(1, qty));
  if (found.quantity === 0) items.value = items.value.filter((p) => p.id !== id);
  persist();
}

function remove(id: CartItem['id']) {
  items.value = items.value.filter((p) => p.id !== id);
  persist();
}

function clear() {
  items.value = [];
  persist();
}

const count = computed(() => items.value.reduce((sum, p) => sum + (p.quantity || 0), 0));
const has = (id: CartItem['id']) => items.value.some((p) => p.id === id);
function setQuantity(id: CartItem['id'], qty: number) {
  const found = items.value.find((p) => p.id === id);
  if (!found) return;
  found.quantity = Math.max(1, Number.isFinite(qty) ? qty : 1);
  persist();
}
function setNotes(id: CartItem['id'], notes: string) {
  const found = items.value.find((p) => p.id === id);
  if (!found) return;
  found.notes = String(notes ?? '');
  persist();
}

export function useCart() {
  return { items, add, remove, decrement, clear, count, has, setQuantity, setNotes };
}