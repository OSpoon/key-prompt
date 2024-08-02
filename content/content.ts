import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'

function initial() {
  const rootId = 'key-prompt'
  let rootDiv = document.getElementById(rootId)
    || document.createElement('div')
  rootDiv.id = rootId
  document.body.appendChild(rootDiv)
  createApp(ContentApp).mount(rootDiv)
}

setTimeout(initial, 1000)
