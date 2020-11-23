import { useReducer } from "react";
import { Card } from "components";
import MemberSearch from "./MemberSearch";

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
      return { ...state, memberId: "", addOrEdit: true };
    case actions.EDIT_MEMBER:
      return { ...state, memberId: action.memberId, addOrEdit: true };
    case actions.CANCEL:
      return { memberId: "", addOrEdit: false };
    default:
      throw Error(`${action.type} does not match any action.`);
  }
}

export default function MemberCrudCard() {
  const [{ search, memberId, addOrEdit }, dispatch] = useReducer(reducer, {
    isAddOrUpdate: false,
  });

  return (
    <Card className="w-9/12">
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
          onAdd={() => dispatch({ type: actions.ADD_MEMBER })}
        />
      )}
      <Card.Footer className="h-16"></Card.Footer>
    </Card>
  );
}
