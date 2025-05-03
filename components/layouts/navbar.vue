<template>
  <div
    class="z-50 bg-[#07137B] text-[#fff] flex w-full items-center justify-between px-4 py-2 font-light md:px-12 md:py-3"
  >
    <h1 class="font-extrabold md:text-5xl text-3xl">LOGO</h1>
    <div class="hidden gap-2 text-base md:flex">
      <router-link
        to="/home"
        exact-active-class="text-[#F15B4C]"
        class="navbar-page-link"
      >
        Users
      </router-link>
      <router-link to="" class="navbar-page-link"> About </router-link>

      <router-link to="" class="navbar-page-link"> Case studies </router-link>
    </div>

    <div
      :class="[
        openMenu
          ? 'absolute left-0 top-[0%] flex w-full flex-col bg-[#07137B] px-4 py-6 text-base text-[#FDFAF6]'
          : 'hidden',
      ]"
    >
      <router-link
        to="/home"
        exact-active-class="text-[#F15B4C]"
        class="navbar-page-link"
      >
        Users
      </router-link>
      <router-link to="" class="navbar-page-link"> About </router-link>

      <router-link to="" class="navbar-page-link"> Case studies </router-link>
      <button
        @click="auth.logout()"
        class="self-end bg-[#fff] text-[#000] font-semibold rounded-lg px-4 py-1 hover:bg-opacity-50"
      >
        Logout
      </button>
    </div>
    <div class="flex gap-4 text-base md:gap-14">
      <button
        @click="auth.logout()"
        class="text-[#000] font-semibold hidden text-nowrap rounded-lg hover:bg-opacity-50 bg-[#fff] px-4 py-1 text-center md:block"
      >
        Logout
      </button>
      <button class="z-[9999] md:hidden" @click="toggleMenu()">
        <IconsIconMenu />
      </button>
    </div>
  </div>
</template>
<script setup>
const auth = useAuthStore();
const openMenu = ref(false);
function toggleMenu() {
  openMenu.value = !openMenu.value;
}
</script>
