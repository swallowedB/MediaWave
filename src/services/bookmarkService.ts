import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// 북마크 추가
export const addBookmark = async (userId: string, bookmark: Bookmark) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", bookmark.id);
    await setDoc(ref, bookmark);
  } catch (error) {
    console.error("🚨 북마크 추가 실패:", error);
    throw error;
  }
};

// 북마크 삭제
export const removeBookmark = async (userId: string, contentId: string) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", contentId);
    await deleteDoc(ref);
  } catch (error) {
    console.error("🚨 북마크 삭제 실패:", error);
    throw error;
  }
};

// 북마크 여부 확인
export const isBookmarked = async (userId: string, contentId: string) => {
  try {
    const ref = doc(db, "users", userId, "bookmarks", contentId);
    const snap = await getDoc(ref);
    return snap.exists();
  } catch (error) {
    console.error("🚨 북마크 확인 실패:", error);
    throw error;
  }
};

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