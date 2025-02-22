import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";

export default function HomeMechanicScreen() {
  return (
    <View style={[AppStyles.parentPadding, { flex: 1 }]}>
      <View style={styles.settingsIcon}>
        <MenuIcon
          height={30}
          width={30}
          onPress={() => {
            router.push("/(tabs-mechanic)/settings");
          }}
        />
      </View>
      <View>
        <Text style={styles.title}>Prihodki</Text>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Teden</Text>
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>323.03€</Text>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Mesec</Text>
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>1203.03€</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Pregled terminov</Text>
        <DaySchedule />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 32,
    fontFamily: "Jaldi-Regular",
  },
  incomeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    fontFamily: "Jaldi-Regular",
    lineHeight: 28,
  },

  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
