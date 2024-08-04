import { createApp } from 'vue'
import ContentApp from './ContentApp.vue'
import css from './styles'

function initial() {
  const rootId = 'key-prompt'

  const hostDiv = document.createElement("div")
  hostDiv.id = `${rootId}-host`
  document.body.appendChild(hostDiv)

  const shadowRoot = hostDiv.attachShadow({ mode: "open" })

  const styleSheet = document.createElement("style")
  styleSheet.textContent = css
  shadowRoot.appendChild(styleSheet)

  const rootDiv = document.createElement("div")
  rootDiv.id = `${rootId}`
  shadowRoot.appendChild(rootDiv)

  createApp(ContentApp).mount(rootDiv)
}

setTimeout(initial, 1000)
