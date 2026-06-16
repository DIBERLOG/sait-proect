export type ProductTab = 'overview' | 'techspec' | 'pricing' | 'software'

export function useProductTabs() {
  const activeTab = ref<ProductTab>('overview')

  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'techspec' as const, label: 'Tech Specs' },
    { key: 'pricing' as const, label: 'Pricing' },
    { key: 'software' as const, label: 'Software' }
  ]

  function selectTab(tab: ProductTab) {
    activeTab.value = tab
  }

  return {
    activeTab,
    tabs,
    selectTab
  }
}
