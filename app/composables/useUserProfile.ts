import { ref, computed } from 'vue';

export interface UserProfilePayload {
  fullName: string;
  sector: string;
  whatsapp: string;
}

// Estados compartilhados ao nível de módulo (uma instância para todo o app)
const email = ref('');
const empresaId = ref<number | null>(null);
const fullName = ref('');
const sector = ref('');
const whatsapp = ref('');
let initialized = false;

function getStorageKey(e?: string, emp?: number | null) {
  const emailKey = ((e ?? email.value) ?? '').trim()
  const empresaKey = emp ?? empresaId.value
  if (emailKey && empresaKey != null && Number.isFinite(empresaKey)) {
    return `userProfile:${emailKey}:${empresaKey}`
  }
  return 'userProfile'
}

function initLoad() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  try {
    const e = localStorage.getItem('userEmail');
    if (e) email.value = e;
    const emp = localStorage.getItem('empresaId');
    if (emp) {
      const parsed = Number(emp);
      empresaId.value = Number.isFinite(parsed) ? parsed : null;
    }
    // Carrega do storage chaveado por usuário (email+empresa). Evita vazamento entre usuários.
    const key = getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) {
      const obj = JSON.parse(stored || '{}');
      fullName.value = obj.fullName || '';
      sector.value = obj.sector || '';
      whatsapp.value = obj.whatsapp || '';
    }
  } catch (_) {
    // silent
  }
}

function save() {
  if (typeof window === 'undefined') return;
  try {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify({
      fullName: fullName.value,
      sector: sector.value,
      whatsapp: whatsapp.value,
    }));
  } catch (_) {
    // silent
  }
}

function setEmail(e: string) {
  email.value = e || '';
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('userEmail', email.value);
      // limpar storage legado não chaveado
      try { localStorage.removeItem('userProfile'); } catch (_) {}
    } catch (_) {}
  }
}

function setEmpresaId(id: number | null | undefined) {
  const val = typeof id === 'number' && Number.isFinite(id) ? id : null;
  empresaId.value = val;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('empresaId', val != null ? String(val) : '');
      // limpar storage legado não chaveado
      try { localStorage.removeItem('userProfile'); } catch (_) {}
    } catch (_) {}
  }
}

const whatsappDigits = computed(() => (whatsapp.value || '').replace(/\D/g, ''));
// Critério de completude: apenas os campos do modal (nome, setor, whatsapp)
const isComplete = computed(() => {
  return fullName.value.trim().length >= 3 && sector.value.trim().length >= 2 && whatsappDigits.value.length === 13;
});
const isIncomplete = computed(() => !isComplete.value);

function saveProfile(payload: UserProfilePayload) {
  fullName.value = (payload.fullName || '').trim();
  sector.value = (payload.sector || '').trim();
  whatsapp.value = (payload.whatsapp || '').trim();
  save();
}

async function refreshFromServer() {
  // Busca no backend o perfil do usuário atual (email+empresa)
  const e = (email.value || '').trim();
  const emp = empresaId.value;
  if (!e || emp == null || !Number.isFinite(emp)) return;
  try {
    const params = new URLSearchParams({ email: e, empresaId: String(emp) });
    const resp = await fetch(`/api/user/profile?${params.toString()}`);
    const data = await resp.json();
    if (data?.success && data?.profile) {
      fullName.value = String(data.profile.fullName || '');
      sector.value = String(data.profile.sector || '');
      whatsapp.value = String(data.profile.whatsapp || '');
      save();
    }
  } catch (_) {
    // silencioso
  }
}

export function useUserProfile() {
  initLoad();
  return { email, empresaId, fullName, sector, whatsapp, isComplete, isIncomplete, setEmail, setEmpresaId, saveProfile, refreshFromServer };
}