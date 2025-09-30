import { View, StyleSheet } from "react-native";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";
import ThemedText from "@/components/global/themed/ThemedText";
import { useTranslation } from "react-i18next";

interface Props {
  repairList: RepairData[] | null;
  customerUuid: string;
}

export default function RepairsDisplay({ repairList, customerUuid }: Props) {
  const { t } = useTranslation();

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
          {t("components.mechanic.displays.repairEmptyList")}
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
