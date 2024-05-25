import { doc, getDoc, updateDoc } from "firebase/firestore";
import useToast from "./useToast";
import { firestore } from "../firebase";

interface UpdateProfileDataProps {
  uid: string;
  newData: any; // Adjust the type according to your data structure
}

const useUpdateProfileData = () => {
  const showToast = useToast();

  const updateUserProfile = async (uid: string, newData: any) => {
    try {
      const docRef = doc(firestore, "users", uid);

      await updateDoc(docRef, newData);
      const userDoc = await getDoc(docRef);

      return userDoc.data();
    } catch (error: any) {
      showToast("error", error.message);
    }
  };

  return { updateUserProfile };
};

export default useUpdateProfileData;
