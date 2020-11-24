import axios from "axios";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import classNames from "classnames";
import { FormGroup, Input, Label } from "components/forms";
import { SkeletonForm } from "components/forms";
import useMember from "data/api/useMember";
import Alert from "components/Alert";
import ErrorMessage from "components/forms/ErrorMessage";

function MemberForm({ memberId, wNumber, onSuccess }) {
  //TODO: conditionally render form and loading skeleton
  //Look into some way to make the loading skeleton componentized?
  //IDEA - maybe have a loading state built in to each form component (might not work with the way default values are handled)
  const { member, isLoading, isValidating } = useMember({ memberId });
  const defaultValues = member || {
    wNumber: wNumber,
    hasActiveMembership: false,
  };
  return memberId && (isLoading || isValidating) ? (
    <SkeletonForm>
      <SkeletonForm.FormGroup />
      <SkeletonForm.FormGroup />
      <SkeletonForm.FormGroup />
      <SkeletonForm.FormGroup type="checkbox" />
    </SkeletonForm>
  ) : (
    <Form defaultValues={defaultValues} onSuccess={onSuccess} />
  );
}

function Form({ defaultValues, onSuccess }) {
  const { register, handleSubmit, watch, errors, getValues } = useForm({
    defaultValues,
  });
  async function onSubmit(data) {
    if (!data._id) {
      //create
      await axios.post("api/members", data);
      onSuccess();
    } else {
      try {
        await axios.put(`api/members/${data._id}`, data);
        onSuccess();
      } catch (error) {
        console.log(error);
      }
    }
  }

  const watchLicenseAgreement = watch("licenseAgreement");

  return (
    <form className="p-10" id="member-form" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="_id" ref={register}></input>
      <FormGroup className="mb-4">
        <Label>W#</Label>
        <Input type="text" name="wNumber" ref={register({ required: true })} />
      </FormGroup>
      <FormGroup inline={true} className="mb-4">
        <FormGroup className="w-full mr-2">
          <Label>First Name</Label>
          <Input
            type="text"
            name="firstName"
            ref={register({ required: true })}
          />
        </FormGroup>
        <FormGroup className="w-full ml-2">
          <Label>Last Name</Label>
          <Input
            type="text"
            name="lastName"
            ref={register({ required: true })}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup className="mb-4">
        <Label>National ACM Membership #</Label>
        <Input type="text" name="nationalAcmNumber" ref={register} />
        <span className="text-xs">
          Only required if you are the member of the National ACM Chapter.
        </span>
      </FormGroup>
      {!defaultValues.hasActiveMembership && (
        <>
          <FormGroup>
            <FormGroup inline={true} className="items-center mb-2">
              <Label className="mr-2">License Agreement</Label>
              <Input
                type="checkbox"
                name="licenseAgreement"
                className="mb-2"
                ref={register}
              />
            </FormGroup>
            <span className="mb-2">
              I allow Southeastern Louisiana University ACM Student Chapter to
              access the information I provided in this form, as well as my
              Southeastern Louisiana University email address, my academic
              majors and minors, my degree and classification.
            </span>
          </FormGroup>
          {watchLicenseAgreement && (
            <FormGroup>
              <Label>Membership Start Date</Label>
              <Input
                type="date"
                name="startDate"
                defaultValue={dayjs().format("YYYY-MM-DD")}
                ref={register({
                  validate: (val) => {
                    const { licenseAgreement } = getValues();
                    const isValid = !licenseAgreement || !!val;
                    return (
                      isValid ||
                      "Start Date is required when submiting a new membership."
                    );
                  },
                })}
              />
              {/*TODO: combine label, input, and error message into a single API?*/}
              <ErrorMessage
                name="startDate"
                label="Membership Start Date"
                errors={errors}
              />
            </FormGroup>
          )}
        </>
      )}
      {defaultValues.memberships?.length > 0 && (
        <>
          <div className="font-bold uppercase mt-8">Membership History</div>
          <ul className="border-2 rounded p-4">
            {defaultValues.memberships.map((m, i) => (
              <li
                key={m._id}
                className={classNames(
                  {
                    "border border-l-0 border-r-0 border-t-0":
                      i !== defaultValues.memberships.length - 1,
                  },
                  "px-4 py-2"
                )}
              >
                <span>
                  {m.isActive ? (
                    <span>
                      <i className="text-green-500 fas fa-check mr-2"></i>
                      {`Current Membership is valid until ${dayjs(
                        m.endDate
                      ).format("MM/DD/YYYY")}`}
                    </span>
                  ) : (
                    `${dayjs(m.startDate).format("MM/DD/YYYY")} - ${dayjs(
                      m.endDate
                    ).format("MM/DD/YYYY")}`
                  )}
                </span>
              </li>
            ))}
            {!defaultValues.hasActiveMembership && (
              <li className="px-4 py-2">
                <Alert color="yellow" light={true}>
                  Your most recent membership has expired! Accept the License
                  Agreement above to renew.
                </Alert>
              </li>
            )}
          </ul>
        </>
      )}
    </form>
  );
}

export default MemberForm;
