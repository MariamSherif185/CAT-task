<template>
  <div v-if="showModal" class="modal-backdrop">
    <div class="modal">
      <h2 v-if="type == 'add'" class="mb-5 text-2xl">Add New Item</h2>
      <h2 v-if="type == 'edit'" class="mb-5 text-2xl">Edit Item</h2>
      <form @submit.prevent="submitForm">
        <input v-model="name" placeholder="Name" class="mr-4 mb-5" />
        <input v-model="address" placeholder="Address" />
        <div class="flex gap-8 w-full mb-5">
          <div class="flex gap-2 items-center">
            <label for="">Approve</label>
            <input
              type="radio"
              name="isApproved"
              value="1"
              v-model="isApproved"
            />
          </div>
          <div class="flex gap-2 items-center">
            <label for="">Disapprove</label>
            <input
              type="radio"
              name="isApproved"
              value="0"
              v-model="isApproved"
            />
          </div>
        </div>
        <input
          type="date"
          name=""
          v-model="expireAt"
          id=""
          class="mr-20 mb-5"
          placeholder="Expired At"
        />
        <input
          type="text"
          name=""
          id=""
          v-model="firstParticipant"
          placeholder="First Participant"
          class="mr-5 mb-5"
        />
        <input
          type="text"
          name=""
          id=""
          v-model="secondParticipant"
          placeholder="Second Participant"
        />
        <input type="file" @change="handleFileChange" />
        <div class="w-full flex justify-between mt-5">
          <button
            type="submit"
            class="bg-[#fff] text-[#000] px-2 py-1 rounded-md"
          >
            Submit
          </button>
          <button
            @click="$emit('close')"
            class="bg-[#fff] text-[#000] px-2 py-1 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { useDataStore } from "@/stores/data";
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: 0,
  },
});

const dataStore = useDataStore();

const name = ref("");
const address = ref("");
const isApproved = ref("0");
const expireAt = ref("");
const firstParticipant = ref("");
const secondParticipant = ref("");
const eventFile = ref<File | null>(null);
function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    eventFile.value = target.files[0];
    console.log("Selected file:", eventFile.value);
  }
}
const emit = defineEmits(["close"]);
async function submitForm() {
  //   if (!eventFile.value) return;
  if (props.type == "add") {
    await dataStore.createNewItem(
      name.value,
      address.value,
      isApproved.value,
      expireAt.value,
      firstParticipant.value,
      secondParticipant.value,
      eventFile.value as File
    );
  } else if (props.type == "edit") {
    await dataStore.updateItem(
      props.id,
      name.value,
      address.value,
      isApproved.value,
      expireAt.value,
      firstParticipant.value,
      secondParticipant.value,
      eventFile.value as File
    );
  }
  dataStore.getDataList();
  // Optionally clear form
  name.value = "";
  address.value = "";
  isApproved.value = "0";
  expireAt.value = "";
  firstParticipant.value = "";
  secondParticipant.value = "";
  eventFile.value = null;
  emit("close");
}
</script>
