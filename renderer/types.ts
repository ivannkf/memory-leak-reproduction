export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }

import { Readable } from 'stream'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
//import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing
import type { ComponentPublicInstance } from 'vue'

type Page = ComponentPublicInstance // https://stackoverflow.com/questions/63985658/how-to-type-vue-instance-out-of-definecomponent-in-vue-3/63986086#63986086
type PageProps = {}

export type Component = any

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  host: string
  userAgent: string
  head: any
  browserLocale: string
  redirect: string
  stream: ReadableStream
  initialStoreState: {}
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer
