import type { Module } from 'vuex'
import type { IUser } from '@/modules/register/types'

interface UserState {
    user: IUser | null
}

const state: UserState = {
    user: null,
}

const userModule: Module<UserState, unknown> = {
    namespaced: true,
    state,
    mutations: {
        setUser(state, user: IUser) {
            state.user = user
        },
        clearUser(state) {
            state.user = null
        },
    },
    actions: {
        login({ commit }, userData: IUser) {
            commit('setUser', userData)
        },
        logout({ commit }) {
            commit('clearUser')
        },
    },
    getters: {
        isLoggedIn: (state): boolean => !!state.user,
        user: (state): IUser | null => state.user,
    },
}

export default userModule
