import { defineStore } from 'pinia';

export const useTableStore = defineStore('tableStore', {
  state: () => ({
    currentPage: 1,
    itemsPerPage: 30,
  }),
  actions: {
    resetPagination(itemsPerPage = 10) {
      this.currentPage = 1;
      this.itemsPerPage = itemsPerPage;
    },
  },
});
