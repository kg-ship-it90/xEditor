const CACHE_NAME = 'xeditor-offline-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Khi cài đặt: Tải và lưu tệp tĩnh vào Cache của máy
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 2. Kích hoạt: Xóa các bản Cache cũ nếu có cập nhật mới
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Khi mất mạng: Phục vụ trực tiếp từ Cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Nếu có sẵn trong máy thì lấy dùng ngay, nếu không thì tải qua mạng
      return cachedResponse || fetch(event.request);
    })
  );
});
