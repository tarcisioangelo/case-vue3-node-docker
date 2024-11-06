<script lang="ts" setup>
import { computed } from 'vue'
import IconButton from '../Buttons/IconButton.vue'

import { useStore } from 'vuex'

const store = useStore()
const isDrawerOpen = computed(() => store.getters['drawer/isDrawerOpen'])
const toggleDrawer = () => {
    store.dispatch('drawer/toggleDrawer')
}
</script>

<template>
    <header class="custom-header">
        <div class="logo-box">
            <img src="/logo.png" width="40px" height="40px" />
            <label class="font-bold text-xl md:text-3xl">USERTASKS</label>
        </div>
        <div>
            <IconButton :icon="isDrawerOpen ? 'menu_open' : 'menu'" customClass="menu-button" @click="toggleDrawer" />
        </div>
    </header>
</template>

<style scoped>
.custom-header {
    @apply top-0 w-full relative   bg-component  h-[68px] shadow-sm shadow-gray-900 flex  items-center py-3 px-4 md:px-10 text-3xl font-semibold text-white;
}
.menu-button {
    @apply bg-transparent  hover:bg-transparent w-12 h-12;
}
.logo-box {
    @apply flex m-auto items-center gap-3 cursor-pointer;
}
</style>
