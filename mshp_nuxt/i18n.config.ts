export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ru',

  messages: {
    ru: {
      nav: {
        home: 'Главная',
        music: 'Музыка',
        apple: 'Apple Shop',
        iphone: 'iPhone 16',
        plugins: 'Плагины'
      },
      home: {
        title: 'MSHP_PORTAL',
        description: 'Единый учебный Nuxt-проект: музыка, Apple Shop, плагины и модули.',
        musicTitle: 'MSHP_MUSIK',
        musicText: 'Музыкальная страница с баннером, Daily Mix и New Releases.',
        appleTitle: 'Apple Shop',
        appleText: 'Каталог устройств Apple и динамическая страница iPhone.'
      },
      music: {
        goodEvening: 'Добрый вечер',
        relax: 'Отдохни с любимыми песнями',
        play: 'Слушать',
        dailyMix: 'Ежедневный микс',
        newReleases: 'Новинки'
      },
      shop: {
        title: 'Выбери свой iPhone',
        description: 'Онлайн-каталог устройств Apple. Открой страницу товара и посмотри, как работает динамический маршрут Nuxt.',
        button: 'Смотреть iPhone 16',
        catalog: 'Каталог',
        productId: 'ID товара',
        back: 'Назад в каталог',
        novelty: 'Новинка',
        goodChoice: 'Хороший выбор',
        budget: 'Доступная модель',
        notFound: 'Не найдено',
        buy: 'Купить',
        added: 'добавлен в корзину',
        select: 'Выбери свой',
        currentPrice: 'Цена',
        payMonthly: 'Оплата частями Apple Card',
        payUpfront: 'Или оплатить сразу',
        buyDirect: 'Купить напрямую у Apple',
        learnFinance: 'Подробнее о рассрочке'
      },
      plugins: {
        title: 'Плагины и модули Nuxt',
        description: 'На этой странице показаны i18n, color-mode, Nuxt Image и собственные плагины.',
        currentTheme: 'Текущая тема',
        price: 'Цена',
        notify: 'Показать уведомление',
        notifyMessage: 'Привет из клиентского плагина notify.client.ts'
      }
    },
    en: {
      nav: {
        home: 'Home',
        music: 'Music',
        apple: 'Apple Shop',
        iphone: 'iPhone 16',
        plugins: 'Plugins'
      },
      home: {
        title: 'MSHP_PORTAL',
        description: 'A single educational Nuxt project: music, Apple Shop, plugins and modules.',
        musicTitle: 'MSHP_MUSIK',
        musicText: 'Music page with hero banner, Daily Mix and New Releases.',
        appleTitle: 'Apple Shop',
        appleText: 'Apple device catalog and dynamic iPhone product page.'
      },
      music: {
        goodEvening: 'Good evening',
        relax: 'Relax with your favorite songs',
        play: 'Play',
        dailyMix: 'Daily Mix',
        newReleases: 'New Releases'
      },
      shop: {
        title: 'Choose your iPhone',
        description: 'Online Apple device catalog. Open a product page and see how Nuxt dynamic routes work.',
        button: 'View iPhone 16',
        catalog: 'Catalog',
        productId: 'Product ID',
        back: 'Back to catalog',
        novelty: 'New',
        goodChoice: 'Good choice',
        budget: 'Affordable model',
        notFound: 'Not found',
        buy: 'Buy',
        added: 'added to bag',
        select: 'Select your',
        currentPrice: 'Price',
        payMonthly: 'Pay over time with Apple Card',
        payUpfront: 'Or pay upfront',
        buyDirect: 'Buy directly from Apple',
        learnFinance: 'Learn more about financing'
      },
      plugins: {
        title: 'Nuxt Plugins and Modules',
        description: 'This page demonstrates i18n, color-mode, Nuxt Image and custom plugins.',
        currentTheme: 'Current theme',
        price: 'Price',
        notify: 'Show notification',
        notifyMessage: 'Hello from the notify.client.ts plugin'
      }
    }
  }
}))
