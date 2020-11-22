import classNames from "classnames";

export default React.forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      className={classNames(
        className,
        "border py-2 px-3 text-grey-darkest shadow-inner rounded disabled:bg-gray-300"
      )}
      ref={ref}
      {...rest}
    />
  );
});
