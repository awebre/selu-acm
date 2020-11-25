import classNames from "classnames";

export default function Label({ className, inline, children, ...rest }) {
  return (
    <label
      className={classNames(
        className,
        { "mb-2": !inline },
        "uppercase font-bold text-grey-darkest"
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
