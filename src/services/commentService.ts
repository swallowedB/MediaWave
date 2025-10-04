import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../lib/firebase";

// 댓글 추가
export const addComment = async ({
  movieId,
  tvId,
  content,
  userId,
  userName,
  userPhoto,
}: Omit<CommentData, "createdAt" | "likes">) => {
  try {
    const ref = collection(db, "comments");
    const docRef = await addDoc(ref, {
      movieId: movieId ?? null,
      tvId: tvId ?? null,
      content,
      userId,
      userName,
      userPhoto: userPhoto ?? null,
      createdAt: Date.now(),
      likes: 0,
    });
    return docRef.id;
  } catch (error) {
    console.error("🚨 댓글 등록 실패:", error);
    throw error;
  }
};

// 댓글 조회 (정렬, 페이지네이션)
export const getComments = async ({
  movieId,
  tvId,
  sortBy = "createdAt",
  order = "desc",
  pageSize = 10,
  lastDoc,
}: {
  movieId?: string;
  tvId?: string;
  sortBy?: "createdAt" | "likes";
  order?: "asc" | "desc";
  pageSize?: number;
  lastDoc?: QueryDocumentSnapshot<DocumentData>;
}) => {
  try {
    let q = query(
      collection(db, "comments"),
      movieId ? where("movieId", "==", movieId) : where("tvId", "==", tvId),
      orderBy(sortBy, order),
      limit(pageSize)
    );

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const comments = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as CommentData)
    );

    return {
      comments,
      lastDoc: snapshot.docs[snapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("🚨 댓글 불러오기 실패:", error);
    throw error;
  }
};

// 댓글 수정
export const updateComment = async (commentId: string, content: string) => {
  try {
    const ref = doc(db, "comments", commentId);
    await updateDoc(ref, { content });
  } catch (error) {
    console.error("🚨 댓글 수정 실패:", error);
    throw error;
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: string) => {
  try {
    const ref = doc(db, "comments", commentId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("🚨 댓글 삭제 실패:", error);
    throw error;
  }
};

// 댓글 좋아요
export const toggleLikeComment = async (commentId: string, userId: string) => {
  try {
    const likeRef = doc(db, "comments", commentId, "likes", userId);
    const commentRef = doc(db, "comments", commentId);

    const likeDoc = await getDoc(likeRef);
    if (likeDoc.exists()) {
      // 이미 좋아요 → 취소
      await deleteDoc(likeRef);
      await updateDoc(commentRef, { likes: increment(-1) });
    } else {
      // 아직 안 누름 → 추가
      await setDoc(likeRef, { createdAt: Date.now() });
      await updateDoc(commentRef, { likes: increment(1) });
    }
  } catch (error) {
    console.error("🚨 댓글 좋아요 처리 실패:", error);
    throw error;
  }
};

export const subscribeComments = (
  {
    movieId,
    tvId,
    sortBy = "createdAt",
    order = "desc",
  }: {
    movieId?: string;
    tvId?: string;
    sortBy?: "createdAt" | "likes";
    order?: "asc" | "desc";
  },
  callback: (comments: CommentData[]) => void
) => {
  const q = query(
    collection(db, "comments"),
    movieId ? where("movieId", "==", movieId) : where("tvId", "==", tvId),
    orderBy(sortBy, order)
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const comments = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as CommentData)
    );
    callback(comments);
  });

  return unsubscribe;
};
