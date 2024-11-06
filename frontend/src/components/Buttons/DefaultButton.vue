<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    text: string
    icon?: string
    customClass?: string
    isDisabled?: boolean
}
const { text, icon, customClass, isDisabled } = defineProps<Props>()

const buttonClasses = computed(() => {
    const baseClasses = isDisabled ? ['btn-default btn-disabled'] : ['btn-default', 'btn-active']
    return [baseClasses, customClass].filter(Boolean)
})
const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    if (!isDisabled) {
        emit('click')
    }
}
</script>

<template>
    <button @click="handleClick" :class="buttonClasses" :disabled="isDisabled">
        <span v-if="icon" class="material-icons-outlined">{{ icon }} </span> {{ text }}
    </button>
</template>

<style scoped>
.btn-default {
    @apply w-full p-3 rounded-xl font-semibold bg-primary hover:bg-primary-hover flex items-center justify-center gap-3;
}

.btn-active {
    @apply cursor-pointer;
}
.btn-disabled {
    @apply bg-gray-600 hover:bg-gray-600 text-slate-400 cursor-not-allowed;
}
</style>
