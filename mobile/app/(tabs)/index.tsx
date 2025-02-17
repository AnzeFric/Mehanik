import { View, Text, StyleSheet } from "react-native";

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
    paddingTop: 20,
    paddingStart: 25,
    fontFamily: "Jaldi-Regular",
  },
});
