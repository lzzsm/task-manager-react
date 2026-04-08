function Input({ className = "", ...rest }) {
  return (
    <input
      className={`border border-slate-300 outline-slate-400 px-4 py-2 rounded-md ${className}`}
      {...rest}
    />
  );
}

export default Input;
