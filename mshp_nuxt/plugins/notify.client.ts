export default defineNuxtPlugin(() => {
  return {
    provide: {
      notify: (message: string) => {
        alert(message)
      }
    }
  }
})
