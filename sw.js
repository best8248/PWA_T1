importScripts('/serviceworker-cache-polyfill.js');

//'install' 이벤트를 리스닝하며, 사이트 자산(assets)을 캐싱
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('your_app_name').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
        // 필요한 자산(assets)들을 여기에 넣으세요
     ]);
   })
 );
});

//'fetch' 요청을 리스닝하며, 캐시에서 발견될 경우 캐시로부터 파일을 가져옴
self.addEventListener('fetch', function(event) {
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});