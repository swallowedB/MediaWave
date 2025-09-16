import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface FloatInputProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  withToggle?: boolean;
  error: string;
}

export default function FloatInput({
  id,
  label,
  type,
  value,
  onChange,
  error,
  withToggle,
}: FloatInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full inline-block">
      <input
        id={id}
        placeholder={label}
        type={showPassword ? "text" : type}
        value={value}
        onChange={onChange}
        className={`w-full peer px-4 py-2.5 rounded-lg bg-white/10 focus:bg-white/0 text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all border  ${
          error ? "border-2 border-[#e00f66]" : "border-white/20"
        } `}
      />
      <label
        className="absolute left-3 text-white/0 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-focus:top-[-9px] peer-focus:text-sm peer-focus:text-blue-400 px-1 peer-focus:bg-[#170E2A] "
        htmlFor={id}
      >
        {label}
      </label>
      {type === "password" &&
        withToggle &&
        (!showPassword ? (
          <Eye
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 w-5 text-white/50"
          />
        ) : (
          <EyeOff
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2.5 right-3 w-5 text-white/50"
          />
        ))}
      {error && (
        <label className="font-sans font-medium text-xs text-[#e00f66] pl-2 ">
          {error}
        </label>
      )}
    </div>
  );
}
