import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../lib/firebase";

export const updateUserProfile = async (
  userId: string,
  { nickname, profileImageFile }: { nickname?: string; profileImageFile?: File | null }
) => {
  const userRef = doc(db, "users", userId);
  let photoURL;

  if (profileImageFile) {
    const storageRef = ref(storage, `profiles/${userId}`);
    await uploadBytes(storageRef, profileImageFile);
    photoURL = await getDownloadURL(storageRef);
  }

  await updateDoc(userRef, {
    displayName: nickname,
    photoURL: photoURL ?? null,
  });

  return { nickname, profileImageUrl: photoURL };
};
