import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";
import {
  Firestore,
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";

interface FollowMethods {
  follow: () => void;
  isLoading: boolean;
}

const useFollow = (
  currentUser: any,
  displayUser: any,
  isFollowing: boolean
): FollowMethods => {
  const [isLoading, setIsLoading] = useState(false);

  const follow = async () => {
    setIsLoading(true);
    try {
      const currentUserDocRef = doc(firestore, "users", currentUser.uid);
      const displayUserDocRef = doc(firestore, "users", displayUser.uid);
      await updateDoc(currentUserDocRef, {
        following: isFollowing
          ? arrayRemove(displayUser.uid)
          : arrayUnion(displayUser.uid),
      });

      await updateDoc(displayUserDocRef, {
        followers: isFollowing
          ? arrayRemove(currentUser.uid)
          : arrayUnion(currentUser.uid),
      });
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { follow, isLoading };
};

export default useFollow;
