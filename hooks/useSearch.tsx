import { collection, query, where, Firestore } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "../firebase";

export const useSearch = (uid: string) => {
  const firestoreCollection = collection(firestore, "users");
  const firestoreQuery = query(firestoreCollection, where("uid", "!=", uid));
  const [value, loading, error] = useCollection(firestoreQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const searchUsers = (filterString: string) => {
    if (!value) return []; //
    return value.docs
      .map((doc) => doc.data())
      .filter((userData) =>
        userData.fullName.toLowerCase().includes(filterString.toLowerCase())
      );
  };

  return { searchUsers, value, loading, error };
};
