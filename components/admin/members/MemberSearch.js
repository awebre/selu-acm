import useMemberSearch from "data/api/useMemberSearch";
import { FormGroup, Label, Input } from "components/forms";

export default function MemberSearch({ search, onSearch, onEdit, onAdd }) {
  const { results, isLoading } = useMemberSearch(search);
  return (
    <div className="p-10">
      <FormGroup>
        <Label>Find Member (By W#)</Label>
        {/* TODO: validation? */}
        <Input type="text" onChange={(e) => onSearch(e.target.value)} />
      </FormGroup>
      {/* TODO: fancy loading skeleton */}
      {results && !isLoading && (
        <ul className="border rounded">
          {results.map((r) => (
            <li
              key={r._id}
              className="p-4 group hover:bg-gray-100 cursor-pointer"
              onClick={() => onEdit(r._id)}
            >
              <div className="font-bold group-hover:underline">{r.wNumber}</div>
              <div>
                {r.firstName} {r.lastName}
              </div>
            </li>
          ))}
          {results.length === 0 && (
            <li
              className="p-4 group hover:bg-gray-100 cursor-pointer"
              onClick={onAdd}
            >
              <p className="text-xs mb-1">
                Looks like we couldn't find this member.
              </p>
              <p>
                Create a membership for{" "}
                <span className="font-bold">{search?.toUpperCase()}</span>?
              </p>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
