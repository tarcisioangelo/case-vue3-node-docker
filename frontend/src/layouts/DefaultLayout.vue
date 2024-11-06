<script lang="ts" setup>
import CustomHeader from '@/components/Navigation/CustomHeader.vue'
import Drawer from '@/components/Navigation/Drawer.vue'
</script>

<template>
    <div class="loggedin-content">
        <CustomHeader />
        <main>
            <div class="container-content flex-1">
                <RouterView />
                <Drawer />
            </div>
        </main>
    </div>
</template>

<style scoped>
.loggedin-content {
    @apply flex flex-col gap-1 w-full h-[100dvh];
}
</style>
