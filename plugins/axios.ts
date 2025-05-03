import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const $axios = axios.create({
    baseURL: "https://interview.development.cat-sw.com/api/",
  });
  const auth = useAuthStore();

  $axios.interceptors.request.use((config) => {
    if (auth.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
    return config;
  });
  return {
    provide: {
      axios: $axios,
    },
  };
});
