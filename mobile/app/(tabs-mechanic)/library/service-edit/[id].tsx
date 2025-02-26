import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import TemplateView from "@/components/mechanic/library/TemplateView";

export default function EditServiceScreen() {
  const { id } = useLocalSearchParams();

  const handlePress = () => {
    router.push(`/(tabs-mechanic)/library/${id}`);
  };

  return (
    <TemplateView
      title={"Uredi servis"}
      buttonText={"Potrdi"}
      onButtonPress={handlePress}
    >
      <Text>Tukaj bo komponenta oz. vmesnik za urejanje servisa</Text>
    </TemplateView>
  );
}
