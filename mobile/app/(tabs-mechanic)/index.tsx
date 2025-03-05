import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";

export default function HomeMechanicScreen() {
  return (
    <View style={styles.container}>
      <MenuIcon
        style={styles.settingsIcon}
        height={30}
        width={30}
        onPress={() => {
          router.push("/(tabs-mechanic)/settings");
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={[AppStyles.bigTitle, styles.title]}>Pregled terminov</Text>
        <DaySchedule />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  settingsIcon: {
    alignSelf: "flex-end",
    paddingHorizontal: 25,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    paddingHorizontal: 25,
  },
});
