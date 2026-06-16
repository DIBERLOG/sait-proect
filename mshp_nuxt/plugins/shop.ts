export default defineNuxtPlugin(() => {
  return {
    provide: {
      getIphoneName: (id: string) => {
        if (id === '16') {
          return 'iPhone 16 Pro'
        }

        if (id === '15') {
          return 'iPhone 15 Pro'
        }

        if (id === '13') {
          return 'iPhone 13 Pro'
        }

        return 'Неизвестный iPhone'
      },

      getIphonePrice: (id: string) => {
        if (id === '16') {
          return 99990
        }

        if (id === '15') {
          return 89990
        }

        if (id === '13') {
          return 69990
        }

        return 0
      }
    }
  }
})
