import "./Input.css";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
}

const Input = ({ icon, label, className = "", ...props }: InputProps) => {
  return (
    <label className={`cvInput ${className}`}>
      {label && <span>{label}</span>}
      <div className="cvInputField">
        {icon}
        <input {...props} />
      </div>
    </label>
  );
};

export default Input;
