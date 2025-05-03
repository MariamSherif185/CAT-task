<template>
  <div class="flex flex-col gap-10 p-4 md:p-10">
    <div
      class="flex justify-between flex-wrap-reverse md:flex-nowrap items-end"
    >
      <Filter />
      <button @click="showAddModal = true" class="ml-auto btn-primary">
        Add item
        <IconsIconPlus />
      </button>
    </div>
    <AddOrEditItem
      v-if="showAddModal"
      :showModal="showAddModal"
      :type="'add'"
      @close="showAddModal = false"
    />
    <AddOrEditItem
      v-if="showEditModal"
      :showModal="showEditModal"
      :id="editID"
      :type="'edit'"
      @close="showEditModal = false"
    />
    <div class="flex flex-wrap gap-4 p-4 md:p-10">
      <div
        v-for="(user, index) in dataStore.data.data"
        :key="index"
        class="flex flex-col w-full md:w-[45%] xl:w-[31%] bg-[#FCDDEC] rounded-2xl"
      >
        <NuxtImg :src="user.event_file" alt="" />
        <div class="p-5 gap-2 flex flex-col">
          <div class="self-end flex gap-2">
            <button @click="showEdit(user.id)">
              <IconsIconEdit />
            </button>
            <button @click="deleteItem(user.id)">
              <IconsIconDelete />
            </button>
          </div>
          <p class="label-value">
            <span class="label">Name</span>
            {{ user.name }}
          </p>
          <p class="label-value">
            <span class="label">Address</span>{{ user.address }}
          </p>
          <p class="label-value">
            <span class="label">Expired At</span>{{ user.expire_at }}
          </p>
          <p class="label-value">
            <span class="label">Partisipants</span>
            <span v-if="user.particiants"
              >{{ user.particiants[0] }} & {{ user.particiants[1] }}</span
            >
          </p>
          <p class="label-value">
            <span class="label">status</span>
            {{ user.is_approved == 1 ? "Approved" : "Disapproved" }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const dataStore = useDataStore();
onMounted(() => {
  dataStore.getDataList();
});
function deleteItem(id) {
  dataStore.deleteItem(id);
  dataStore.getDataList();
}
const showAddModal = ref(false);
const editID = ref(0);
const showEditModal = ref(false);
function showEdit(id) {
  editID.value = id;
  showEditModal.value = true;
}
</script>
