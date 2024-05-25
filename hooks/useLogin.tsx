import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import useToast from "./useToast";
import { auth, firestore } from "../firebase";

const useLogin = () => {
  const showToast = useToast();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleUserLogin = async (inputs: any) => {
    try {
      const userAuth = await signInWithEmailAndPassword(
        inputs.email,
        inputs.password
      );
      if (!!userAuth) {
        const docRef = doc(firestore, "users", userAuth.user.uid);
        const userDoc = await getDoc(docRef);

        return userDoc.data();
      } else {
        return null;
      }
    } catch (error) {
      showToast("error", error as string);
    }
  };

  return { handleUserLogin, loading, error };
};

export default useLogin;
