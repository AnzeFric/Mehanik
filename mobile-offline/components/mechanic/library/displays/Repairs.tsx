import { View, StyleSheet } from "react-native";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  repairList: RepairData[] | null;
  customerUuid: string;
}

export default function RepairsDisplay({ repairList, customerUuid }: Props) {
  return (
    <View style={styles.container}>
      {repairList && repairList.length > 0 ? (
        repairList.map((repair, index) => (
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
