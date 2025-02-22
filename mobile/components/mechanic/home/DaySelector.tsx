import { ScrollView, View, StyleSheet } from "react-native";
import HorizontalButton from "./items/HorizontalButton";

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

interface DaySelectorProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}

export default function DaySelector({
  selectedDay,
  onDaySelect,
}: DaySelectorProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        {days.map((day, index) => (
          <HorizontalButton
            buttonText={day}
            isSelected={selectedDay === day}
            onPress={() => onDaySelect(day)}
            key={index}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});
