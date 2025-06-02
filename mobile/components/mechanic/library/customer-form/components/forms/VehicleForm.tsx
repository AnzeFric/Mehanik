import { StyleSheet } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import CustomController from "../CustomController";
import { CustomerFormData } from "@/interfaces/customer";

type CustomerInfoProps = {
  control: Control<CustomerFormData>;
  errors: FieldErrors<CustomerFormData>;
};

export default function UserForm({ control, errors }: CustomerInfoProps) {
  return (
    <>
      <CustomController
        control={control}
        error={errors.vehicle?.brand}
        placeholder={"Znamka"}
        optional={false}
        name={"vehicle.brand"}
      />
      <CustomController
        control={control}
        error={errors.vehicle?.model}
        placeholder={"Model"}
        optional={false}
        name={"vehicle.model"}
      />
      <CustomController
        control={control}
        placeholder={"Leto izdelave"}
        optional={true}
        name={"vehicle.buildYear"}
        keyboardType={"numeric"}
      />
      <CustomController
        control={control}
        placeholder={"VIN)"}
        optional={true}
        name={"vehicle.vin"}
        autoCapitalize={"characters"}
      />
      <CustomController
        control={control}
        placeholder={"Dodaten opis vozila (ni obvezno)"}
        optional={true}
        name={"vehicle.description"}
        textStyle={[styles.textArea, { textAlignVertical: "bottom" }]}
        multiline={true}
        numberOfLines={3}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textArea: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 8,
  },
});
