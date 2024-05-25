import { useState } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const useFetchPostsByIds = () => {
  const [loading, setLoading] = useState(false);

  const fetchPostsByIds = async (postIds: any) => {
    setLoading(true);
    try {
      const fetchedPosts: any = [];
      for (const postId of postIds) {
        const postDocRef = doc(firestore, "posts", postId);
        const postDocSnapshot = await getDoc(postDocRef);
        if (postDocSnapshot.exists()) {
          const postData = postDocSnapshot.data();
          fetchedPosts.push({ id: postId, ...postData });
        }
      }
      return fetchedPosts;
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchPostsByIds };
};

export default useFetchPostsByIds;
