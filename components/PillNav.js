import classNames from "classnames";

function PillNav({ children, className }) {
  return (
    <ul
      className={classNames(
        className,
        "flex flex-1 p-2 flex-row justify-start items-start m-2"
      )}
    >
      {children}
    </ul>
  );
}

function Pill({ isActive, setActive, children }) {
  return (
    <li className="flex-1 mr-2">
      <div
        className={classNames(
          {
            "border-blue-500 bg-blue-500 hover:bg-blue-700 text-white": isActive,
            "border-white hover:border-gray-200 text-blue-500 hover:bg-gray-200": !isActive,
          },
          "text-center block border rounded py-2 px-4 cursor-pointer"
        )}
        onClick={setActive}
      >
        {children}
      </div>
    </li>
  );
}

PillNav.Pill = Pill;

export default PillNav;
