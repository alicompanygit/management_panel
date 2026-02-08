<template>
  <div
    class="dashboard-container d-flex justify-center align-center text-white"
  >
    <base-table-server
      :headers="tableHeaders"
      :items="tableData?.users ?? []"
      :loading="loading"
      :totalItems="tableData?.total || 0"
      @pageControler="onPageControler"
    >
      <template v-slot:role="{ item }">
        <base-chip :text="handleGetRole(item)" />
      </template>
      <template v-slot:action="{ item }">
        <base-button
          v-if="!item.is_god"
          :text="item.is_super_user ? 'ChangeToUser' : 'ChangeToSuperUser'"
        />
        <span v-else v-text="'-'" />
      </template>
    </base-table-server>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useAuth, type usersListModel } from '~/composables/auth';
import { useI18n } from 'vue-i18n';

definePageMeta({
  layout: 'dashboard',
});

const { t } = useI18n();

const loading = ref(false);
const pageNumber = ref(1);
const tableHeaders = ref([
  { title: t('Index'), key: 'index', align: 'start' },
  { title: t('UserName'), key: 'name', align: 'start' },
  { title: t('Email'), key: 'email' },
  { title: t('Role'), key: 'role' },
  { title: t('Action'), key: 'action' },
]);

const tableData = computed(() => useAuth.usersListData);

const onPageControler = (info?: any) => {
  if (info) {
    pageNumber.value = info.page;
  }
  fetchUserList();
};

const fetchUserList = async () => {
  loading.value = true;
  await useAuth.apiFetchUsersList(pageNumber.value);
  loading.value = false;
};

const handleGetRole = (item: usersListModel) => {
  if (item.is_god) return 'god user';
  else if (item.is_super_user) return 'super user';
  else return 'user';
};

onMounted(async () => {
  useAuth.usersListData = null;
  // await fetchUserList();
});
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: calc(100vh - 100px) !important;
}

.container {
  background-color: #1c1c21;
}

.text-custom {
  font-size: 30px;
}
</style>
