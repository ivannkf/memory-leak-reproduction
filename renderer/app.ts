import { createSSRApp, defineComponent, h, markRaw } from 'vue'
import PageShell from './PageShell.vue'
import type { PageContext } from './types'
import { createRouter } from '../router.js'
import { createI18n } from '@/i18n.js'

export { createApp }

function createApp(pageContext: PageContext) {
  const { Page, pageProps } = pageContext
  const PageWithLayout = defineComponent({
    data: () => ({
      pageProps: markRaw(pageProps || {})
    }),
    render() {
      return h(
        PageShell,
        {},
        {
          default() {
            return h(Page, pageProps || {})
          }
        }
      )
    }
  })


  const app = createSSRApp(PageWithLayout)
  const router = createRouter()
  const i18n = createI18n()
  app.use(router)
  app.use(i18n)

  return { app, router, i18n }
}
