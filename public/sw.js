// Establish a cache name
const id = 18;
const cacheName = "SwarmCache_v" + id;

const precachedAssets = [
  "/api/places",
  "images/categories/administrative_area_level_2.svg",
  "images/categories/administrative_area_level_3.svg",
  "images/categories/airport.svg",
  "images/categories/bakery.svg",
  "images/categories/bar.svg",
  "images/categories/beauty_salon.svg",
  "images/categories/book_store.svg",
  "images/categories/cafe.svg",
  "images/categories/clothing_store.svg",
  "images/categories/food.svg",
  "images/categories/grocery_or_supermarket.svg",
  "images/categories/health.svg",
  "images/categories/home_goods_store.svg",
  "images/categories/locality.svg",
  "images/categories/lodging.svg",
  "images/categories/movie_theater.svg",
  "images/categories/museum.svg",
  "images/categories/natural_feature.svg",
  "images/categories/neighborhood.svg",
  "images/categories/park.svg",
  "images/categories/point_of_interest.svg",
  "images/categories/premise.svg",
  "images/categories/real_estate_agency.svg",
  "images/categories/restaurant.svg",
  "images/categories/route.svg",
  "images/categories/shop.svg",
  "images/categories/store.svg",
  "images/categories/sublocality_level_1.svg",
  "images/categories/tourist_attraction.svg",
  "images/categories/transit_station.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(precachedAssets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isPrecachedRequest = precachedAssets.includes(url.pathname);

  // When make a new check in remove the cached result for places
  if (url.pathname === "/api/place") {
    caches.open(cacheName).then((cache) => {
      return cache.delete("/api/places");
    });
  }

  if (isPrecachedRequest) {
    event.respondWith(
      caches.open(cacheName).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          return (
            cachedResponse ||
            fetch(event.request.url).then((fetchedResponse) => {
              cache.put(event.request, fetchedResponse.clone());
              return fetchedResponse;
            })
          );
        });
      })
    );
  }

  return event;
});

self.addEventListener("activate", () => {
  console.log("Swarm Clone Service Worker activated");
});
