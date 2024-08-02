import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'

function initial() {
  const rootDiv = document.createElement('div')
  rootDiv.id = 'key-prompt'
  document.body.appendChild(rootDiv);
  createApp(ContentApp).mount(rootDiv)
}

setTimeout(initial, 1000)
