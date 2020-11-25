import classNames from "classnames";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

function FormGroup({
  label,
  children,
  className,
  name,
  errors = {},
  inline = false,
  helpText,
}) {
  const { type, message } = errors[name] || {};
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
        <Label htmlFor={name} className={classNames({ "mr-2": inline })}>
          {label}
        </Label>
      )}
      {children}
      {helpText && <span className="text-xs">{helpText}</span>}
      {type && <ErrorMessage label={label} type={type} message={message} />}
    </div>
  );
}

export default FormGroup;
