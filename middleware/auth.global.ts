export default defineNuxtRouteMiddleware(async (_, from) => {
  // Only run this middleware on the server

  if (import.meta.client) return
  console.debug("Validation of Auth Middleware", from)
})
