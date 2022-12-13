import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

function main() {
  const parent = document.querySelector('.navTabs')
  const children = document.createElement('li')

  parent?.append(children)

  return children
}

createApp(App).use(createPinia()).mount(main())
