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
  const { register, handleSubmit, errors, watch } = useForm({ defaultValues });
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

  console.log(watch("email"));
  return (
    <form id="officer-form" className="p-10" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input type="hidden" name="_id" ref={register()}></input>
      <FormGroup
        className="mb-4"
        name="email"
        label="Email Address"
        inputType="email"
        disabled={isReadOnly}
        ref={register({ required: true })}
        errors={errors}
      />
      <FormGroup
        className="mb-4"
        name="role"
        label="Role"
        inputType="select"
        errors={errors}
        disabled={isReadOnly}
        ref={register({ required: true })}
        options={officerRoles}
      />
      <FormGroup
        inline={true}
        name="isActive"
        label="Active?"
        errors={errors}
        inputType="checkbox"
        ref={register()}
        disabled={isReadOnly}
      />
    </form>
  );
}
