import { ScrollView, View, StyleSheet } from "react-native";
import { useMemo } from "react";
import HorizontalButton from "./items/HorizontalButton";

interface DayDate {
  day: string;
  date: Date;
  dayOfMonth: number;
}

const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];

function generateDayDateArr(): Array<DayDate> {
  const dayDateArr: DayDate[] = [];
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

  // Adjust for your days array which starts with Monday (index 0)
  // If currentDay is 0 (Sunday), we want dayIndex to be 6
  // Otherwise, we subtract 1 to convert to your 0-indexed days array
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;

  // Get the date for Monday (start of the week)
  const mondayDate = new Date(today);
  mondayDate.setDate(today.getDate() - dayIndex);

  // Generate all days of the week
  days.forEach((day, index) => {
    const date = new Date(mondayDate);
    date.setDate(mondayDate.getDate() + index);

    dayDateArr.push({
      day,
      date,
      dayOfMonth: date.getDate(),
    });
  });

  return dayDateArr;
}

interface DaySelectorProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}

export default function DaySelector({
  selectedDay,
  onDaySelect,
}: DaySelectorProps) {
  const dayDateArr = useMemo(() => {
    return generateDayDateArr();
  }, []);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.buttonContainer}>
        {dayDateArr.map((dayDate, index) => (
          <HorizontalButton
            buttonDay={dayDate.day}
            buttonDayNum={dayDate.dayOfMonth}
            isSelected={selectedDay === dayDate.day}
            onPress={() => onDaySelect(dayDate.day)}
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
