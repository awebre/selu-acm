import { useReducer } from "react";
import classNames from "classnames";
import { Button, Card } from "components";
import MemberSearch from "./MemberSearch";
import MemberForm from "./MemberForm";

const actions = {
  SEARCH: "SEARCH",
  ADD_MEMBER: "ADD_MEMBER",
  EDIT_MEMBER: "EDIT_MEMBER",
  CANCEL: "CANCEL",
};

function reducer(state, action) {
  switch (action.type) {
    case actions.SEARCH:
      return { ...state, search: action.search, addOrEdit: false };
    case actions.ADD_MEMBER:
      return {
        ...state,
        memberId: "",
        wNumber: action.wNumber,
        addOrEdit: true,
      };
    case actions.EDIT_MEMBER:
      return { ...state, memberId: action.memberId, addOrEdit: true };
    case actions.CANCEL:
      return { memberId: "", addOrEdit: false };
    default:
      throw Error(`${action.type} does not match any action.`);
  }
}

export default function MemberCrudCard({ isVisible }) {
  const [{ search, memberId, wNumber, addOrEdit }, dispatch] = useReducer(
    reducer,
    {
      addOrEdit: false,
    }
  );

  return (
    <Card className={classNames({ hidden: !isVisible }, "w-9/12")}>
      <Card.Header>
        {addOrEdit
          ? `${!memberId ? "Add" : "Edit"} Membership`
          : "Find a Member"}
      </Card.Header>
      {!addOrEdit && (
        <MemberSearch
          search={search}
          onSearch={(s) => dispatch({ type: actions.SEARCH, search: s })}
          onEdit={(id) => dispatch({ type: actions.EDIT_MEMBER, memberId: id })}
          onAdd={(wNumber) =>
            dispatch({ type: actions.ADD_MEMBER, wNumber: wNumber })
          }
        />
      )}
      {addOrEdit && (
        <MemberForm
          memberId={memberId}
          wNumber={wNumber}
          onSuccess={() => dispatch({ type: actions.CANCEL })}
        />
      )}
      <Card.Footer className="p-4 flex flex-row-reverse">
        <Button
          form="member-form"
          className="rounded"
          type="submit"
          className={classNames({ hidden: !addOrEdit })}
        >
          Save Member
        </Button>
        <Button
          className={classNames({ hidden: !addOrEdit })}
          color="gray"
          onClick={() => dispatch({ type: actions.CANCEL })}
        >
          Cancel
        </Button>
      </Card.Footer>
    </Card>
  );
}
