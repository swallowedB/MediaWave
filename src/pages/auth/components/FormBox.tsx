import logo from "@/assets/Logo.svg";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FloatInput from "../../../components/FloatInput";
import { emailLogin, emailSignup } from "../../../services/authService";
import { setUser } from "../../../store/authSlice";
import { emailRegex } from "../constants/validation";
import SocialLogin from "./SocialLogin";

export default function FormBox({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "이메일 형식이 올바르지 않습니다.",
      }));
    }

    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "비밀번호는 6자 이상이어야 합니다.",
      }));
    }

    try {
      const user =
        type === "login"
          ? await emailLogin(email, password)
          : await emailSignup(email, password);
      dispatch(setUser(user));
      toast.success(type === "login" ? "로그인 성공!" : "회원가입 성공!");
      if (type === "login") navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("🚨 인증 실패 : 다시 시도해주세요");
    }
  };

  return (
    <section className="flex flex-col items-center">
      {/* 로고 */}
      <div className="flex justify-center mb-10">
        <img src={logo} alt="" />
      </div>

      {(errors.email || errors.password) && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-500 text-sm">
            {errors.email || errors.password}
          </p>
        </div>
      )}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FloatInput
          id="email"
          type="email"
          value={email}
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        <FloatInput
          id="password"
          type="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          withToggle
        />

        <button
          type="submit"
          className={`w-full py-2 rounded-lg emibold shadow-lg hover:scale-[1.02] cursor-pointer transition ${className}`}
        >
          {type === "login" ? "로그인" : "회원가입"}
        </button>
      </form>

      <div className="flex items-center my-6 w-full">
        <div className="flex-grow h-px bg-gradient-to-r from-blue-500/60 to-purple-500/60"></div>
        <span className="px-3 text-sm font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Continue with Social Login
        </span>
        <div className="flex-grow h-px bg-gradient-to-r from-purple-500/60 to-blue-500/60"></div>
      </div>

      <SocialLogin />
    </section>
  );
}
