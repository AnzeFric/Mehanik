import { View, StyleSheet } from "react-native";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  repairList: RepairData[] | null;
  customerUuid: string;
}

export default function RepairsDisplay({ repairList, customerUuid }: Props) {
  const sortedRepairs = repairList?.sort((a, b) => {
    const dateA = new Date(a.repairDate);
    const dateB = new Date(b.repairDate);
    return dateB.getTime() - dateA.getTime(); // newest first
  });

  return (
    <View style={styles.container}>
      {sortedRepairs && sortedRepairs.length > 0 ? (
        sortedRepairs.map((repair, index) => (
          <Repair repairData={repair} customerUuid={customerUuid} key={index} />
        ))
      ) : (
        <ThemedText type={"small"} style={{ textAlign: "center" }}>
          Nimate vnešenih servisov.
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 15,
  },
});
