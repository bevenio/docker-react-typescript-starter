const registerServiceworker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register(`${window.location.origin}/static/pwa/service-worker.js`)
        .catch((registrationError) => {
          throw new Error('Service Worker could not be registered', registrationError)
        })
    })
  }
}

export { registerServiceworker }

export default {
  registerServiceworker,
}
