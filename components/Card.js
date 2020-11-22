import classNames from "classnames";

function Card({ children, className }) {
  return (
    <div
      className={classNames(className, "text-left border rounded-xl shadow-lg")}
    >
      {children}
    </div>
  );
}

function Header({ className, children }) {
  return (
    <div className="bg-gray-100 rounded-t-xl shadow">
      <h3 className={classNames(className, "px-6 pt-6 pb-2 text-2xl")}>
        {children}
      </h3>
    </div>
  );
}

function Footer({ className, children }) {
  return (
    <div className={classNames(className, "bg-gray-100 rounded-b-xl shadow")}>
      {children}
    </div>
  );
}

Card.Header = Header;
Card.Footer = Footer;
export default Card;
