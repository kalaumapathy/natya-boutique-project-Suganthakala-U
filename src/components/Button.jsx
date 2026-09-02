function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const variantClass = variant === "link" ? "btn-link" : `btn-${variant}`;
  const buttonClasses = [variantClass, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
