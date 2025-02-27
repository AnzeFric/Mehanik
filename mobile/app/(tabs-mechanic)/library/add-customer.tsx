import { router } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import CustomerForm from "@/components/mechanic/library/customer-form/CustomerForm";

export default function AddCustomerScreen() {
  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library`);
  };

  return (
    <TemplateView
      title={"Dodaj stranko"}
      buttonText={"Dodaj"}
      onButtonPress={handlePress}
    >
      <CustomerForm />
    </TemplateView>
  );
}
