import { View, Text, StyleSheet } from "react-native";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router, useLocalSearchParams } from "expo-router";
import BackIcon from "@/assets/icons/BackIcon.svg";
import { Colors } from "@/constants/Colors";

export default function AppointmentScreen() {
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
        <Text style={styles.title}>Pregled terminov</Text>
      </View>
      <View style={styles.contentContainer}>
        <DaySchedule />
      </View>
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
    marginHorizontal: 25,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    flex: 1,
    textAlign: "center",
  },
  contentContainer: {
    marginTop: 20,
    flex: 1,
  },
});
