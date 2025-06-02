import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import ServiceForm from "@/components/mechanic/library/customer-form/components/forms/ServiceForm";
import { useForm } from "react-hook-form";
import { CustomerFormData } from "@/interfaces/customer";

export default function AddServiceScreen() {
  const { id } = useLocalSearchParams();
  const { control, watch } = useForm<CustomerFormData>({
    defaultValues: {
      repair: {
        type: "small",
        price: null,
        date: new Date(),
        options: {
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
        description: null,
        images: null,
        note: null,
      },
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
        <ServiceForm control={control} watch={watch} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
