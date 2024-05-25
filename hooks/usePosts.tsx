import { useState, useEffect } from "react";
import { firestore, storage } from "../firebase";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import useToast from "./useToast";
import { generateUUID } from "../utils/helper";

const usePosts = (postId: string, user: any) => {
  const toast = useToast();
  const { uid: userId } = user;
  const [loading, setLoading] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikes = async () => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDocSnapshot = await getDoc(postDocRef);
      if (postDocSnapshot.exists()) {
        const postData = postDocSnapshot.data();
        setLikesCount(postData.likes.length);
        setIsLiked(postData.likes.includes(userId));
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLikes = async () => {
    try {
      setLoading(true);

      const postDocRef = doc(firestore, "posts", postId);
      if (isLiked) {
        await updateDoc(postDocRef, {
          likes: arrayRemove(userId),
        });
      } else {
        await updateDoc(postDocRef, {
          likes: arrayUnion(userId),
        });
      }
    } catch (error) {
      console.error("Error toggling Likes:", error);
    } finally {
      fetchLikes();
    }
  };

  const deletePostImages = async () => {
    try {
      const userImageRef = ref(storage, `postImages/${userId}`);
      const userImagesList = await listAll(userImageRef);

      const deletePromises = userImagesList.items.map(async (imageRef) => {
        const imageName = imageRef.name;
        if (imageName.includes(postId)) {
          await deleteObject(imageRef);
        }
      });

      await Promise.all(deletePromises);
    } catch (error) {
      console.error("Error deleting post images:", error);
    }
  };

  const deletePost = async () => {
    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDocSnapshot = await getDoc(postDocRef);
      if (postDocSnapshot.exists()) {
        const postData = postDocSnapshot.data();
        const { userId } = postData;
        const userDocRef = doc(firestore, "users", userId);
        await updateDoc(userDocRef, {
          posts: arrayRemove(postId),
        });
      }

      await deleteDoc(postDocRef);
      await deletePostImages();
      toast("success", "Post Deleted Successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const addComment = async (commentText: string) => {
    setLoading(true);

    try {
      const postDocRef = doc(firestore, "posts", postId);
      const id = generateUUID();
      const userInfo = {
        id: user.uid,
        uid: user.uid,
        profilePicUrl: user.profilePicUrl,
        fullName: user.fullName,
      };
      await updateDoc(postDocRef, {
        comments: arrayUnion({ user: userInfo, comment: commentText, id }),
      });
      setLoading(false);

      toast("success", "Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const editPostCaption = async (newCaption: string) => {
    setLoading(true);

    try {
      const postDocRef = doc(firestore, "posts", postId);
      const postDocSnapshot = await getDoc(postDocRef);

      if (postDocSnapshot.exists()) {
        await updateDoc(postDocRef, {
          caption: newCaption,
        });

        toast("success", "Post Caption Edited Successfully!");
        setLoading(false);
      } else {
        toast("error", "Post not found!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error editing post caption:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, []);

  return {
    loading,
    likesCount,
    isLiked,
    toggleLikes,
    deletePost,
    addComment,
    editPostCaption,
  };
};

export default usePosts;
