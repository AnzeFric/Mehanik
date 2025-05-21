import { TouchableHighlight, StyleSheet } from "react-native";
import PlusIcon from "@/assets/icons/PlusIcon.svg";
import { Colors } from "@/constants/Colors";

interface Props {
  onPress: () => void;
}

export default function PlusButton({ onPress }: Props) {
  return (
    <TouchableHighlight
      style={styles.fixedAddButton}
      underlayColor={Colors.light.specialBlueClick}
      onPress={onPress}
    >
      <PlusIcon height={35} width={35} color={Colors.light.background} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  fixedAddButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3.5,
    shadowColor: Colors.light.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
