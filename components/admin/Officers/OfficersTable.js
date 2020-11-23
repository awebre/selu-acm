import { Button, Alert, RedAlert } from "components";
import useOfficers from "data/api/useOfficers";

export default function OfficersTable({ onEdit, isReadOnly }) {
  const { officers, isLoading, hasError, mutate, isValidating } = useOfficers();
  return (
    <>
      {isValidating && !isLoading && (
        <Alert rounded={false}>
          <span className="animate-pulse">Updating Officers...</span>
        </Alert>
      )}
      {hasError && (
        <RedAlert rounded={false}>
          <span>An error occured while loading the Officers.</span>
        </RedAlert>
      )}
      {isLoading && (
        <Alert rounded={false}>
          <span className="animate-pulse">Loading Officers...</span>
        </Alert>
      )}
      <table className="bg-white w-full">
        <thead>
          <tr>
            <th className="bg-green-100 border text-left px-8 py-4 rounded">
              Email
            </th>
            <th className="bg-green-100 border text-left px-8 py-4">Role</th>
            <th className="bg-green-100 border text-left px-8 py-4 flex flex-1 justify-end items-end">
              <Button
                color="gray"
                className="rounded-full"
                onClick={() => mutate()}
                disabled={isLoading || isValidating}
              >
                <i className="fas fa-sync hover:animate-spin"></i>
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {officers?.map((officer) => (
            <tr key={officer._id}>
              <td className="border px-8 py-4">{officer.email}</td>
              <td className="border px-8 py-4">{officer.role}</td>
              <td className="border px-8 py-4 flex flex-1 justify-end items-end">
                <Button
                  className="rounded-full"
                  onClick={() => onEdit(officer._id)}
                  color="green"
                >
                  <i className={`fas ${isReadOnly ? "fa-eye" : "fa-edit"}`}></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
