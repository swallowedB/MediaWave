import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { githubLogin, googleLogin } from "../../../services/authService";
import { setUser } from "../../../store/authSlice";

export default function SocialLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogle = async () => {
    try {
      const user = await googleLogin();
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            token,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      }
      navigate("/");
      toast.success(`✨ Welcome ${user.displayName || "Mewo"}`);
    } catch {
      toast.error("🚨 Google 로그인 실패");
    }
  };

  const handleGithub = async () => {
    try {
      const user = await githubLogin();
      if (user) {
        const token = await user.getIdToken();
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            token,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      }
      navigate("/");
      toast.success(`✨ Welcome ${user.displayName || "Mewo"}`);
    } catch {
      toast.error("🚨 Github 로그인 실패");
    }
  };
  return (
    <div className="flex gap-4 font-sans font-medium w-full">
      {/* Google */}
      <button
        onClick={handleGoogle}
        className="flex-1 flex items-center justify-center gap-2 cursor-pointer
                   py-3 rounded-xl 
                   bg-white/10 backdrop-blur-md border border-white/20
                   text-white hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30
                   transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      >
        <FcGoogle className="w-6 h-6" />
        <span className="text-sm">Google</span>
      </button>

      {/* GitHub */}
      <button
        onClick={handleGithub}
        className="flex-1 flex items-center justify-center gap-2 cursor-pointer
                   py-3 rounded-xl 
                   bg-white/10 backdrop-blur-md border border-white/20
                   text-white hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-blue-500/30
                   transition-all duration-300 shadow-lg hover:shadow-purple-500/15"
      >
        <FaGithub className="w-6 h-6" />
        <span className="text-sm">GitHub</span>
      </button>
    </div>
  );
}
