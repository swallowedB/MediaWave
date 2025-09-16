import logo from "@/assets/Logo.svg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import FloatInput from "../../../components/FloatInput";
import { auth } from "../../../lib/firebase";
import { setUser } from "../../../store/authSlice";
import { emailRegex } from "../constants/validation";
import { useNavigate } from "react-router-dom";

export default function FormBox({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    }

    if (password.length < 6) {
      setPasswordError("비밀번호는 6자리 이상이어야 합니다.");
    }

    try {
      if (type === "login") {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(setUser(userCredential.user));
        navigate('/')
        toast.success("로그인 성공!");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        dispatch(setUser(userCredential.user));
        toast.success("회원가입 성공!");
      }
    } catch (error) {
      console.error(error);
      toast.error("🚨 로그인 실패 : 다시 시도해주세요");
    }
  };

  return (
    <section className="flex flex-col items-center">
      {/* 로고 */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="" />
      </div>

      <p className="text-xs text-white/40 text-center mb-4">
        Welcome to MediaWave
      </p>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FloatInput
          id="email"
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <FloatInput
          id="password"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          withToggle
        />
        <hr className="text-white/30" />

        <button
          type="submit"
          className={`w-full py-2 rounded-lg emibold shadow-lg hover:scale-[1.02] cursor-pointer transition ${className}`}
        >
          {type === "login" ? "Sign In" : "Sign Up"}
        </button>
      </form>
    </section>
  );
}
