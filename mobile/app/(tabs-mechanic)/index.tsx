import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";

export default function HomeMechanicScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={AppStyles.bigTitle}>Pregled terminov</Text>
        <MenuIcon
          height={30}
          width={30}
          onPress={() => {
            router.push("/(tabs-user)/settings");
          }}
        />
      </View>
      <View style={styles.contentContainer}>
        <DaySchedule />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  contentContainer: {
    gap: 10,
    paddingTop: 15,
    flex: 1,
  },
});
