import { Control, FieldErrors } from "react-hook-form";
import CustomController from "../CustomController";
import { CustomerData, CustomerFormData } from "@/interfaces/customer";

type CustomerInfoProps = {
  control: Control<CustomerFormData>;
  errors: FieldErrors<CustomerFormData>;
};

export default function UserForm({ control, errors }: CustomerInfoProps) {
  return (
    <>
      <CustomController
        control={control}
        error={errors.customer?.firstName}
        placeholder={"Ime"}
        optional={false}
        name={"customer.firstName"}
      />
      <CustomController
        control={control}
        error={errors.customer?.lastName}
        placeholder={"Priimek"}
        optional={false}
        name={"customer.lastName"}
      />
      <CustomController
        control={control}
        placeholder={"Telefonska št. (ni obvezno)"}
        optional={true}
        name={"customer.phone"}
        keyboardType={"phone-pad"}
      />
      <CustomController
        control={control}
        placeholder={"Email  (ni obvezno)"}
        optional={true}
        name={"customer.email"}
        keyboardType={"email-address"}
        autoCapitalize={"none"}
      />
    </>
  );
}
