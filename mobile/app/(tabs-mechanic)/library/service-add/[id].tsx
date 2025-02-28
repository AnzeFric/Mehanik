import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ServiceForm from "@/components/mechanic/library/customer-form/components/forms/ServiceForm";
import { useForm } from "react-hook-form";
import { ServiceFormData } from "@/interfaces/mechanic";

export default function AddServiceScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<ServiceFormData>({
    defaultValues: {
      // Service info
      serviceType: "small",
      serviceItems: {
        oilChange: false,
        filterChange: false,
        brakeCheck: false,
        tireRotation: false,
        fluidCheck: false,
        batteryCheck: false,
        sparkPlugs: false,
        airFilter: false,
        cabinFilter: false,
        suspension: false,
        timing: false,
        coolant: false,
      },
      serviceNotes: "",
      serviceImages: [],
      servicePrice: "",

      // Custom service (type is "other")
      customServiceDescription: "",
    },
  });

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Dodaj servis"}
      buttonText={"Dodaj"}
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
