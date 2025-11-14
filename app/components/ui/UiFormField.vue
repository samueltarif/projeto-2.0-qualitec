<template>
  <div>
    <label :for="id" class="block text-sm font-medium mb-1">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :required="required"
      :placeholder="placeholder"
      v-model="internalValue"
      v-mask="mask"
      class="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-bind="inputAttrs"
    />
    <slot name="help" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  id: string
  label: string
  modelValue: string
  type?: string
  placeholder?: string
  required?: boolean
  mask?: string | undefined
  inputAttrs?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  required: false,
  mask: undefined,
  inputAttrs: () => ({}),
})

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const internalValue = computed({
  get() { return props.modelValue },
  set(v: string) { emit('update:modelValue', v) }
})
</script>

<style scoped>
</style>