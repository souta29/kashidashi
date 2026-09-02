// ===== 検査道具貸出管理 Service Worker =====
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '道具返却のお知らせ';
  const options = {
    body: data.body || '返却期限を超過している道具があります。',
    icon: data.icon || '/kashidashi/icon.png',
    badge: data.badge || '/kashidashi/icon.png',
    tag: data.tag || 'lending-alert',
    requireInteraction: true,
    data: { url: data.url || 'https://souta29.github.io/kashidashi/request.html' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : 'https://souta29.github.io/kashidashi/request.html';
  event.waitUntil(clients.openWindow(url));
});

self.addEventListener('install', function(event) {
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(clients.claim());
});
