/*global caches, fetch, Promise */
(function (worker) {
"use strict";

var PREFIX = 'wallpaper',
	VERSION = '1.3',
	FILES = [
		'index.html',
		'style.css',
		'pages/cm.html',
		'pages/cmm.html',
		'pages/p1.html',
		'pages/p2.html',
		'pages/p3.html',
		'pages/p31m.html',
		'pages/p3m1.html',
		'pages/p4.html',
		'pages/p4g.html',
		'pages/p4m.html',
		'pages/p6.html',
		'pages/p6m.html',
		'pages/pg.html',
		'pages/pgg.html',
		'pages/pm.html',
		'pages/pmg.html',
		'pages/pmm.html',
		'pages/q.html',
		'pages/q1.html',
		'pages/q1n.html',
		'pages/q1y.html',
		'pages/q2.html',
		'pages/q2n.html',
		'pages/q2y.html',
		'pages/q2yy.html',
		'pages/q3.html',
		'pages/q3y.html',
		'pages/q4.html',
		'pages/q4y.html',
		'pages/q6.html',
		'pages/img/cm.svg',
		'pages/img/cmm.svg',
		'pages/img/p1.svg',
		'pages/img/p2.svg',
		'pages/img/p3.svg',
		'pages/img/p31m.svg',
		'pages/img/p3m1.svg',
		'pages/img/p4.svg',
		'pages/img/p4g.svg',
		'pages/img/p4m.svg',
		'pages/img/p6.svg',
		'pages/img/p6m.svg',
		'pages/img/pg.svg',
		'pages/img/pgg.svg',
		'pages/img/pm.svg',
		'pages/img/pmg.svg',
		'pages/img/pmm.svg'
	];

worker.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(PREFIX + ':' + VERSION).then(function (cache) {
			return cache.addAll(FILES);
		})
	);
});

worker.addEventListener('activate', function (e) {
	e.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys.map(function (key) {
				if (key.indexOf(PREFIX + ':') === 0 && key !== PREFIX + ':' + VERSION) {
					return caches.delete(key);
				}
			}));
		})
	);
});

worker.addEventListener('fetch', function (e) {
	e.respondWith(caches.match(e.request, {ignoreSearch: true})
		.then(function (response) {
			return response || fetch(e.request);
		})
	);
});

})(this);