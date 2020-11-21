import classNames from "classnames";
import NextLink from "next/link";

export default function Link({
  className,
  href,
  children,
  color = "blue",
  background = "light",
}) {
  const shade = background == "light" ? 600 : 300;
  return (
    <NextLink href={href}>
      <a
        className={classNames(
          className,
          `transition-colors hover:text-${color}-${shade} hover:border-${color}-${shade}`
        )}
      >
        {children}
      </a>
    </NextLink>
  );
}
