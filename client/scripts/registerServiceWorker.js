if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  .then(registration => {
    console.log('Service worker is registered.')

    var isUpdate = false

    // If this fires we should check if there's a new Service Worker
    // waiting to be activated. If so, ask the user to force refresh.
    if (registration.active) {
      isUpdate = true
    }

    registration.onupdatefound = function (updateEvent) {
      console.log('A new Service Worker version has been found...')

      // If an update is found the spec says that there is a new Service
      // Worker installing, so we should wait for that to complete then
      // show a notification to the user.
      registration.installing.onstatechange = function (event) {
        if (this.state === 'installed') {
          if (isUpdate) {
            console.log('App updated. Restart for the new version.')
          } else {
            console.log('App ready for offline use.')
          }
        }
      }
    }
  })
  .catch(err => {
    console.log('Unable to register service worker.', err)
  })
}
