import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { FormGroup, Input, Select, Label } from "components/forms";
import { officerRoles } from "utils/roles";
import useOfficer from "data/api/useOfficer";

export default function OfficerForm({ officerId, onSuccess, isReadOnly }) {
  const { officer, isLoading } = useOfficer(officerId);
  const defaultValues = officer || { isActive: true };

  return (
    <>
      {officerId && isLoading ? (
        <div className="grid grid-cols-3 gap-2 p-10">
          <div className="col-span-2 bg-gray-300 p-4 rounded animate-pulse"></div>
          <div className="col-span-3 bg-gray-100 p-5 mb-2 rouned animate-pulse"></div>
          <div className="col-span-2 bg-gray-300 p-4 rounded animate-pulse"></div>
          <div className="col-span-3 bg-gray-100 p-5 mb-2 rouned animate-pulse"></div>
          <div className="col-span-2 bg-gray-300 p-4 rounded animage-pulse"></div>
          <div className="col-span-1 bg-gray-100 p-5 rounded animate-pulse"></div>
        </div>
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
      <FormGroup inline={true}>
        <Label className="mr-2" htmlFor="isActive">
          Active?
        </Label>
        <Input
          name="isActive"
          type="checkbox"
          ref={register()}
          disabled={isReadOnly}
        />
      </FormGroup>
    </form>
  );
}
