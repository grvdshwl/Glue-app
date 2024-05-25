import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { firestore, storage } from "../firebase";
import useToast from "./useToast";
import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";

const useCreatePost = () => {
  const showToast = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const createPost = async (
    postData: any,
    selectedFiles: any[],
    userId: string
  ) => {
    if (isUpdating || !postData || !selectedFiles.length || !userId) return;

    setIsUpdating(true);

    try {
      // Save post data to firestore
      postData.timestamp = serverTimestamp();
      const postRef = doc(firestore, "posts", postData.id);
      await setDoc(postRef, postData);

      // Upload images to storage
      const promises = selectedFiles.map(async (file,index) => {
        const storageRef = ref(storage, `postImages/${userId}/${postData.id}-${index}`);
        await uploadBytesResumable(storageRef, file);
        const imageURL = await getDownloadURL(storageRef);
        return { url: imageURL, alt: postData.caption || postData.user.name };
      });

      // Wait for all images to upload and get their download URLs
      const images = await Promise.all(promises);

      // Update post document in firestore with the image URLs
      await updateDoc(postRef, { images });

      // Update user's post array in firestore
      const userRef = doc(firestore, "users", userId);
      await updateDoc(userRef, { posts: arrayUnion(postData.id) });

      showToast("success", "Post created successfully");
    } catch (error: any) {
      console.error(error);
      showToast("error", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { createPost, loading: isUpdating };
};

export default useCreatePost;
