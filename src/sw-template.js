if (typeof importScripts === 'function') {
    importScripts('https://s3.mobank.co/loyalty-static/pwa/wb/workbox-sw.js');
    /* global workbox */
    if (workbox) {
        workbox.setConfig({debug: false,});
        workbox.core.skipWaiting();
        workbox.core.clientsClaim();


        /* injection point for manifest2 files.  */
        workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

        // self.addEventListener('activate', function(event) {
        //     event.waitUntil(
        //         caches.keys().then(function(cacheNames) {
        //             return Promise.all(
        //                 cacheNames.filter(function(cacheName) {
        //                     // Return true if you want to remove this cache,
        //                     // but remember that caches are shared across
        //                     // the whole origin
        //                     return true
        //                 }).map(function(cacheName) {
        //                     return caches.delete(cacheName);
        //                 })
        //             );
        //         })
        //     );
        // });


    } else {
        // console.log('Workbox could not be loaded SWA. No Offline support');
    }
}