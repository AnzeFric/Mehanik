import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

interface Props {
  onEditPress: () => void;
  onDeleteClose: () => void;
}

export default function EditMenu({ onEditPress, onDeleteClose }: Props) {
  const { staticColors } = useAnimatedTheme();

  return (
    <ThemedView type={"secondary"} style={styles.menuContainer}>
      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          styles.menuLine,
          { borderColor: staticColors.border },
        ]}
        onPress={onEditPress}
      >
        <Ionicons name="create" size={18} color={staticColors.blueIcon} />
        <ThemedText type={"small"} bold style={styles.menuItem}>
          UREDI
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItemContainer}
        onPress={onDeleteClose}
      >
        <Ionicons
          name="trash-outline"
          size={18}
          color={staticColors.iconDestroy}
        />
        <ThemedText type={"small"} bold style={styles.menuItem}>
          IZBRIŠI
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    right: 20,
    top: -10,
    width: 180,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 5,
    padding: 6,
    overflow: "hidden",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuLine: {
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  menuItem: {
    marginLeft: 12,
  },
});
