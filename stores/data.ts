import { defineStore } from "pinia";

export const useDataStore = defineStore("data", {
  state: () => ({
    data: [],
  }),
  actions: {
    async getDataList() {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");
      const res = await $axios.get(`event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.data = res.data;
    },
    async getFilteredDataList(
      name: string,
      from: string,
      to: string,
      approved: string
    ) {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");
      const res = await $axios.get(`event`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
          "expire_at[date-from]": from,
          "expire_at[date-to]": to,
          is_approved: approved,
        },
      });
      this.data = res.data;
    },
    async createNewItem(
      name: string,
      address: string,
      is_approved: string,
      expire_at: string,
      firstParticiant: string,
      secondParticipant: string,
      event_file: File
    ) {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("is_approved", is_approved);
      formData.append("expire_at", expire_at);
      formData.append("particiants[0]", firstParticiant);
      formData.append("particiants[1]", secondParticipant);
      formData.append("event_file", event_file); // for file upload
      const res = await $axios.post("create-event", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    async updateItem(
      id: number,
      name: string,
      address: string,
      is_approved: string,
      expire_at: string,
      firstParticiant: string,
      secondParticipant: string,
      event_file: File
    ) {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("is_approved", is_approved);
      formData.append("expire_at", expire_at);
      formData.append("particiants[0]", firstParticiant);
      formData.append("particiants[1]", secondParticipant);
      formData.append("event_file", event_file); // for file upload
      const res = await $axios.post(`update-event/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    async deleteItem(id: number) {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem("token");
      const res = await $axios.delete(`event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  },
});
