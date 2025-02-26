import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";

export default function EditCustomerScreen() {
  const { id } = useLocalSearchParams();

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Uredi stranko"}
      buttonText={"Uredi"}
      onButtonPress={handlePress}
    >
      <Text>Tukaj bo komponenta oz. vmesnik za urejanje izbrane stranke</Text>
    </TemplateView>
  );
}
