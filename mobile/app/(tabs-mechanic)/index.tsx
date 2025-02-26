import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import DaySchedule from "@/components/mechanic/home/DaySchedule";
import { router } from "expo-router";

export default function HomeMechanicScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
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
          <Text style={AppStyles.bigTitle}>Prihodki</Text>
          <View style={styles.incomeContainer}>
            <Text style={AppStyles.title}>Teden</Text>
            <Text style={[AppStyles.title, styles.moneyText]}>323.03€</Text>
          </View>
          <View style={styles.incomeContainer}>
            <Text style={AppStyles.title}>Mesec</Text>
            <Text style={[AppStyles.title, styles.moneyText]}>1203.03€</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[AppStyles.bigTitle, { paddingHorizontal: 25 }]}>
          Pregled terminov
        </Text>
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
  contentContainer: {
    paddingHorizontal: 25,
  },
  settingsIcon: {
    alignSelf: "flex-end",
  },
  incomeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moneyText: {
    alignSelf: "flex-end",
  },
  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
