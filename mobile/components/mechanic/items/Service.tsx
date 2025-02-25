import { View, Text } from "react-native";

export interface ServiceData {
  name: string;
  image: string;
  vehicle: string;
  vin: string;
}

interface Props {
  serviceData: ServiceData;
}

export default function Service({ serviceData }: Props) {
  return (
    <View>
      <Text>{serviceData.image}</Text>
      <Text>{serviceData.name}</Text>
      <Text>{serviceData.vehicle}</Text>
      <Text>{serviceData.vin}</Text>
    </View>
  );
}
