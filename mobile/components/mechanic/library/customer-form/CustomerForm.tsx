import { Text, StyleSheet, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import UserForm from "./components/forms/UserForm";
import VehicleForm from "./components/forms/VehicleForm";
import ServiceForm from "./components/forms/ServiceForm";
import { AppStyles } from "@/constants/Styles";
import ImageForm from "./components/forms/ImageForm";
import { CustomerFormData } from "@/interfaces/customer";

export default function CustomerForm() {
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CustomerFormData>({
    defaultValues: {
      customer: {
        email: "",
        firstName: "",
        lastName: "",
        phone: null,
      },
      vehicle: {
        brand: "",
        model: "",
        buildYear: 0,
        vin: "",
        image: null,
        description: null,
      },
      repair: null,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <ImageForm control={control} setValue={setValue} />
      <Text style={styles.sectionTitle}>Informacije o stranki</Text>
      <UserForm control={control} errors={errors} />
      <Text style={styles.sectionTitle}>Informacije o vozilu</Text>
      <VehicleForm control={control} errors={errors} />
      <Text style={styles.sectionTitle}>Informacije o servisu.</Text>
      <Text style={AppStyles.text}>
        Če servis ni bil izveden izberite "Drugo" in pustite prazno.
      </Text>
      <ServiceForm control={control} watch={watch} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
});
