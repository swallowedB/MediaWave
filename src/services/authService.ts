import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// google 로그인
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("🚨 Google 로그인 실패:", error);
    throw error;
  }
};

// github 로그인
export const githubLogin = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("🚨 Github 로그인 실패:", error);
    throw error;
  }
};

//로그아웃
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("🚨 로그아웃 실패:", error);
    throw error;
  }
};

//이메일 로그인
export const emailLogin = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("🚨 로그인 실패:", error);
    throw error;
  }
};

//이메일 회원가입
export const emailSignup = async (email: string, password: string) => {
  try{
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error){
    console.error("🚨 회원가입 실패:", error);
    throw error;
  }
};
