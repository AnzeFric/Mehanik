import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import UserForm from "@/components/mechanic/library/customer-form/components/forms/UserForm";
import { useForm } from "react-hook-form";
import { CustomerFormData } from "@/interfaces/customer";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    formState: { errors },
  } = useForm<CustomerFormData>({
    defaultValues: {
      customer: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
      },
    },
  });

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handlePress}
    >
      <View style={styles.container}>
        <UserForm control={control} errors={errors} />
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
});
