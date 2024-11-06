<script setup lang="ts">
interface Props {
    customClass?: string
}
defineProps<Props>()
</script>

<template>
    <div :class="['grid grid-cols-12 gap-x-3 gap-y-1', customClass]">
        <slot />
    </div>
</template>
