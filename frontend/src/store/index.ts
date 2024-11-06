import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import drawerModule from './drawer'
import userModule from './user'

const store = createStore({
    modules: {
        drawer: drawerModule,
        user: userModule,
    },
    plugins: [
        createPersistedState({
            paths: ['user'],
        }),
    ],
})

export default store
