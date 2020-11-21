import { Button, Card } from "components";

export default function OfficersTable({ officers, onEdit, isReadOnly }) {
  return (
    <table className="bg-white">
      <thead>
        <tr>
          <th className="bg-green-100 border text-left px-8 py-4 rounded">
            Email
          </th>
          <th className="bg-green-100 border text-left px-8 py-4">Role</th>
          <th className="bg-green-100 border text-left px-8 py-4"></th>
        </tr>
      </thead>
      <tbody>
        {officers.map((officer) => (
          <tr key={`${officer.email}-${officer.role}`}>
            <td className="border px-8 py-4">{officer.email}</td>
            <td className="border px-8 py-4">{officer.role}</td>
            <td className="border px-8 py-4">
              <Button
                className="rounded-full"
                onClick={() => onEdit(officer)}
                color="green"
                disabled={isReadOnly}
              >
                <i className="fas fa-edit"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
