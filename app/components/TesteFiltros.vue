<template>
  <div>
    <h2>Teste de Filtros</h2>
    <div v-if="loading">Carregando filtros...</div>
    <div v-else-if="error" class="error">Erro: {{ error }}</div>
    <div v-else>
      <div v-for="filter in filters" :key="filter.key" class="filter-section">
        <h3>{{ filter.label }}</h3>
        <select v-if="filter.options && filter.options.length">
          <option value="">Todos</option>
          <option v-for="option in filter.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
        <p v-else class="empty">Sem opções disponíveis</p>
      </div>
    </div>
    
    <!-- Debug info -->
    <div class="debug">
      <h3>Debug Info:</h3>
      <pre>{{ debugInfo }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const loading = ref(true)
const error = ref('')
const filters = ref([])
const apiData = ref(null)

const debugInfo = computed(() => ({
  filters: filters.value,
  apiData: apiData.value,
  loading: loading.value,
  error: error.value
}))

onMounted(async () => {
  try {
    console.log('Iniciando carregamento de filtros...')
    
    const response = await fetch('/api/produtos/distinct?categoria=Manômetros&limit=500')
    const data = await response.json()
    
    console.log('Dados recebidos:', data)
    apiData.value = data
    
    if (data.values) {
      console.log('data.values.tipo_medicao:', data.values.tipo_medicao)
      console.log('data.values.certificados:', data.values.certificados)
      
      // Mapear os filtros que queremos testar
      filters.value = [
        {
          key: 'tipo_medicao',
          label: 'Tipo de Medição',
          options: data.values.tipo_medicao || []
        },
        {
          key: 'certificados', 
          label: 'Certificados',
          options: data.values.certificados || []
        }
      ]
      
      console.log('Filtros processados:', filters.value)
    }
    
    loading.value = false
  } catch (err) {
    console.error('Erro ao carregar filtros:', err)
    error.value = err.message
    loading.value = false
  }
})
</script>

<style scoped>
.filter-section {
  margin: 15px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.error {
  color: red;
  background: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
}

.empty {
  color: #666;
  font-style: italic;
}

.debug {
  margin-top: 20px;
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  font-size: 12px;
}

.debug pre {
  white-space: pre-wrap;
}
</style>