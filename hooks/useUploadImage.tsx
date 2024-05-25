import { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase";
import useToast from "./useToast";

const useUploadImage = () => {
  const showToast = useToast();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const uploadImage = async (userData: any, selectedFile: any) => {
    if (isUpdating || !userData || !selectedFile) return;

    const { uid } = userData;

    setIsUpdating(true);

    try {
      const storageRef = ref(storage, `profilePics/${uid}`);
      await uploadBytesResumable(storageRef, selectedFile);

      const imageURL = await getDownloadURL(ref(storage, `profilePics/${uid}`));

      return imageURL;
    } catch (error: any) {
      console.error(error);
      showToast("error", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return { uploadImage, loading: isUpdating };
};

export default useUploadImage;
