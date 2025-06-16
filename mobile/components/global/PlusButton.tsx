import { StyleSheet, TouchableOpacity } from "react-native";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onPress: () => void;
}

export default function PlusButton({ onPress }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <TouchableOpacity
      style={[
        styles.fixedAddButton,
        { backgroundColor: staticColors.specialBlue },
      ]}
      onPress={onPress}
    >
      <Ionicons
        name={"add"}
        size={40}
        color={staticColors.iconWithDarkBackground}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fixedAddButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
