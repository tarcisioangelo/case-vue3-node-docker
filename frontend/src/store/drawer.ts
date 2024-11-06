import type { Module } from 'vuex'

interface DrawerState {
    isDrawerOpen: boolean
}

const state: DrawerState = {
    isDrawerOpen: false,
}

const drawerModule: Module<DrawerState, unknown> = {
    namespaced: true,
    state,
    mutations: {
        toggleDrawer(state) {
            state.isDrawerOpen = !state.isDrawerOpen
        },
        openDrawer(state) {
            state.isDrawerOpen = true
        },
        closeDrawer(state) {
            state.isDrawerOpen = false
        },
    },
    actions: {
        toggleDrawer({ commit }) {
            commit('toggleDrawer')
        },
        openDrawer({ commit }) {
            commit('openDrawer')
        },
        closeDrawer({ commit }) {
            commit('closeDrawer')
        },
    },
    getters: {
        isDrawerOpen: (state) => state.isDrawerOpen,
    },
}

export default drawerModule
