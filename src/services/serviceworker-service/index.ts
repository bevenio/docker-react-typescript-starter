import { isDevMode } from '@/services/devtool-service'

const registerServiceworker = (): void => {
  if ('serviceWorker' in navigator && !isDevMode) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${window.location.origin}/static/pwa/service-worker.js`).catch((registrationError) => {
        throw new Error('Service Worker could not be registered', registrationError)
      })
    })
  }
}

export { registerServiceworker }
