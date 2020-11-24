import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { FormGroup, Input, Select, Label } from "components/forms";
import { officerRoles } from "utils/roles";
import useOfficer from "data/api/useOfficer";
import { SkeletonForm } from "components/forms";

export default function OfficerForm({ officerId, onSuccess, isReadOnly }) {
  const { officer, isLoading, isValidating } = useOfficer({ officerId });
  const defaultValues = officer || { isActive: true };

  return (
    <>
      {officerId && (isLoading || isValidating) ? (
        <SkeletonForm>
          <SkeletonForm.FormGroup />
          <SkeletonForm.FormGroup />
          <SkeletonForm.FormGroup type="checkbox" />
        </SkeletonForm>
      ) : (
        <Form
          defaultValues={defaultValues}
          onSuccess={onSuccess}
          isReadOnly={isReadOnly}
        />
      )}
    </>
  );
}

function Form({ defaultValues, onSuccess, isReadOnly }) {
  const { register, handleSubmit, errors } = useForm({ defaultValues });
  async function onSubmit(data) {
    if (!data._id) {
      //create
      await axios.post("api/officers", data);
      onSuccess();
    } else {
      try {
        await axios.put(`api/officers/${data._id}`, data);
        onSuccess();
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <form id="officer-form" className="p-10" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input type="hidden" name="_id" ref={register()}></input>
      <FormGroup className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          name="email"
          type="email"
          disabled={isReadOnly}
          ref={register({ required: true })}
        />
      </FormGroup>
      <FormGroup className="mb-4">
        <Label htmlFor="role">Role</Label>
        <Select
          name="role"
          disabled={isReadOnly}
          ref={register({ required: true })}
          options={officerRoles}
        />
      </FormGroup>
      <FormGroup inline={true} className="items-center">
        <Label className="mr-2" htmlFor="isActive">
          Active?
        </Label>
        <Input
          className="mb-2"
          name="isActive"
          type="checkbox"
          ref={register()}
          disabled={isReadOnly}
        />
      </FormGroup>
    </form>
  );
}
