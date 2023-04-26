import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/less/index.less'
import '@/assets/less/reset.less'
import 'tailwindcss/tailwind.css'
import EditorMarkdown from '@/components/EditorMarkdown.vue'

createApp(App)
  .use(store)
  .use(router)
  .component('EditorMarkdown', EditorMarkdown)
  .mount('#app')
