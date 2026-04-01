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
      className={`bg-slate-400 text-white p-2 rounded-md ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
