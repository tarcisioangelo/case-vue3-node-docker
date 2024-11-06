<script lang="ts" setup>
import type { Validation } from '@vuelidate/core'
import { computed, ref } from 'vue'

interface Props {
    id: string
    name: string
    required?: boolean
    type?: string
    label?: string
    placeholder?: string
    v$?: Record<string, Validation>
    customClass?: string
}

const { id, name, required, type = 'text', label, placeholder, v$, customClass } = defineProps<Props>()

const input = ref<HTMLInputElement | null>(null)

defineExpose({ input })

const model = defineModel()

const errorMessage = computed(() => {
    if (v$) {
        const fieldValidation = v$[name]
        return fieldValidation?.$error ? fieldValidation.$errors[0]?.$message : undefined
    }
})
</script>

<template>
    <label class="text-white/75 font-semibold text-sm" :for="name">
        {{ label }}

        <span v-show="required" class="text-red-900">*</span>
    </label>
    <input
        v-bind="$attrs"
        ref="input"
        v-model="model"
        :class="['input_default', customClass]"
        :type="type"
        :id="id"
        :name="name"
        :placeholder="placeholder"
    />

    <div v-show="errorMessage" class="text-red-500 text-xs">
        {{ errorMessage }}
    </div>
</template>

<style scoped>
.input_default {
    @apply w-full mb-2 bg-input h-[50px] rounded-[10px] px-4 focus:bg-input-line outline-none;
}
</style>
