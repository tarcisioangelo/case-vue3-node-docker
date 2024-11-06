<script lang="ts" setup>
interface Props {
    title: string
    description?: string
    icon: string
}

const { title, description, icon } = defineProps<Props>()
</script>

<template>
    <div class="flex items-center gap-2">
        <span class="material-icons-outlined !text-[56px] w-14">{{ icon }}</span>

        <div class="flex flex-col leading-none">
            <p class="text-3xl">{{ title }}</p>
            <label class="font-semibold ml-1">{{ description }}</label>
        </div>
    </div>
</template>
