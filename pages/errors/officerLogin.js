import { Error } from "components";

export default function OfficerLogin() {
  return (
    <Error
      title="ACM Officer Portal"
      message={
        <>
          Looks like you don't have access to the ACM Officer Portal. Please
          contact your fellow ACM officers if you believe you recieved this
          message in error.
        </>
      }
    />
  );
}
