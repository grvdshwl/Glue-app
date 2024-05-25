import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useToast from "./useToast";

const useGoogleLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const showToast = useToast();

  const googleLogin = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        showToast("error", error.message);
        return;
      }
      const docRef = doc(firestore, "users", newUser?.user.uid as string);

      const user = await getDoc(docRef);

      if (!user.exists() && !!newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser.user.email,
          fullName: newUser.user.displayName,
          bio: "",
          profilePicUrl: "",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);

        const user = await getDoc(docRef);
        return user.data();
      } else {
        return user.data();
      }
    } catch (error: any) {
      showToast("error", error.message);
    }
  };
  return { googleLogin, loading, error, user };
};

export default useGoogleLogin;
