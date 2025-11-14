<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    class="input-base block w-full rounded-lg border p-2.5 focus:border-primary focus:ring-primary"
    :required="required"
  />
</template>

<script setup lang="ts">
  defineProps({
    modelValue: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    required: {
      type: Boolean,
      default: false,
    },
  });
  defineEmits(['update:modelValue']);
</script>