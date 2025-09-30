import { StyleSheet, TouchableOpacity } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import { useTranslation } from "react-i18next";

interface Props {
  onEditPress: () => void;
  onExportPress: () => void;
}

export default function EditMenu({ onEditPress, onExportPress }: Props) {
  const { staticColors } = useAnimatedTheme();

  const { t } = useTranslation();

  return (
    <ThemedView type={"background"} style={styles.menuContainer}>
      <TouchableOpacity
        style={[
          styles.menuItemContainer,
          styles.menuLine,
          { borderColor: staticColors.border },
        ]}
        onPress={onEditPress}
      >
        <Ionicons
          name={"create-outline"}
          size={18}
          color={staticColors.blueIcon}
        />
        <ThemedText type={"small"} bold style={styles.menuItem}>
          {t("components.mechanic.forms.menuEdit")}
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.menuItemContainer}
        onPress={onExportPress}
      >
        <Ionicons
          name={"download-outline"}
          size={18}
          color={staticColors.iconDestroy}
        />
        <ThemedText type={"small"} bold style={styles.menuItem}>
          {t("components.mechanic.forms.menuExport")}
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    right: 0,
    top: -15,
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
