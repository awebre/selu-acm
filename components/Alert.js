import classNames from "classnames";

export default function Alert({
  color = "blue",
  light = false,
  className,
  onClose,
  children,
}) {
  const textColor = light ? "text-gray-600" : "text-white";
  const bgWeight = light ? 300 : 600;
  return (
    <div
      role="alert"
      className={classNames(
        className,
        `${textColor} px-6 py-4 border-0 rounded relative bg-${color}-${bgWeight} shadow-lg`
      )}
    >
      <span className="inline-block mr-5">{children}</span>
      {onClose && (
        <button
          className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none hover:text-gray-200"
          onClick={onClose}
        >
          <span>×</span>
        </button>
      )}
    </div>
  );
}
