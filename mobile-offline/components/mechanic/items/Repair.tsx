import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import { formatDate, formatRepairType, formatCurrency } from "@/constants/util";
import { RepairData } from "@/interfaces/repair";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import useDataStore from "@/stores/useDataStore";
import ModalPrompt from "@/components/global/ModalPrompt";
import { useState } from "react";
import { useRepairs } from "@/hooks/useRepairs";
import { useCustomers } from "@/hooks/useCustomers";

interface Props {
  repairData: RepairData;
  customerUuid: string;
}

export default function Repair({ repairData, customerUuid }: Props) {
  const { setCustomers } = useDataStore();

  const { staticColors } = useAnimatedTheme();
  const { deleteRepair } = useRepairs();
  const { fetchCustomers } = useCustomers();

  const [showDelete, setShowDelete] = useState(false);

  const handleRedirect = () => {
    router.push({
      pathname: "/repair/detail",
      params: {
        customerUuid: customerUuid,
        repairUuid: repairData.uuid,
      },
    });
  };

  const handleDeleteRepair = async () => {
    const success = await deleteRepair(repairData.uuid);
    if (success) {
      const newCustomers = await fetchCustomers();
      if (newCustomers) setCustomers(newCustomers);
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri brisanju servisa. Kliči Anžeta."
      );
    }
    setShowDelete(false);
  };

  return (
    <ThemedView type={"secondary"} style={{ borderRadius: 4 }}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={handleRedirect}
        onLongPress={() => {
          setShowDelete(true);
        }}
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
              {formatDate(new Date(repairData.repairDate))}
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

      {showDelete && (
        <ModalPrompt
          isVisible={true}
          message={"Servis bo trajno izbrisan"}
          onConfirm={handleDeleteRepair}
          onCancel={() => {
            setShowDelete(false);
          }}
        />
      )}
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
