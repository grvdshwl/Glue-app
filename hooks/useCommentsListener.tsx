import { useState, useEffect } from "react";
import { firestore } from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  DocumentSnapshot,
} from "firebase/firestore";

interface Comment {
  id: string;
  comment: string;
  user: {
    id: string;
    uid: string;
    profilePicUrl: string;
    fullName: string;
  };
}

interface CommentListenerResult {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const useCommentListener = (
  postId: string,
  initialComments: any[]
): CommentListenerResult => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const postRef = doc(firestore, "posts", postId);
    const unsubscribe = onSnapshot(
      postRef,
      (snapshot: DocumentSnapshot) => {
        if (snapshot.exists()) {
          const postData = snapshot.data();
          if (postData && postData.comments) {
            setComments(postData.comments);
          } else {
            setComments([]);
          }
          setLoading(false);
          setError(null);
        } else {
          setComments([]);
          setLoading(false);
          setError("Post not found");
        }
      },
      (error) => {
        console.error("Error fetching comments:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [postId]);

  return { comments, loading, error };
};

export default useCommentListener;
