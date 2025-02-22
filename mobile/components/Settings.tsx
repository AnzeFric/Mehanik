import { View, Text } from "react-native";

interface Props {
  isMechanic: boolean;
}

export default function Settings({ isMechanic }: Props) {
  return (
    <View>
      <Text>{isMechanic ? "Mehcanic" : "User"} settings screen</Text>
    </View>
  );
}
