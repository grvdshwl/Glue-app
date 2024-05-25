import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useToast from "./useToast";

export const useSignUpWithEmailAndPassword = () => {
  const showToast = useToast();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const signUp = async (inputs: any) => {
    const { email, password, fullName } = inputs;
    try {
      const newUser = await createUserWithEmailAndPassword(email, password);
      if (!newUser && error) {
        showToast("error", error.message);
        return;
      }

      if (!!newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email,
          fullName,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        const docRef = doc(firestore, "users", newUser.user.uid);
        const user = await getDoc(docRef);

        return user.data();
      }
      return null;
    } catch (error: any) {
      showToast("error", error.message);
    }
  };

  return { signUp, loading, user, error };
};
