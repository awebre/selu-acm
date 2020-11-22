import classNames from "classnames";

export default React.forwardRef(({ className, options, ...rest }, ref) => {
  if (!options) {
    throw Error("Select must be given an options array");
  }

  return (
    <select
      className={classNames(
        className,
        "border py-2 px-3 text-grey-darkest shadow-inner rounded disabled:bg-gray-300"
      )}
      ref={ref}
      {...rest}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
});
