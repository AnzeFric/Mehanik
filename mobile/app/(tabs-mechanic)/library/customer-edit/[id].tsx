import { View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import UserForm from "@/components/mechanic/library/customer-form/components/forms/UserForm";
import ImageForm from "@/components/mechanic/library/customer-form/components/forms/ImageForm";
import { useForm } from "react-hook-form";
import { ServiceFormData } from "@/interfaces/mechanic";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    formState: { errors },
    setValue,
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
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handlePress}
    >
      <View style={styles.container}>
        <ImageForm control={control} setValue={setValue} />
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
