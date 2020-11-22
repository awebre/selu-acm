import classNames from "classnames";

export default function Label({ className, children, ...rest }) {
  return (
    <label
      className={classNames(
        className,
        "mb-2 uppercase font-bold text-grey-darkest"
      )}
      {...rest}
    >
      {children}
    </label>
  );
}
