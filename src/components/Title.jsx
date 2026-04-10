function Title({ children, as = "h1" }) {
  const Tag = as;

  return (
    <Tag className="text-2xl font-semibold text-white tracking-tight">
      {children}
    </Tag>
  );
}

export default Title;
