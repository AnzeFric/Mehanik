import { View, Text } from "react-native";

interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
}

export default function TitleRow({ title, hasBackButton, menuButton }: Props) {
  return (
    <View>
      <Text>Title Row</Text>
    </View>
  );
}
