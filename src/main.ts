import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()


const app = createApp(App)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.directive('focus', {
    mounted: (el) => {
        el.focus()
    }
})
app.mount('#app')
