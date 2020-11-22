import { useReducer } from "react";
import { Button, Card } from "components";
import OfficersTable from "./OfficersTable";
import OfficerForm from "./OfficerForm";

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
      return { ...state, officerId: "", mode: modes.create };
    case actions.BEGIN_EDIT_OFFICER:
      return { ...state, officerId: action.officerId, mode: modes.update };
    case actions.CANCEL:
      return { mode: modes.read };
    default:
      throw Error(`${action.type} does not match any action.`);
  }
}

export default function OfficerCrudCard({ isReadOnly }) {
  const [{ mode, officerId }, dispatch] = useReducer(reducer, {
    mode: modes.read,
  });
  return (
    <Card>
      <Card.Header>{getHeader(mode, isReadOnly)}</Card.Header>
      {mode === modes.read && (
        <OfficersTable onEdit={beginEdit} isReadOnly={isReadOnly} />
      )}
      {(mode === modes.update || mode === modes.create) && (
        <OfficerForm
          officerId={officerId}
          onSuccess={() => dispatch({ type: actions.CANCEL })}
          isReadOnly={isReadOnly}
        />
      )}
      <Card.Footer className="p-4 flex flex-row-reverse">
        {mode === modes.read && (
          <Button
            className="rounded"
            onClick={() => dispatch({ type: actions.ADD_NEW_OFFICER })}
            disabled={isReadOnly}
          >
            Add Officer
          </Button>
        )}
        {(mode === modes.update || mode === modes.create) && (
          <>
            {!isReadOnly && (
              <Button
                form="officer-form"
                className="rounded"
                type="submit"
                disabled={isReadOnly}
              >
                Save Officer
              </Button>
            )}
            <Button
              className="rounded"
              color="gray"
              onClick={() => dispatch({ type: actions.CANCEL })}
            >
              {isReadOnly ? "Done" : "Cancel"}
            </Button>
          </>
        )}
      </Card.Footer>
    </Card>
  );

  function getHeader(mode, isReadOnly) {
    switch (mode) {
      case modes.create:
        return "Add Officer";
      case modes.read:
        return "Officers";
      case modes.update:
        return `${isReadOnly ? "View" : "Add"} Officer`;
      case modes.delete:
        return "Confirm Delete Officer";
    }
  }

  function beginEdit(officerId) {
    dispatch({ type: actions.BEGIN_EDIT_OFFICER, officerId: officerId });
  }
}
