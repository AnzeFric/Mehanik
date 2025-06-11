import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

interface Props {
  buttonDay: string;
  buttonDayNum: number;
  isSelected: boolean;
  onPress: () => void;
}

export default function HorizontalButton({
  buttonDay,
  buttonDayNum,
  isSelected,
  onPress,
}: Props) {
  return (
    <View style={styles.dateButtonWrapper}>
      <TouchableOpacity
        style={[styles.dateButton, isSelected && styles.selectedDateButton]}
        onPress={onPress}
      >
        <Text style={[styles.dayName, isSelected && styles.selectedText]}>
          {buttonDay}
        </Text>
        <Text style={[styles.dayNumber, isSelected && styles.selectedText]}>
          {buttonDayNum}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dateButtonWrapper: {
    alignItems: "center",
  },
  dateButton: {
    width: 58,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
  },
  selectedDateButton: {
    backgroundColor: "#3B82F6",
  },
  todayDateButton: {
    borderWidth: 1,
    borderColor: "#3B82F6",
    backgroundColor: "#EBF5FF",
  },
  dayName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  selectedText: {
    color: "white",
  },
});
