export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  if (!auth.token && to.path !== "/login" && to.path !== "/signUp") {
    return navigateTo("/login");
  }

  if (auth.token && (to.path === "/login" || to.path === "/signUp")) {
    return navigateTo("/home");
  }
});
