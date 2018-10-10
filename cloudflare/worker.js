addEventListener('fetch', event => {
  event.respondWith(handle(event.request))
})

async function handle(request) {
  let country = request.headers.get("CF-IpCountry")
  if (country !== 'US') {
    // No script for outside the US
    return new Response('');
  }
  return fetch(request);
}
