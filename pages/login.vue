<template>
  <div
    class="min-h-screen w-full bg-[url('/Login-bg.jpg')] px-4 bg-cover bg-center bg-no-repeat flex text-[#fff] justify-center items-center"
  >
    <div
      class="bg-[#254642] bg-opacity-50 w-full md:w-[60%] xl:w-[40%] shadow-white rounded-[0.85rem] md:py-20 py-10 px-7 md:px-14 flex flex-col justify-center items-center"
    >
      <h1 class="font-semibold text-3xl mb-9">Login</h1>
      <form
        @submit.prevent="onSubmit"
        action=""
        class="flex flex-col gap-9 w-full"
      >
        <div class="form-group">
          <label for="">Email</label>
          <input v-model="email" type="text" />
        </div>
        <span v-if="auth.loginErrors.email" class="text-red-600">{{
          auth.loginErrors.email[0]
        }}</span>
        <div class="form-group">
          <label for="">Password</label>
          <input v-model="password" :type="passwordType" />
          <button
            type="button"
            @click.prevent="switchPasswordType"
            class="input-icon"
          >
            <IconsIconEye v-if="passwordType === 'password'" />
            <IconsIconClosedEye v-if="passwordType === 'text'" />
          </button>
        </div>
        <span v-if="auth.loginErrors.password" class="text-red-600">{{
          auth.loginErrors.password[0]
        }}</span>
        <button
          type="submit"
          class="bg-[#D9D9D9] text-[#000] rounded-xl md:py-2 py-1 font-bold"
        >
          Login
        </button>
        <div class="flex justify-between items-center text-xs md:text-sm">
          <span class="">Don't have an account ?</span>
          <router-link
            to="/signUp"
            class="flex gap-2 font-bold px-4 py-1 hover:shadow-lg hover:bg-[#fff] hover:bg-opacity-10 rounded-lg"
            ><IconsIconSignUp />Sign Up</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
const email = ref("");
const password = ref("");
const passwordType = ref("password");
const auth = useAuthStore();
function switchPasswordType(value) {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
}
function onSubmit() {
  auth.login(email.value, password.value);
}
</script>
