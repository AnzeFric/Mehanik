import { StyleSheet } from "react-native";
import { Control, FieldErrors } from "react-hook-form";
import { ServiceFormData } from "@/interfaces/mechanic";
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
        error={errors.carBrand}
        placeholder={"Znamka"}
        optional={false}
        name={"carBrand"}
      />
      <CustomController
        control={control}
        error={errors.carModel}
        placeholder={"Model"}
        optional={false}
        name={"carModel"}
      />
      <CustomController
        control={control}
        placeholder={"Leto izdelave (ni obvezno)"}
        optional={true}
        name={"carYear"}
        keyboardType={"numeric"}
      />
      <CustomController
        control={control}
        placeholder={"VIN (ni obvezno)"}
        optional={true}
        name={"vin"}
        autoCapitalize={"characters"}
      />
      <CustomController
        control={control}
        placeholder={"Dodaten opis vozila (ni obvezno)"}
        optional={true}
        name={"carDescription"}
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
