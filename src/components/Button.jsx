import { twMerge } from "tailwind-merge";

function Button({
  children,
  className = "",
  onClick,
  type = "button",
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        "border border-indigo-500/40 bg-transparent text-slate-300 px-3 py-2 rounded-md transition-all duration-150 hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 active:scale-95 cursor-pointer",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
