import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBox from "./components/FormBox";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center">
      <section
        className="relative z-10 w-80 rounded-3xl flex flex-col items-end
                  bg-gradient-to-b from-[#1a1f2e]/50 to-[#0b0e17]/60 
                  backdrop-blur-xl border border-white/10 shadow-2xl px-8 py-12"
      >
        {/* 로그인 / 회원가입 */}
        {isLogin ? (
          <FormBox
            type="login"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-sm"
          />
        ) : (
          <FormBox
            type="signUp"
            className="bg-gradient-to-r from-indigo-600 to-blue-300 text-white font-sm"
          />
        )}
      </section>

      <button
        onClick={() => setIsLogin(!isLogin)}
        className="z-10 px-4 py-1 rounded-md text-xs mt-3 text-white/70 hover:bg-white/10 transition cursor-pointer"
      >
        {isLogin ? "Sign Up →" : " Back →"}
      </button>

      {/* Footer */}
      <div className="fixed bottom-8 right-10">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition cursor-pointer "
        >
          Skip
        </button>
      </div>
    </main>
  );
}
