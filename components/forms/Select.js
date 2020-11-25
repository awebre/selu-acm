import classNames from "classnames";

export default React.forwardRef(
  ({ className, options, hasError, ...rest }, ref) => {
    if (!options) {
      throw Error("Select must be given an options array");
    }

    return (
      <select
        className={classNames(
          className,
          { "border-red-600": hasError },
          "border py-2 px-3 text-grey-darkest shadow-inner rounded disabled:bg-gray-300 max-w-lg"
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
  }
);
