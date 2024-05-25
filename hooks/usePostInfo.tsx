import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

interface PostInfo {
  id: number;
  user: {
    name: string;
    userImage: string;
  };
  post: {
    user: string;
    image: string;
  };
}

interface UserInfo {}

const usePostInfo = (userId: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [postInfos, setPostInfos] = useState<PostInfo[]>([]);

  useEffect(() => {
    setLoading(true);

    const fetchUserInfo = async () => {
      try {
        const userDocRef = doc(firestore, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) return;
        const userData = userDocSnapshot.data();
        if (!userData || !userData.posts) {
          setPostInfos([]);
          setLoading(false);

          return;
        }

        const postPromises = userData.posts.map(async (postId: string) => {
          const postDocRef = doc(firestore, "posts", postId);
          const postDocSnapshot = await getDoc(postDocRef);

          if (!postDocSnapshot.exists()) return null;

          const postData = postDocSnapshot.data() as any;
          const { id, likes } = postData;
          const images = postData.images || [];

          const likesUserInfoPromises = likes
            .filter((likesId: string) => likesId !== userId)
            .map(async (likeUserId: any) => {
              const likeUserDocRef = doc(firestore, "users", likeUserId);
              const likeUserDocSnapshot = await getDoc(likeUserDocRef);
              if (likeUserDocSnapshot.exists())
                return likeUserDocSnapshot.data() as UserInfo;
              return null;
            });

          const likesUserInfo = await Promise.all(likesUserInfoPromises);

          const finalInfo = likesUserInfo.reverse().map((data) => ({
            user: {
              name: data.fullName,
              userImage: data.profilePicUrl,
            },
            post: {
              image: images[0]?.url,
            },
            id: `${data.uid}-${id}`,
          }));
          return finalInfo;
        });

        const fetchedPostInfos = await Promise.all(postPromises);
        const finalData = fetchedPostInfos
          .filter((post) => post !== null)
          .flatMap((data) => data) as PostInfo[];
        setPostInfos(finalData);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setPostInfos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();

    return () => {};
  }, [userId]);

  return { loading, postInfos };
};

export default usePostInfo;
