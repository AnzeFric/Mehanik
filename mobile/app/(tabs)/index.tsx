import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.userGreeting}>Welcome User!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userGreeting: {
    fontSize: 36,
    fontFamily: "Jaldi-Regular",
  },
});
