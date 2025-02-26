import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";

export default function AddServiceScreen() {
  const { id } = useLocalSearchParams();

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Dodaj servis"}
      buttonText={"Dodaj"}
      onButtonPress={handlePress}
    >
      <Text>Tukaj bo komponenta oz. vmesnik za dodajanje novega servisa</Text>
    </TemplateView>
  );
}
