// stores/useContactForm.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | { name: string; email: string },
    token: null as string | null,
    signupErrors: [],
    loginErrors: [],
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const { $axios } = useNuxtApp();
        const res = await $axios.post("login", { email, password });
        this.token = res.data.token.access_token;
        this.user = res.data.user;
        localStorage.setItem("token", this.token ?? "");
        navigateTo("/home");
      } catch (error: any) {
        this.loginErrors = error.response?.data.errors;

        console.error("Login error:", error.response?.data || error.message);
        throw error.response?.data || error;
      }
    },

    async register(
      name: string,
      email: string,
      password: string,
      password_confirmation: string
    ) {
      try {
        const { $axios } = useNuxtApp();
        const res = await $axios.post("register", {
          name,
          email,
          password,
          password_confirmation,
        });
        this.user = res.data;
      } catch (error: any) {
        this.signupErrors = error.response?.data.errors;

        console.error("Register error:", error.response?.data || error.message);
        throw error.response?.data || error;
      }
    },

    async logout() {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");
      try {
        await $axios.post("logout", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error: any) {
        console.error("Logout error:", error.response?.data || error.message);
      } finally {
        this.token = null;
        this.user = null;
        localStorage.removeItem("token");
        navigateTo("/login");
      }
    },
  },
});
