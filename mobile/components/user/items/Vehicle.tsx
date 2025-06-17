import { VehicleData } from "@/interfaces/vehicle";
import { View, Text } from "react-native";

interface Props {
  vehicle: VehicleData;
}

export function Vehicle({ vehicle }: Props) {
  return (
    <View>
      <Text>Vehicle</Text>
    </View>
  );
}
