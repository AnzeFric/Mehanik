import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ServiceForm from "@/components/mechanic/library/customer-form/components/forms/ServiceForm";
import { useForm } from "react-hook-form";
import { ServiceFormData } from "@/components/mechanic/library/customer-form/CustomerForm";

export default function EditServiceScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<ServiceFormData>({
    defaultValues: {
      imageUri: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      email: "",
    },
  });
  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Uredi servis"}
      buttonText={"Potrdi"}
      onButtonPress={handlePress}
    >
      <View style={styles.container}>
        <ServiceForm control={control} errors={errors} watch={watch} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
