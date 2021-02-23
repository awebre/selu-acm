import React from "react";
import classNames from "classnames";

export default React.forwardRef(({ className, hasError, ...rest }, ref) => {
  return (
    <input
      className={classNames(
        className,
        { "border-red-600": hasError },
        "border py-2 px-3 text-grey-darkest shadow-inner rounded disabled:bg-gray-300 max-w-lg"
      )}
      ref={ref}
      {...rest}
    />
  );
});
