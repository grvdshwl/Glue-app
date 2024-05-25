import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase"; // Import your Firebase instance

interface UserData {
  // Define the structure of your user data
  fullName: string;
  email: string;
  // Add other fields as needed
}

const useUserData = (uid: string): UserData | null => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userDocRef = doc(firestore, "users", uid);

    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data() as UserData;
        setUserData(userData);
      } else {
        setUserData(null);
      }
    });

    // Cleanup function to unsubscribe from snapshot listener when component unmounts
    return () => unsubscribe();
  }, [uid]); // Re-run effect whenever UID changes

  return userData;
};

export default useUserData;
