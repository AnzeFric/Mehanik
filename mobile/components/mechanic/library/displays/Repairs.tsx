import { View, StyleSheet } from "react-native";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";

interface Props {
  repairList: RepairData[];
  vehicleUuid: string;
}

export default function RepairsDisplay({ repairList, vehicleUuid }: Props) {
  return (
    <>
      <View style={styles.container}>
        <ThemedText
          type={"title"}
          style={{
            textAlignVertical: "bottom",
          }}
        >
          Narejeni servisi
        </ThemedText>
      </View>
      <ThemedView type={"primary"} style={styles.repairsContainer}>
        {repairList.length > 0 ? (
          repairList.map((repair, index) => (
            <Repair repairData={repair} vehicleUuid={vehicleUuid} key={index} />
          ))
        ) : (
          <ThemedText type={"small"} style={styles.listEmptyText}>
            Nimate vnešenih servisov.
          </ThemedText>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  repairsContainer: {
    marginTop: 20,
    gap: 15,
    padding: 10,
  },
  listEmptyText: {
    textAlign: "center",
  },
});
