import { Text, View } from "react-native";
import { router } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";

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
      <Text>Tukaj bo komponenta oz. vmesnik za dodajanje nove stranke</Text>
    </TemplateView>
  );
}
