import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatCurrency,
} from "@/constants/util";
import { Ionicons } from "@expo/vector-icons";
import { useRepair } from "@/hooks/useRepair";
import { RepairData } from "@/interfaces/repair";

interface Props {
  serviceData: RepairData;
  vehicleVin: string;
}

export default function Service({ serviceData, vehicleVin }: Props) {
  const { setCurrentRepairFocus } = useRepair();

  const handleRedirect = () => {
    setCurrentRepairFocus(serviceData);
    router.push(`/(tabs-mechanic)/library/service/detail`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleRedirect}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.serviceTypeBadge}>
            <Text style={styles.serviceTypeText}>
              {formatServiceType(serviceData.type)}
            </Text>
          </View>
          <Text style={styles.priceText}>
            {formatCurrency(serviceData.price || 0)}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={Colors.light.secondaryText}
          />
          <Text style={styles.dateText}>
            {formatDate(new Date(serviceData.date))}
          </Text>
        </View>

        {serviceData.type === "other" && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              {serviceData.description}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginVertical: 8,
    marginHorizontal: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
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
  serviceTypeBadge: {
    paddingVertical: 4,
  },
  serviceTypeText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.light.text,
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
    color: Colors.light.text,
  },
  arrowContainer: {
    paddingLeft: 8,
  },
});
