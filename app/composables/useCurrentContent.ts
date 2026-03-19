import type { ContentCollectionItem } from '@nuxt/content'
export const useCurrentContent = () => {
  // 状態を管理する state (型を固定)
  const content = useState<ContentCollectionItem | null>('current-content-item', () => null)

  // データをセットする関数
  const setContent = (data: ContentCollectionItem) => {
    content.value = data
  }

  return {
    content: readonly(content), // レイアウト側からは読み取り専用に
    setContent
  }
}