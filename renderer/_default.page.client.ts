import { createApp } from './app'
import type { PageContextClient } from './types'

export { render }

let app: any

async function render(pageContext: PageContextClient) {
  if (!app) {
    const { app: createdApp, router } = createApp(pageContext)
    app = createdApp
    await router.isReady()
    app.mount('#app')
  } else {
    app.changePage(pageContext)
  }
}

export const clientRouting = true
