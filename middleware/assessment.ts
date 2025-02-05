export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from.path === "/withdraw") return abortNavigation()
})
