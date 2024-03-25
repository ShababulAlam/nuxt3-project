import { storeToRefs } from "pinia";
import { usePostsStore } from "~/stores/posts";
export default usePosts = () => {
  const { pending, data } = storeToRefs(usePostsStore());

  return {
    pending,
    data,
  };
};
