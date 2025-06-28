import { View, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { formatDate, formatRepairType, formatCurrency } from "@/constants/util";
import { RepairData } from "@/interfaces/repair";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  repairData: RepairData;
  vehicleId: number;
}

export default function Repair({ repairData, vehicleId }: Props) {
  const { staticColors } = useAnimatedTheme();

  const handleRedirect = () => {
    router.push(`/repair/${vehicleId}`);
  };

  return (
    <ThemedView type={"secondary"} style={{ borderRadius: 4 }}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleRedirect}
      >
        <View
          style={[
            styles.contentContainer,
            { borderColor: staticColors.border },
          ]}
        >
          <View style={styles.header}>
            <ThemedText type={"small"} bold>
              {formatRepairType(repairData.type)}
            </ThemedText>
            <ThemedText type={"small"} bold>
              {formatCurrency(repairData.price || 0)}
            </ThemedText>
          </View>

          <View style={styles.dateContainer}>
            <ThemedIcon name={"calendar-outline"} size={16} />
            <ThemedText type={"extraSmall"} bold>
              {formatDate(new Date(repairData.date))}
            </ThemedText>
          </View>

          {repairData.type === "other" && (
            <ThemedView type={"secondary"} style={styles.descriptionContainer}>
              <ThemedText type={"small"}>{repairData.description}</ThemedText>
            </ThemedView>
          )}
        </View>

        <ThemedIcon
          name={"chevron-forward"}
          size={20}
          style={{ paddingLeft: 6 }}
        />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: "dashed",
    paddingRight: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  descriptionContainer: {
    borderRadius: 3,
    padding: 10,
    marginTop: 6,
  },
});
