export type StorageOption = {
  label: string
  value: number
  priceAdd: number
}

export function useStorageSelector(basePrice = 999) {
  const storageOptions: StorageOption[] = [
    { label: '128GB', value: 128, priceAdd: 0 },
    { label: '256GB', value: 256, priceAdd: 100 },
    { label: '512GB', value: 512, priceAdd: 300 },
    { label: '1TB', value: 1024, priceAdd: 500 }
  ]

  const selectedStorage = useState<StorageOption>('selected-storage', () => storageOptions[0])
  const totalPrice = computed(() => basePrice + selectedStorage.value.priceAdd)

  return {
    storageOptions,
    selectedStorage,
    totalPrice
  }
}
