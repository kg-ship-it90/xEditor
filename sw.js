const CACHE_NAME = 'xeditor-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Trống để cho phép app hoạt động bình thường qua mạng/localhost
  // Chrome chỉ yêu cầu tồn tại sự kiện fetch để cho phép cài đặt PWA
});