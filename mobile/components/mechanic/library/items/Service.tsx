import { View, Text } from "react-native";
import { ServiceData } from "@/app/(tabs-mechanic)/library";

interface Props {
  serviceData: ServiceData;
}

export default function Customer({ serviceData }: Props) {
  return (
    <View>
      <Text>{serviceData.image}</Text>
      <Text>{serviceData.name}</Text>
      <Text>{serviceData.vehicle}</Text>
      <Text>{serviceData.vin}</Text>
    </View>
  );
}
