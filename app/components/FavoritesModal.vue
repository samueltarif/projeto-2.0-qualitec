<template>
  <UiModal
    :visible="visible"
    panel-class="w-[92vw] max-w-5xl max-h-[85vh] overflow-y-auto p-6 bg-white/95 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl shadow-xl"
    @close="$emit('close')"
  >
    <div class="flex items-center justify-between mb-4 gap-3">
      <h2 class="text-xl font-semibold">Favoritos</h2>
      <div class="w-full max-w-xs">
        <UiInput
          v-model="query"
          :placeholder="'Pesquisar favoritos...'"
          aria-label="Pesquisar favoritos"
        />
      </div>
    </div>

    <div v-if="loading" class="py-10 text-center opacity-70">Carregando favoritos...</div>
    <div v-else>
      <div v-if="products.length === 0" class="py-10 text-center opacity-70">
        Nenhum produto favoritado ainda.
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="p in filteredProducts" :key="p.id || p.part_number" class="rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 p-3 bg-white/70 dark:bg-neutral-800/70">
          <div class="aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-700">
            <img :src="firstImage(p)" alt="Imagem do produto" class="w-full h-full object-cover" @error="(e) => (e.target as HTMLImageElement).src = '/images/manometro.png'" />
          </div>
          <div class="mt-3">
            <div class="text-sm opacity-70">Nome personalizado</div>
            <div class="mt-1 flex items-center gap-2">
              <UiInput
                v-model="aliasEditing[favKey(p)]"
                :placeholder="'Opcional: nome ou número'"
                @blur="saveAlias(p)"
                @keyup.enter="saveAlias(p)"
              />
              <Button variant="outline" size="xs" @click="saveAlias(p)">Salvar</Button>
            </div>
          </div>
          <div class="mt-3">
            <div class="text-sm opacity-70">Part Number</div>
            <div class="text-base font-medium truncate">{{ p.part_number ?? p.id }}</div>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <RainbowButton class="flex-1" @click="openDetails(p)">Ver detalhes</RainbowButton>
          </div>
        </div>
      </div>
    </div>

    <ProductDetailsModal
      :visible="showDetails"
      :product="selectedProduct"
      @close="showDetails = false"
    />
  </UiModal>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue'
import UiModal from '~/components/ui/UiModal.vue'
import UiInput from '~/components/ui/Input.vue'
import Button from '~/components/ui/Button.vue'
import RainbowButton from '~/components/ui/RainbowButton.vue'
import ProductDetailsModal from '~/components/ProductDetailsModal.vue'
import { useFavorites } from '~/composables/useFavorites'

const props = defineProps<{ visible: boolean }>()
defineEmits(['close'])

const { items, setAlias } = useFavorites()
const loading = ref(false)
const details = ref<Record<string, any>>({})
const aliasEditing = ref<Record<string, string>>({})
const query = ref('')

const products = computed(() => Object.values(details.value))
const filteredProducts = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = products.value as any[]
  if (!q) return list
  return list.filter((p: any) => {
    const alias = aliasFor(p).toLowerCase()
    const idStr = p?.id != null ? String(p.id).toLowerCase() : ''
    const part = p?.part_number ? String(p.part_number).toLowerCase() : ''
    const nome = String(p?.nome || '').toLowerCase()
    const desc = String(p?.descricao || '').toLowerCase()
    const titulo = String(p?.titulo || '').toLowerCase()
    const fab = String(p?.fabricante || p?.marca || '').toLowerCase()
    const cat = String(p?.categoria || '').toLowerCase()
    return [alias, idStr, part, nome, desc, titulo, fab, cat].some(s => s && s.includes(q))
  })
})

const aliasMap = computed(() => {
  const map = new Map<string, string>()
  ;(items.value || []).forEach((f: any) => {
    if (f && f.id != null) map.set(String(f.id), String(f.alias || ''))
  })
  return map
})

function favKey(p: any): string {
  const id = p?.id
  const part = p?.part_number
  if (id != null && aliasMap.value.has(String(id))) return String(id)
  if (part != null && aliasMap.value.has(String(part))) return String(part)
  return String(id ?? part ?? '')
}

function syncAliasEditing() {
  const dict: Record<string, string> = {}
  ;(items.value || []).forEach((f: any) => {
    if (f && f.id != null) dict[String(f.id)] = String(f.alias || '')
  })
  aliasEditing.value = dict
}

function aliasFor(p: any): string {
  const key = favKey(p)
  const fromEdit = aliasEditing.value[key]
  if (fromEdit) return fromEdit
  const fromMap = aliasMap.value.get(key)
  return typeof fromMap === 'string' ? fromMap : ''
}

async function fetchDetailsForFavorites() {
  loading.value = true
  try {
    const ids = items.value.map((f: any) => f?.id).filter((id: any) => id != null)
    const results = await Promise.all(
      ids.map(async (rawId) => {
        const idStr = String(rawId)
        const isNumeric = /^\d+$/.test(idStr)
        const params = isNumeric ? { id: Number(idStr) } : { part_number: idStr }
        try {
          const data: any = await $fetch('/api/produtos/details', { params })
          const item = data?.item || null
          if (item) return { key: idStr, item }
        } catch (err) {
          console.warn('Falha ao buscar detalhes do favorito', rawId, err)
        }
        return { key: idStr, item: null }
      })
    )
    const dict: Record<string, any> = {}
    for (const r of results) {
      if (r.item) dict[r.key] = r.item
    }
    details.value = dict
    syncAliasEditing()
  } finally {
    loading.value = false
  }
}

function parseImages(imagens: any): string[] {
  try {
    if (!imagens) return []
    if (Array.isArray(imagens)) return imagens
    const parsed = JSON.parse(typeof imagens === 'string' ? imagens : String(imagens))
    if (Array.isArray(parsed)) return parsed
    if (Array.isArray(parsed?.images)) return parsed.images
    return []
  } catch {
    return []
  }
}

function isIbb(url: string) {
  return typeof url === 'string' && url.startsWith('https://ibb.co/')
}

function toProxy(url: string): string {
  return isIbb(url) ? `/api/imgbb?u=${encodeURIComponent(url)}` : url
}

function resolveImage(token: any): string {
  if (!token) return ''
  const s = String(token)
  if (/^https?:\/\//i.test(s)) return toProxy(s)
  // Remove prefix 'public/' e barras iniciais
  const clean = s.replace(/^public\//i, '').replace(/^\/+/, '')
  return `/${clean}`
}

function firstImage(p: any): string {
  const raw = parseImages(p?.imagens)
  const urls = raw
    .map(resolveImage)
    .filter((x: string) => typeof x === 'string' && !x.toLowerCase().endsWith('.pdf'))
  const img = urls[0]
  return img || '/images/manometro.png'
}

const showDetails = ref(false)
const selectedProduct = ref<any>(null)
function openDetails(p: any) {
  selectedProduct.value = p
  showDetails.value = true
}

onMounted(() => {
  if (props.visible) fetchDetailsForFavorites()
})

watch(
  () => props.visible,
  (v) => {
    if (v) fetchDetailsForFavorites()
  }
)

watch(items, () => {
  syncAliasEditing()
  if (props.visible) fetchDetailsForFavorites()
})

async function saveAlias(p: any) {
  const key = favKey(p)
  const alias = aliasEditing.value[key] ?? ''
  await setAlias?.(key, alias)
}
</script>

<style scoped>
</style>