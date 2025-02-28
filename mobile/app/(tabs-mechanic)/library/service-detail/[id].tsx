import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { formatDate, formatServiceType } from "@/constants/util";

const fakeData = {
  id: 4,
  date: new Date(2024, 7, 30),
  serviceType: "large",
  serviceItems: {
    oilChange: true,
    filterChange: true,
    brakeCheck: true,
    tireRotation: true,
    fluidCheck: true,
    batteryCheck: true,
    sparkPlugs: false,
    airFilter: true,
    cabinFilter: true,
    suspension: true,
    timing: true,
    coolant: true,
  },
  serviceNotes:
    "Annual comprehensive service completed. Timing belt replaced as scheduled maintenance. All systems functioning properly.",
  serviceImages: ["timing_belt_30072024.jpg", "coolant_flush_30072024.jpg"],
  servicePrice: "495.25",
};

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={AppStyles.parentPadding}>
      <View style={styles.header}>
        <BackIcon
          height={30}
          width={30}
          style={{ alignSelf: "flex-start" }}
          onPress={() => {
            router.back();
          }}
        />
        <Text style={styles.title}>
          {formatServiceType(fakeData.serviceType)}
        </Text>
      </View>
      <View>
        <Text>Datum izvedbe: {formatDate(fakeData.date)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
});
