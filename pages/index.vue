<template></template>
<script setup>
const router = useRouter();

onMounted(() => {
  if ("/login") {
    router.replace("/login");
  }
});
</script>
