export const Placeholder = ({ className, children, target }) => {
  const { width, height } = target.getBoundingClientRect();

  return (
    <div
      className={className}
      style={{ width: `${width}px`, height: `${height}px`}}
    >
      {children}
    </div>
  );
}