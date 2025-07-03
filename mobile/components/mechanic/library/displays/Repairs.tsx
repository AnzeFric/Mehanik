import { View, StyleSheet } from "react-native";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  repairList: RepairData[];
}

export default function RepairsDisplay({ repairList }: Props) {
  return (
    <View style={styles.container}>
      {repairList.length > 0 ? (
        repairList.map((repair, index) => (
          <Repair repairData={repair} key={index} />
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
