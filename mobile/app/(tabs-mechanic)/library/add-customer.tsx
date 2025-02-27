import { router } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";
import CustomerUI from "@/components/mechanic/library/CustomerUI";

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
      <CustomerUI />
    </TemplateView>
  );
}
