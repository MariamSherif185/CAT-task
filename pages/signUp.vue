<template>
  <div
    class="min-h-screen w-full bg-[url('/Login-bg.jpg')] bg-cover bg-center px-4 bg-no-repeat flex text-[#fff] justify-center items-center"
  >
    <div
      class="bg-[#254642] bg-opacity-50 md:w-[60%] shadow-white rounded-[0.85rem] py-7 px-14 flex flex-col justify-center items-center"
    >
      <h1 class="font-semibold text-3xl mb-9">Sign Up</h1>
      <form
        @submit.prevent="onSubmit"
        class="flex flex-col justify-center items-center md:gap-9 gap-4 w-full"
      >
        <div class="form-group lg:w-[47%] w-full">
          <label for="">Name</label>
          <input v-model="name" type="text" />
        </div>
        <span v-if="auth.signupErrors.name" class="text-red-600">{{
          auth.signupErrors.name[0]
        }}</span>
        <div class="form-group lg:w-[47%] w-full">
          <label for="">Email</label>
          <input v-model="email" type="text" />
        </div>
        <span v-if="auth.signupErrors.email" class="text-red-600">{{
          auth.signupErrors.email[0]
        }}</span>
        <div class="form-group lg:w-[47%] w-full">
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
        <span v-if="auth.signupErrors.password" class="text-red-600">{{
          auth.signupErrors.password[0]
        }}</span>
        <div class="form-group lg:w-[47%] w-full">
          <label for="">Confirm Password</label>
          <input v-model="confirm_password" :type="confirmPasswordType" />

          <button
            type="button"
            @click.prevent="switchConfirmPasswordType"
            class="input-icon"
          >
            <IconsIconEye v-if="confirmPasswordType === 'password'" />
            <IconsIconClosedEye v-if="confirmPasswordType === 'text'" />
          </button>
        </div>
        <button
          type="submit"
          class="bg-[#D9D9D9] lg:w-[50%] w-full text-[#000] rounded-xl md:py-2 py-1 font-bold"
        >
          Sign Up
        </button>
        <div
          class="flex justify-between w-full lg:w-[50%] items-center text-sm"
        >
          <span class="">Already have an account ?</span>
          <router-link
            to="/login"
            class="flex gap-2 items-center font-bold px-4 py-1 hover:shadow-lg hover:bg-[#fff] hover:bg-opacity-10 rounded-lg"
            ><IconsIconUser />Login</router-link
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
const name = ref("");
const email = ref("");
const password = ref("");
const confirm_password = ref("");
const passwordType = ref("password");
const confirmPasswordType = ref("password");
const auth = useAuthStore();
function switchPasswordType(value) {
  passwordType.value = passwordType.value === "password" ? "text" : "password";
}
function switchConfirmPasswordType(value) {
  confirmPasswordType.value =
    confirmPasswordType.value === "password" ? "text" : "password";
}
const onSubmit = async () => {
  await auth.register(
    name.value,
    email.value,
    password.value,
    confirm_password.value
  );
  await auth.login(email.value, password.value);
};
</script>
