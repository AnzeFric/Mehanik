import { Text, View, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import Repair from "@/components/mechanic/items/Repair";
import { RepairData } from "@/interfaces/repair";

interface Props {
  repairList: RepairData[];
  vehicleUuid: string;
}

export default function RepairsDisplay({ repairList, vehicleUuid }: Props) {
  return (
    <>
      <View style={styles.container}>
        <Text
          style={[
            AppStyles.title,
            {
              textAlignVertical: "bottom",
            },
          ]}
        >
          Narejeni servisi
        </Text>
      </View>
      <View style={styles.servicesContainer}>
        {repairList.length > 0 ? (
          repairList.map((repair, index) => (
            <Repair repairData={repair} vehicleUuid={vehicleUuid} key={index} />
          ))
        ) : (
          <Text style={[AppStyles.smallText, styles.listEmptyText]}>
            Nimate vnešenih servisov.
          </Text>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  servicesContainer: {
    paddingTop: 20,
    gap: 10,
  },
  listEmptyText: {
    textAlign: "center",
  },
});
