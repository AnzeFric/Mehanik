import { StyleSheet, TouchableOpacity } from "react-native";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import { Colors } from "@/constants/Colors";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

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
      <PlusIcon height={35} width={35} color={Colors.light.background} />
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
