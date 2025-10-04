import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// 북마크 목록 가져오기
export const getBookmark = async (userId: string): Promise<Bookmark[]> => {
  try {
    const ref = collection(db, "users", userId, "bookmarks");
    const snap = await getDocs(ref);
    return snap.docs.map((doc) => doc.data() as Bookmark);
  } catch (error) {
    console.error("🚨 북마크 불러오기 실패:", error);
    return []
  }
};

// 북마크 추가/삭제 토글
export const toggleBookmark = async (
  userId: string,
  bookmark: Bookmark
): Promise<"added" | "removed"> => {
  try {
    const bookmarkRef = doc(db, "users", userId, "bookmarks", String(bookmark.id));
    const snap = await getDoc(bookmarkRef);

    if (snap.exists()) {
      await deleteDoc(bookmarkRef);
      return "removed";
    } else {
      await setDoc(bookmarkRef, { ...bookmark, addedAt: Date.now() });
      return "added";
    }
  } catch (error) {
    console.error("🚨 북마크 수정 실패:", error);
    throw error;
  }
};