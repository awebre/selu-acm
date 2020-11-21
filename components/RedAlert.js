import Alert from "./Alert";

export default function RedAlert({ children, ...props }) {
  return (
    <Alert color="red" className="max-w-xl" {...props}>
      <>
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" /> <b>Oh no!</b>
        </span>
        <span className="inline-block align-middle mr-8">{children}</span>
      </>
    </Alert>
  );
}
