export default function ErrorMessage({ label, type, message }) {
  if (!!message) {
    return <Error>{message}</Error>;
  }

  switch (type) {
    case "required":
      return <Error>{`${label} is required.`}</Error>;
    case "validate":
      return <Error>{`${label} is not valid.`}</Error>;
  }

  return null;
}

function Error({ children }) {
  return <div className="text-red-700">{children}</div>;
}
