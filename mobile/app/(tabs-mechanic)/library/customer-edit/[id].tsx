import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import UserForm from "@/components/mechanic/library/customer-form/components/forms/UserForm";
import { useForm } from "react-hook-form";
import { ServiceFormData } from "@/components/mechanic/library/customer-form/CustomerForm";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams();
  const {
    control,
    formState: { errors },
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
      <UserForm control={control} errors={errors} />
    </TemplateView>
  );
}
