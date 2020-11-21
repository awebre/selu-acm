import { useReducer } from "react";
import { Button, Card } from "components";
import OfficersTable from "./OfficersTable";

const actions = {
  ADD_NEW_OFFICER: "ADD_NEW_OFFICER",
  BEGIN_EDIT_OFFICER: "BEGIN_EDIT_OFFICER",
  CANCEL: "CANCEL",
};

const modes = {
  create: "create",
  read: "read",
  update: "update",
  delete: "delete",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.ADD_NEW_OFFICER:
      return { ...state, officer: {}, mode: modes.create };
    case actions.EDIT_OFFICER:
      return { ...state, officer: action.officer, mode: modes.update };
    case actions.CANCEL:
      return { mode: modes.read };
    default:
      throw Error(`${action.type} does not match any action.`);
  }
}

export default function OfficerCrudCard({ officers, isReadOnly }) {
  const [{ mode, officer }, dispatch] = useReducer(reducer, {
    mode: modes.read,
  });
  return (
    <Card>
      <Card.Header>Officers</Card.Header>
      {mode === modes.read && (
        <OfficersTable
          officers={officers}
          onEdit={beginEdit}
          isReadOnly={isReadOnly}
        />
      )}
      {(mode === modes.update || mode === modes.create) && <form></form>}
      <Card.Footer className="p-4 flex flex-row-reverse">
        {mode === modes.read && (
          <Button className="rounded" dispabled={isReadOnly}>
            Add Officer
          </Button>
        )}
        {(mode === modes.update || mode === modes.create) && (
          <>
            <Button
              className="rounded"
              color="gray"
              onClick={() => dispatch({ type: actions.CANCEL })}
            >
              Cancel
            </Button>
            <Button className="rounded" disabled={isReadOnly}>
              Save Officer
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  );

  function beginEdit(officer) {
    dispatch({ type: actions.EDIT_OFFICER, officer });
  }
}
