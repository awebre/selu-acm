import useMemberSearch from "data/api/useMemberSearch";
import { FormGroup, Label, Input } from "components/forms";

export default function MemberSearch({ search, onSearch, onEdit, onAdd }) {
  const { results, isLoading } = useMemberSearch(search);
  const skeletons = Array(3).fill(); //HACK: used to create three identical skeleton results while loading
  return (
    <div className="p-10">
      <FormGroup
        label="Find Member (By W#)"
        inputType="text"
        onChange={(e) => onSearch(e.target.value)}
      />
      {search && (results || isLoading) && (
        <ul className="border rounded max-w-lg shadow">
          {!isLoading ? (
            <>
              {results.map((r) => (
                <li
                  key={r._id}
                  className="p-4 group hover:bg-gray-100 cursor-pointer flex justify-between"
                  onClick={() => onEdit(r._id)}
                >
                  <div>
                    <div className="font-bold group-hover:underline">
                      {r.wNumber}
                    </div>
                    <div>
                      {r.firstName} {r.lastName}
                    </div>
                  </div>
                  <div>
                    {r.hasActiveMembership ? (
                      <i className="fas fa-check text-green-500"></i>
                    ) : (
                      <i className="fas fa-clock text-yellow-300"></i>
                    )}
                  </div>
                </li>
              ))}
              {results.length === 0 && (
                <li
                  className="p-4 group hover:bg-gray-100 cursor-pointer"
                  onClick={() => onAdd(search)}
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
            </>
          ) : (
            <>
              {skeletons.map((val, i) => (
                <li key={i} className="flex justify-between p-4">
                  <div className="grid grid-cols-4 gap-2 w-72">
                    <div className="col-span-2 bg-gray-300 p-4 rounded animate-pulse"></div>
                    <div className="col-span-3 bg-gray-200 p-4 mb-2 rounded animate-pulse"></div>
                  </div>
                  <div className="bg-gray-200 w-5 h-5 rounded animate pulse"></div>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
