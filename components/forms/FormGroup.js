import classNames from "classnames";

export default function FormGroup({ children, className, inline = false }) {
  return (
    <div
      className={classNames(
        className,
        {
          "flex-col": !inline,
          "flex-row": inline,
        },
        "flex"
      )}
    >
      {children}
    </div>
  );
}