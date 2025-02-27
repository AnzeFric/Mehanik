import { Control, FieldErrors } from "react-hook-form";
import { ServiceFormData } from "../../CustomerForm";
import CustomController from "../CustomController";

type CustomerInfoProps = {
  control: Control<ServiceFormData>;
  errors: FieldErrors<ServiceFormData>;
};

export default function UserForm({ control, errors }: CustomerInfoProps) {
  return (
    <>
      <CustomController
        control={control}
        error={errors.firstName}
        placeholder={"Ime"}
        optional={false}
        name={"firstName"}
      />
      <CustomController
        control={control}
        error={errors.lastName}
        placeholder={"Priimek"}
        optional={false}
        name={"lastName"}
      />
      <CustomController
        control={control}
        placeholder={"Naslov (ni obvezno)"}
        optional={true}
        name={"address"}
      />
      <CustomController
        control={control}
        placeholder={"Telefonska št. (ni obvezno)"}
        optional={true}
        name={"phoneNumber"}
        keyboardType={"phone-pad"}
      />
      <CustomController
        control={control}
        placeholder={"Email  (ni obvezno)"}
        optional={true}
        name={"email"}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
      />
    </>
  );
}
