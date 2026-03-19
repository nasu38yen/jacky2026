// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
  },
  modules: ['@nuxt/content', '@nuxt/ui', '@nuxt/image'],
  css: [
    '~/assets/css/main.css',
  ],
  image: {
    // Vercel の画像最適化プロバイダーを使用
    provider: 'vercel'
  },
  routeRules: {
    '/': { prerender: true },
    '/charibra/**': { prerender: true }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})