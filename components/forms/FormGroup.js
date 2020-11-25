import classNames from "classnames";
import { Input, Select } from ".";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

export default React.forwardRef(
  (
    {
      label,
      children,
      className,
      name,
      errors = {},
      inline = false,
      helpText,
      inputType,
      ...props
    },
    ref
  ) => {
    const { type: errorType, message } = errors[name] || {};
    return (
      <div
        className={classNames(
          className,
          { "items-center": inline },
          {
            "flex-col": !inline,
            "flex-row": inline,
          },
          "flex"
        )}
      >
        {label && (
          <Label
            htmlFor={name}
            inline={inline}
            className={classNames({ "mr-2": inline })}
          >
            {label}
          </Label>
        )}
        {inputType !== "select" ? (
          <Input
            type={inputType}
            name={name}
            ref={ref}
            hasError={!!errorType}
            {...props}
          />
        ) : (
          <Select name={name} ref={ref} hasError={!!errorType} {...props} />
        )}

        {children}
        {helpText && <span className="text-xs">{helpText}</span>}
        {errorType && (
          <ErrorMessage label={label} type={errorType} message={message} />
        )}
      </div>
    );
  }
);
