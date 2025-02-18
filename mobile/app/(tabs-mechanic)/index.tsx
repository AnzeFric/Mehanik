import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import MenuIcon from "@/assets/icons/MenuIcon.svg";

export default function HomeMechanicScreen() {
  return (
    <View style={AppStyles.parentPadding}>
      <View style={styles.settingsIcon}>
        <MenuIcon height={30} width={30} onPress={() => {}} />
      </View>

      <Text style={styles.userGreeting}>Zdravo Mehanik!</Text>

      <View>
        <Text>Prihodnji termini</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  settingsIcon: {
    alignSelf: "flex-end",
  },
  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
