import { useState } from "react";
import { firestore } from "../firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

const useFetchFollowersPosts = () => {
  const [loading, setLoading] = useState(false);

  const fetchFollowersPosts = async (following: string[]) => {
    setLoading(true);
    try {
      const fetchedPosts: any[] = [];
      for (const id of following) {
        const followerPostsQuery = query(
          collection(firestore, "posts"),
          where("userId", "==", id),
          orderBy("timestamp", "desc")
        );
        const followerPostsSnapshot = await getDocs(followerPostsQuery);
        followerPostsSnapshot.forEach((doc) => {
          const postData = doc.data();
          fetchedPosts.push({ id: doc.id, ...postData });
        });
      }
      return fetchedPosts;
    } catch (error: any) {
      console.error("Error fetching followers' posts:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, fetchFollowersPosts };
};

export default useFetchFollowersPosts;
