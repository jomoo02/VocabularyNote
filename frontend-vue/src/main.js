import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8081'
// axios.defaults.baseURL = 'https://vocabulary1.loca.lt'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.axios = axios;
app.use(pinia).mount('#app')
//createApp(App).use(pinia).mount('#app')
