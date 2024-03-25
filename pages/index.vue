<template>
  <div class="flex items-center h-screen">
    <UContainer>
      <div
        class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700 items-center"
      >
        <UInput v-model="searchQuery" placeholder="Search Title..." />
      </div>

      <UTable :rows="rows" :columns="columns" />

      <div
        class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
      >
        <UPagination
          v-model="page"
          :page-count="pageCount"
          :total="filterData.length"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup>
import { usePostsStore } from "~/store/posts";
import { storeToRefs } from "pinia";
const { fetchPosts } = usePostsStore();

const { filterData, searchQuery } = storeToRefs(usePostsStore());

fetchPosts();

const columns = [
  {
    key: "userId",
    label: "UserId",
  },
  {
    key: "id",
    label: "Id",
  },
  {
    key: "title",
    label: "Title",
    sortable: true,
    direction: "desc",
  },
  {
    key: "body",
    label: "Body",
  },
];

const page = ref(1);
const pageCount = 10;

const rows = computed(() => {
  if (filterData.value) {
    return filterData.value.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount,
    );
  }
  return filterData.value;
});
</script>
