import { FormGroup, Input, Label } from "components/forms";

function MemberForm({ memberId }) {
  //TODO: conditionally render form and loading skeleton
  //Look into some way to make the loading skeleton componentized?
  //IDEA - maybe have a loading state built in to each form component (might not work with the way default values are handled)
  return <Form />;
}

function Form({ defaultValues }) {
  return (
    <form className="p-10">
      <FormGroup className="mb-4">
        <Label>W#</Label>
        <Input type="text" />
      </FormGroup>
      <FormGroup inline={true}>
        <FormGroup className="w-full mr-2">
          <Label>First Name</Label>
          <Input type="text" />
        </FormGroup>
        <FormGroup className="w-full ml-2">
          <Label>Last Name</Label>
          <Input type="text" />
        </FormGroup>
      </FormGroup>
    </form>
  );
}

export default MemberForm;
