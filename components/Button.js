import classNames from "classnames";

export default function Button({
  children,
  color = "blue",
  className,
  margin = "m-2",
  ...props
}) {
  return (
    <button
      className={classNames(
        className,
        `disabled:opacity-50 disabled:bg-${color}-500 bg-${color}-500 hover:bg-${color}-700 text-white font-bold py-2 px-4 shadow ${margin}`
      )}
      {...props}
    >
      {children}
    </button>
  );
}
