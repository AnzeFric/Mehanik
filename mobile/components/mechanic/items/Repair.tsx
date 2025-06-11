import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { formatDate, formatRepairType, formatCurrency } from "@/constants/util";
import { Ionicons } from "@expo/vector-icons";
import { useRepair } from "@/hooks/useRepair";
import { RepairData } from "@/interfaces/repair";
import ThemedView from "@/components/global/themed/ThemedView";

interface Props {
  repairData: RepairData;
  vehicleUuid: string;
}

export default function Repair({ repairData, vehicleUuid }: Props) {
  const { setCurrentRepairFocus } = useRepair();

  const handleRedirect = () => {
    setCurrentRepairFocus(repairData);
    router.push(`/(tabs-mechanic)/library/repair/${vehicleUuid}`);
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleRedirect}
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <View style={styles.repairTypeBadge}>
              <Text style={styles.repairTypeText}>
                {formatRepairType(repairData.type)}
              </Text>
            </View>
            <Text style={styles.priceText}>
              {formatCurrency(repairData.price || 0)}
            </Text>
          </View>

          <View style={styles.dateContainer}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={Colors.light.secondaryText}
            />
            <Text style={styles.dateText}>
              {formatDate(new Date(repairData.date))}
            </Text>
          </View>

          {repairData.type === "other" && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                {repairData.description}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.arrowContainer}>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Colors.light.secondaryText}
          />
        </View>
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
    borderWidth: 0.2,
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
  repairTypeBadge: {
    paddingVertical: 4,
  },
  repairTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.light.secondaryText,
  },
  descriptionContainer: {
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    padding: 10,
    marginTop: 6,
  },
  descriptionText: {
    fontSize: 15,
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});
