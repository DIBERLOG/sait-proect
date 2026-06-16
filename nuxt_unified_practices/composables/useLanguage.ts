export type LanguageCode = 'en' | 'ru'

export function useLanguage() {
  const languages = [
    { label: 'English', value: 'en' as const },
    { label: 'Русский', value: 'ru' as const }
  ]

  const selectedLanguage = useState<(typeof languages)[number]>('selected-language', () => languages[0])

  const dictionary = computed(() => {
    if (selectedLanguage.value.value === 'ru') {
      return {
        addToBag: 'Добавить в корзину',
        selectPhone: 'Выберите iPhone',
        storage: 'Память',
        language: 'Язык',
        theme: 'Тема',
        light: 'Светлая',
        dark: 'Тёмная',
        price: 'Цена',
        selected: 'Выбрано'
      }
    }

    return {
      addToBag: 'Add to Bag',
      selectPhone: 'Select your iPhone',
      storage: 'Storage',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      price: 'Price',
      selected: 'Selected'
    }
  })

  return {
    languages,
    selectedLanguage,
    dictionary
  }
}
