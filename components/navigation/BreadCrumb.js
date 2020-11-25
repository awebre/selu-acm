import Link from "components/Link";
import { useRouter } from "next/router";

export default function BreadCrumb() {
  const { pathname } = useRouter();
  const subPaths = pathname.split("/");
  return (
    <nav className="bg-grey-light py-2 px-4 font-sans w-full bg-green-800 shadow">
      <ol className="list-reset flex text-white">
        {pathname === "/" ? (
          <>
            <li>
              <span className="font-bold uppercase text-yellow-300">Home</span>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
          </>
        ) : (
          subPaths.map((p, i) => (
            <li key={i}>
              <BreadCrumbLink key={i} subPath={p} fullPath={pathname} />
              {i !== subPaths.length - 1 && <span className="mx-2">/</span>}
            </li>
          ))
        )}
      </ol>
    </nav>
  );
}

function BreadCrumbLink({ subPath, fullPath, ...props }) {
  const href =
    subPath === ""
      ? "/"
      : fullPath.substring(0, fullPath.indexOf(subPath) + subPath.length);
  return href !== fullPath ? (
    <Link
      href={href}
      color="yellow"
      background="dark"
      className="font-bold uppercase"
      {...props}
    >
      {subPath === "" ? "Home" : subPath}
    </Link>
  ) : (
    <span className="font-bold uppercase text-yellow-300">{subPath}</span>
  );
}
