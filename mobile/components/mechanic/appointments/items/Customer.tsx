import { View, Text } from "react-native";
import { CustomerData } from "@/app/(tabs-mechanic)/appointments";

interface Props {
  customerData: CustomerData;
}

export default function Customer({ customerData }: Props) {
  return (
    <View>
      <Text>{customerData.name}</Text>
      <Text>{customerData.vehicle}</Text>
      <Text>{customerData.day.toDateString()}</Text>
    </View>
  );
}
