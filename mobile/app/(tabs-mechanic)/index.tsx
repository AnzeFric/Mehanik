import { View, Text, StyleSheet } from "react-native";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import HorizontalButtons from "@/components/mechanic/home/HorizontalButtons";

export default function HomeMechanicScreen() {
  return (
    <View style={AppStyles.parentPadding}>
      <View style={styles.settingsIcon}>
        <MenuIcon height={30} width={30} onPress={() => {}} />
      </View>

      <Text style={styles.userGreeting}>Zdravo Mehanik!</Text>

      <View>
        <Text style={styles.title}>Prihodki</Text>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Danes</Text>
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>123.03€</Text>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Teden</Text>
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>323.03€</Text>
        </View>
        <View style={styles.incomeContainer}>
          <Text style={styles.text}>Mesec</Text>
          <Text style={[styles.text, { alignSelf: "flex-end" }]}>1203.03€</Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>Pregled terminov</Text>
        <HorizontalButtons />
        <Text>Tu se pol prikažejo termini za vsak dan, ko se klikne gumb</Text>
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
    paddingBottom: 10,
  },
  incomeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 22,
    fontFamily: "Jaldi-Regular",
  },

  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
