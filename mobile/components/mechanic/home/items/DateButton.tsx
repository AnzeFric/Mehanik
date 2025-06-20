import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import { DateInfo } from "../DaySelector";

interface Props {
  dateInfo: DateInfo;
  selectedDay: string;
  handleDaySelect: (dateInfo: DateInfo) => void;
}

export default function DateButton({
  dateInfo,
  selectedDay,
  handleDaySelect,
}: Props) {
  const { staticColors } = useAnimatedTheme();

  const isToday = () => {
    const today = new Date();
    return (
      dateInfo.fullDate.getDate() === today.getDate() &&
      dateInfo.fullDate.getMonth() === today.getMonth() &&
      dateInfo.fullDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = () => {
    return selectedDay === dateInfo.dayName;
  };

  const buttonStyle = [
    styles.dateButton,
    {
      backgroundColor: staticColors.actionButton,
      borderColor: staticColors.inactiveBorder,
    },
    isToday() && styles.todayDateButton,
    isSelected() && {
      backgroundColor: staticColors.button,
      borderColor: staticColors.button,
    },
    ,
  ];

  const buttonTextStyle = [
    styles.dayName,
    { color: isToday() ? "#404040" : staticColors.actionButtonText },
    isSelected() && styles.selectedText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={() => handleDaySelect(dateInfo)}
    >
      <Text style={buttonTextStyle}>{dateInfo.dayName}</Text>
      <Text style={buttonTextStyle}>{dateInfo.dayNumber}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  dateButton: {
    width: 54,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 0.2,
  },
  selectedDateButton: {
    backgroundColor: "#3B82F6",
    borderColor: "#3B82F6",
  },
  todayDateButton: {
    borderColor: "#86AEFF",
    backgroundColor: "#DEEEFF",
  },
  dayName: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  selectedText: {
    color: "white",
  },
});
