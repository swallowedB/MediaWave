import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store/store"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { clearUser, setUser } from "../store/authSlice";
import { auth } from "../lib/firebase";

export default function useAuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if(firebaseUser){
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
        };
        dispatch(setUser(userData))
      }else{
        dispatch(clearUser());
      }
    })

    return () => unsubscribe();
  }, [dispatch])
}
