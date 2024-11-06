<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import DefaultButton from '../Buttons/DefaultButton.vue'
import ServiceStorage from '@/globals/storage'

import UserInfo from './UserInfo.vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Computed para observar o estado do Drawer
const isDrawerOpen = computed(() => store.getters['drawer/isDrawerOpen'])

const logout = () => {
    ServiceStorage.removeToken()
    store.commit('drawer/closeDrawer')
    router.push('/login')
}

const goTo = (path: string) => {
    store.commit('drawer/closeDrawer')

    router.push(path)
}
</script>

<template>
    <aside v-show="isDrawerOpen" class="scoped-drawer">
        <div class="h-16">
            <UserInfo />
        </div>
        <ul class="scoped-nav flex-1">
            <label class="scoped-item" @click="goTo('/perfil')">Perfil</label>
            <label class="scoped-item" @click="goTo('/tasks')">Tarefas</label>
        </ul>

        <div class="h-16 px-4">
            <DefaultButton custom-class="!bg-danger" text="Sair" icon="logout" @click="logout" />
        </div>
    </aside>
</template>

<style scoped>
.scoped-drawer {
    @apply h-1/3 absolute top-[78px] right-1 md:right-3 py-4 z-50 w-[98%]  sm:w-[50%] xl:w-[20%] drop-shadow-sm shadow-violet-500 bg-component flex flex-col;
}
.scoped-nav {
    @apply flex flex-col;
}
.scoped-item {
    @apply p-2 outline-purple-400 border border-violet-200 rounded-md my-2 text-center mx-4 cursor-pointer;
}
</style>
