/* global self, caches */

self.addEventListener('install', event => {
  function onInstall () {
    return caches.open('static')
      .then(cache => cache.addAll([
        '/assets/app.bundle.js',
        '/assets/app.css',
        '/offline/',
        '/'
      ])
    )
  }

  event.waitUntil(onInstall(event))
})
