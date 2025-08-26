// Service Worker para Veiga Team
const CACHE_NAME = 'veiga-team-v1.0.0';
const STATIC_CACHE = 'veiga-team-static-v1.0.0';
const DYNAMIC_CACHE = 'veiga-team-dynamic-v1.0.0';

// Arquivos para cache estático
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js',
    '/js/config.js',
    '/img/logo.png',
    '/img/favicon.ico',
    '/img/hero-bg.jpg',
    '/img/muay-thai.png',
    '/img/jiu-jitsu.png',
    '/img/mma.png',
    '/img/rodrigo-muay-thai.jpg',
    '/img/professor-jiu-jitsu.png',
    '/img/academy-template.png'
];

// Estratégias de cache
const CACHE_STRATEGIES = {
    'cache-first': async (request) => {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            return new Response('Offline content not available', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },
    
    'network-first': async (request) => {
        try {
            const networkResponse = await fetch(request);
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        } catch (error) {
            const cachedResponse = await caches.match(request);
            if (cachedResponse) {
                return cachedResponse;
            }
            return new Response('Offline content not available', {
                status: 503,
                statusText: 'Service Unavailable'
            });
        }
    },
    
    'stale-while-revalidate': async (request) => {
        const cache = await caches.open(DYNAMIC_CACHE);
        const cachedResponse = await cache.match(request);
        
        const fetchPromise = fetch(request).then((networkResponse) => {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        });
        
        return cachedResponse || fetchPromise;
    }
};

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Cache estático aberto');
                return cache.addAll(STATIC_FILES);
            })
            .catch((error) => {
                console.error('Erro ao instalar cache estático:', error);
            })
    );
    
    self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    
    self.clients.claim();
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Pular requisições não-GET
    if (request.method !== 'GET') {
        return;
    }
    
    // Pular requisições para APIs externas
    if (url.hostname !== self.location.hostname) {
        return;
    }
    
    // Estratégia baseada no tipo de arquivo
    let strategy = 'network-first'; // Padrão
    
    if (STATIC_FILES.includes(url.pathname)) {
        strategy = 'cache-first';
    } else if (url.pathname.endsWith('.css') || url.pathname.endsWith('.js')) {
        strategy = 'stale-while-revalidate';
    } else if (url.pathname.includes('/api/')) {
        strategy = 'network-first';
    }
    
    event.respondWith(CACHE_STRATEGIES[strategy](request));
});

// Sincronização em background
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Função para sincronização em background
async function doBackgroundSync() {
    try {
        // Aqui você pode implementar sincronização de dados offline
        console.log('Sincronização em background executada');
    } catch (error) {
        console.error('Erro na sincronização em background:', error);
    }
}

// Notificações push (para futuras implementações)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/img/logo.png',
            badge: '/img/favicon.ico',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver mais',
                    icon: '/img/logo.png'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/img/logo.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Clique em notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});
