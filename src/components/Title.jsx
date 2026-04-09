function Title({ children, as = "h1" }) {
  const Tag = as;

  return (
    <Tag className="text-3xl font-bold text-slate-100 text-center">
      {children}
    </Tag>
  );
}

export default Title;