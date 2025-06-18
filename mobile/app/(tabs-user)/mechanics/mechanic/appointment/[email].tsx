import { View, StyleSheet } from "react-native";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { useLocalSearchParams } from "expo-router";
import ThemedView from "@/components/global/themed/ThemedView";
import TitleRow from "@/components/shared/TitleRow";

// TODO: Fetch mechanic appointments
export default function AppointmentScreen() {
  const { email } = useLocalSearchParams();

  return (
    <ThemedView type={"background"} style={styles.container}>
      <TitleRow title={"Pregled terminov"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <DaySchedule appointments={[]} mechanicEmail={email.toString()} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 15,
    flex: 1,
  },
});
