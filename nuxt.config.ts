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
    // APIは動的に処理する必要があるためプリレンダリングから除外
    '/api/**': { prerender: false },
    // それ以外（Markdownページ含む）はすべてビルド時にHTML化する
    '/**': { prerender: true }
  },
  
  // Vercelへのデプロイであることを明示的に指定します
  nitro: {
    preset: 'vercel',
    prerender: {
      // /content 配下のルートを自動的にクロールして生成する
      crawlLinks: true,
      // 2. 自動で検知されない場合は、明示的にパスを指定する
      routes: [
        '/test',
        '/docs/concept',
      ]
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})