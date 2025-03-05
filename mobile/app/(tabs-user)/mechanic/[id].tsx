import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MechanicScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Oseba {id}</Text>
    </View>
  );
}
