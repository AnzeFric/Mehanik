import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import HorizontalButton from "./HorizontalButton";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

export default function HorizontalButtons() {
  const [selectedDay, setSelectedDay] = useState<string>(days[0]);

  const handleDaySelect = (day: string) => {
    setSelectedDay(day);
  };

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {days.map((day, index) => (
          <HorizontalButton
            buttonText={day}
            isSelected={selectedDay === day}
            onPress={() => handleDaySelect(day)}
            key={index}
          />
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
