import { createApp } from 'vue'
import App from './App.vue'

import router from '../src/router/index'

import './style.css'

//引入ant-design-vue
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'

//引入echarts
import * as echarts from 'echarts'

import { createPinia  } from 'pinia'
const pinia = createPinia()

const app = createApp(App)

console.log("test");

//放入全局echarts
app.config.globalProperties.$echarts = echarts
app.use(router)
app.use(pinia)
app.mount('#app')

//createApp(App).mount('#app')