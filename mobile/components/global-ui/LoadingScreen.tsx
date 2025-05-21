import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={Colors.light.specialBlue} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: Colors.light.specialBlue,
  },
});
