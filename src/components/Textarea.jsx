import { twMerge } from "tailwind-merge";

function Textarea({ className = "", ...rest }) {
  return (
    <textarea
      className={twMerge(
        "bg-transparent border border-indigo-500/30 text-slate-200 placeholder-slate-500 px-4 py-2 rounded-md outline-none transition-all duration-150 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 w-full resize-none",
        className,
      )}
      {...rest}
    />
  );
}

export default Textarea;
