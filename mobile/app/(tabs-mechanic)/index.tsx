import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";
import HorizontalButtons from "@/components/mechanic/home/HorizontalButtons";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

export default function HomeMechanicScreen() {
  return (
    <View style={AppStyles.parentPadding}>
      <View style={styles.settingsIcon}>
        <MenuIcon height={30} width={30} onPress={() => {}} />
      </View>

      <Text style={styles.userGreeting}>Zdravo Mehanik!</Text>

      <View>
        <Text style={styles.title}>Prihodki</Text>
        <Text style={styles.text}>Danes</Text>
        <Text style={styles.text}>Teden</Text>
        <Text style={styles.text}>Mesec</Text>
      </View>
      <View>
        <Text style={styles.title}>Pregled terminov</Text>

        <Text>Zamenji gumbe za component</Text>

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
  },
  text: {
    fontSize: 24,
    fontFamily: "Jaldi-Regular",
  },

  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
