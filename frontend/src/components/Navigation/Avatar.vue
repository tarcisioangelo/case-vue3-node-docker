<script setup lang="ts">
interface Props {
    text: string
}
defineProps<Props>()

const emit = defineEmits<{
    (e: 'click'): void
}>()

const handleClick = () => {
    emit('click')
}
</script>

<template>
    <div @click="handleClick" class="avatar">
        <label class="m-auto">{{ text }}</label>
    </div>
</template>

<style scoped>
.avatar {
    @apply rounded-[50%] flex bg-input-line text-[20px] w-10 h-10 px-1;
}
</style>
