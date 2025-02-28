import { View, Text, ScrollView, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { router, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import {
  formatDate,
  formatServiceType,
  formatServiceItems,
} from "@/constants/util";
import { ServiceData } from "@/interfaces/mechanic";

const fakeData: ServiceData = {
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
    <View style={styles.container}>
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
      <ScrollView style={styles.container}>
        <View style={styles.scrollViewContent}>
          <View>
            <Text style={AppStyles.title}>Datum izvedbe:</Text>
            <Text style={AppStyles.text}>{formatDate(fakeData.date)}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Cena:</Text>
            <Text style={AppStyles.text}>{fakeData.servicePrice}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Izvedena popravila:</Text>
            {fakeData.serviceItems &&
              Object.entries(fakeData.serviceItems)
                .filter(([_, value]) => value) // Filter only true values
                .map(([key]) => (
                  <Text key={key} style={AppStyles.text}>
                    - {formatServiceItems(key)}
                  </Text>
                ))}
            {fakeData.customServiceDescription && (
              <Text style={AppStyles.text}>
                {fakeData.customServiceDescription}
              </Text>
            )}
          </View>

          <View>
            <Text style={AppStyles.title}>Dodatne opombe:</Text>
            <Text style={AppStyles.text}>{fakeData.serviceNotes}</Text>
          </View>
          <View>
            <Text style={AppStyles.title}>Slike servisa:</Text>
            <Text style={AppStyles.text}>"Slike"</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Jaldi-Regular",
    flex: 1,
    textAlign: "center",
  },
  scrollViewContent: {
    gap: 20,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
});
