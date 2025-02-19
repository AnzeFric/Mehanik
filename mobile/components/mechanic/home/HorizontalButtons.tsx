import { View, ScrollView, StyleSheet } from "react-native";
import HorizontalButton from "./HorizontalButton";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

export default function HorizontalButtons() {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ paddingBottom: 30 }}
    >
      <View style={styles.container}>
        {days.map((item, index) => (
          <HorizontalButton buttonText={item} key={index} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
