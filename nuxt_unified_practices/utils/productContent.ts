import type { ProductTab } from '~/composables/useProductTabs'

export type ProductContent = {
  title: string
  lead: string
  points: string[]
}

type ProductContentParams = {
  productName: string
  storageLabel: string
  price: string
  language: 'en' | 'ru'
}

export function getIphoneProductName(id: string) {
  if (id.toLowerCase().includes('max')) {
    return `iPhone ${id} Pro Max`
  }

  return `iPhone ${id}`
}

export function formatStorageSize(gigabytes: number) {
  return gigabytes >= 1024 ? `${gigabytes / 1024}TB` : `${gigabytes}GB`
}

export function getStorageSummary(label: string, price: string) {
  return `${label} / ${price}`
}

export function getProductTabContent(tab: ProductTab, params: ProductContentParams): ProductContent {
  const content = {
    en: {
      overview: {
        title: `${params.productName} overview`,
        lead: 'A reactive product page with instant choices for storage, theme, language and product details.',
        points: ['Super Retina XDR display', 'All-day battery life', 'Durable aerospace-grade frame']
      },
      techspec: {
        title: 'Tech specs',
        lead: 'The technical view highlights the display, chip, camera and connectivity of the selected model.',
        points: ['OLED display with True Tone', 'Fast mobile chip', 'Advanced dual-camera system', '5G connectivity']
      },
      pricing: {
        title: 'Pricing',
        lead: `${params.storageLabel} is selected. The current reactive price is ${params.price}.`,
        points: ['128GB starts at the base price', 'Larger storage updates the price instantly', 'Summary card stays in sync']
      },
      software: {
        title: 'Software',
        lead: 'iOS includes privacy tools, iCloud, FaceTime, widgets, App Store and long-term security updates.',
        points: ['iCloud and Apple services', 'Privacy controls', 'Regular iOS updates']
      }
    },
    ru: {
      overview: {
        title: `${params.productName}: обзор`,
        lead: 'Реактивная страница товара с мгновенным выбором памяти, темы, языка и описания.',
        points: ['Дисплей Super Retina XDR', 'Аккумулятор на весь день', 'Прочный корпус']
      },
      techspec: {
        title: 'Технические характеристики',
        lead: 'В техническом блоке показаны экран, чип, камера и связь выбранной модели.',
        points: ['OLED-дисплей с True Tone', 'Быстрый мобильный чип', 'Продвинутая система камер', 'Поддержка 5G']
      },
      pricing: {
        title: 'Стоимость',
        lead: `Выбрано ${params.storageLabel}. Текущая реактивная цена: ${params.price}.`,
        points: ['128GB использует базовую цену', 'Больший объём памяти сразу меняет цену', 'Карточка выбора синхронизируется автоматически']
      },
      software: {
        title: 'Программное обеспечение',
        lead: 'iOS включает инструменты приватности, iCloud, FaceTime, виджеты, App Store и регулярные обновления безопасности.',
        points: ['iCloud и сервисы Apple', 'Настройки приватности', 'Регулярные обновления iOS']
      }
    }
  }

  return content[params.language][tab]
}
