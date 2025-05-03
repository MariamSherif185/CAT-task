<template>
  <div>
    <form
      @submit.prevent="filter"
      class="flex gap-4 items-end xl:flex-nowrap flex-wrap mb-2"
    >
      <div class="form-group w-full sm:w-[30%]">
        <label for="">Name</label>
        <input
          type="text"
          v-model="name"
          placeholder="Search"
          class="border border-[#07137B] py-1 px-2 md:px-4 md:py-2 rounded-lg"
        />
      </div>
      <div class="form-group w-[45%]">
        <label for="">From</label>
        <input
          type="date"
          v-model="from"
          class="border border-[#07137B] py-1 px-2 md:px-4 md:py-2 rounded-lg"
        />
      </div>
      <div class="form-group w-[45%]">
        <label for="">To</label>
        <input
          type="date"
          v-model="to"
          class="border border-[#07137B] py-1 px-2 md:px-4 md:py-2 rounded-lg"
        />
      </div>
      <div class="relative h-full">
        <button
          @click="showStatus = !showStatus"
          class="flex gap-2 h-hull border border-[#07137B] rounded-lg py-1 px-2 md:px-4 md:py-2"
        >
          {{
            approved == "1"
              ? "Approved"
              : approved == "0"
              ? "Disapproved"
              : "Status"
          }}
          <IconsIconArrow />
        </button>
        <div
          v-if="showStatus"
          class="flex flex-col top-[120%] absolute shadow-lg rounded-lg py-3 bg-[#fff]"
        >
          <button
            type="button"
            @click="approved = 1"
            class="px-2 py-1 hover:bg-slate-400"
          >
            Approved
          </button>
          <button
            type="button"
            @click="approved = 0"
            class="px-2 py-1 hover:bg-slate-400"
          >
            Disapproved
          </button>
        </div>
      </div>
      <button type="submit" class="btn-primary">Search</button>
      <button
        type="button"
        @click="dataStore.getDataList"
        class="bg-[#FCDDEC] rounded-lg px-4 py-2"
      >
        Reset
      </button>
    </form>
  </div>
</template>
<script setup>
const showStatus = ref(false);
const dataStore = useDataStore();
const name = ref("");
const from = ref("");
const to = ref("");
const approved = ref("");
const filter = async () => {
  await dataStore.getFilteredDataList(
    name.value,
    from.value,
    to.value,
    approved.value
  );
};
</script>
