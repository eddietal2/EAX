/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];
const API_CACHE = 'api-cache-v1';

self.addEventListener('install', (event: any) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
	);
});

self.addEventListener('fetch', (event: any) => {
	const { request } = event;
	const url = new URL(request.url);

	// Cache API responses (rates)
	if (url.origin === 'https://api.exchangerate-api.com') {
		event.respondWith(
			caches.open(API_CACHE).then(async (cache) => {
				try {
					const response = await fetch(request);
					if (response.ok) {
						const cloned = response.clone();
						cache.put(request, cloned);
						return response;
					}
				} catch (e) {
					// Network error
				}
				// Return cached response or offline response
				return cache.match(request) || new Response('Offline', { status: 503 });
			})
		);
	} else {
		// Cache-first for app assets
		event.respondWith(
			caches.match(request).then((cached) => cached || fetch(request))
		);
	}
});

self.addEventListener('activate', (event: any) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(
				keys.map((key) => {
					if (key !== CACHE && key !== API_CACHE) {
						return caches.delete(key);
					}
				})
			)
		)
	);
});
