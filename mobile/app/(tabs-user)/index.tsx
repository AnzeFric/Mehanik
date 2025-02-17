import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";

export default function HomeUserScreen() {
  return (
    <View style={AppStyles.parentPadding}>
      <Text style={styles.userGreeting}>Zdravo Stranka!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
