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
  console.log(errors);
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
      <FormGroup
        className="mb-4"
        name="wNumber"
        label="W Number"
        errors={errors}
        inputType="text"
        ref={register({
          required: true,
          pattern: {
            value: /[W][0-9]+$/,
            message:
              "WNumber should start with a W and otherwise contain only numbers.",
          },
        })}
      />
      <div className="mb-4 flex flex-row items-between">
        <FormGroup
          className="w-full mr-2"
          inputType="text"
          name="firstName"
          ref={register({ required: true })}
          label="First Name"
          errors={errors}
        />
        <FormGroup
          className="w-full ml-2"
          inputType="text"
          name="lastName"
          ref={register({ required: true })}
          label="Last Name"
          errors={errors}
        />
      </div>
      <FormGroup
        className="mb-4"
        inputType="text"
        name="nationalAcmNumber"
        label="National ACM Membership #"
        ref={register}
        errors={errors}
        helpText={
          "Only required if you are the member of the National ACM Chapter."
        }
      />
      {!defaultValues.hasActiveMembership && (
        <>
          <div className="mb-2 flex flex-row">
            <FormGroup
              inline={true}
              inputType="checkbox"
              name="licenseAgreement"
              ref={register}
              label="License Agreement"
            ></FormGroup>
          </div>
          <p className="text-xs">
            I allow Southeastern Louisiana University ACM Student Chapter to
            access the information I provided in this form, as well as my
            Southeastern Louisiana University email address, my academic majors
            and minors, my degree and classification.
          </p>
          {watchLicenseAgreement && (
            <FormGroup
              label="Membership Start Date"
              inputType="date"
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
