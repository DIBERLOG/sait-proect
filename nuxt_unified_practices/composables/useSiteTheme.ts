export function useSiteTheme() {
  const colorMode = useColorMode()

  const themeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
  ]

  const selectedTheme = computed({
    get: () => colorMode.preference,
    set: (value: string) => {
      colorMode.preference = value
    }
  })

  return {
    colorMode,
    themeOptions,
    selectedTheme
  }
}
