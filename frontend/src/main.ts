import { createApp } from 'vue'
import '@/style.css'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'material-icons/iconfont/outlined.css'
import VueTheMask from 'vue-the-mask'

const optionsToast = {
    position: 'top-right',
    toastClassName: '!transition !delay-0',
    hideProgressBar: true,
    timeout: 2000,
    transition: 'Vue-Toastification__fade',
}

import router from '@/routes'
import store from './store'

import App from '@/App.vue'

const app = createApp(App)
app.use(router)
app.use(Toast, optionsToast)
app.use(store)
app.use(VueTheMask)
app.mount('#app')
