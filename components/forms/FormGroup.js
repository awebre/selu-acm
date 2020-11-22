import classNames from "classnames";

export default function FormGroup({ children, className, inline = false }) {
  return (
    <div
      className={classNames(className, "mb-4", {
        "flex flex-col": !inline,
      })}
    >
      {children}
    </div>
  );
}
