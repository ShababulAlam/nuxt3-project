import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", () => {
  const postsList = ref([]);
  const searchQuery = ref("");

  async function fetchPosts() {
    try {
      const { data } = await useFetch(
        "https://jsonplaceholder.typicode.com/posts",
      );
      if (data) {
        postsList.value = data.value;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const filterData = computed(() => {
    if (!searchQuery.value) {
      return postsList.value;
    }
    return postsList.value.filter((post) =>
      String(post.title)
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()),
    );
  });

  return {
    filterData,
    searchQuery,
    fetchPosts,
  };
});
