import { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import DateButton from "./items/DateButton";
import ThemedDatePicker from "@/components/global/themed/ThemedDatePicker";

interface DaySelectorProps {
  selectedDay: string;
  onDaySelect: (dayIndex: number, date: Date) => void;
}

export interface DateInfo {
  dayName: string;
  dayNumber: number;
  month: string;
  year: number;
  fullDate: Date;
}

export default function DaySelector({
  selectedDay,
  onDaySelect,
}: DaySelectorProps) {
  const days = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];
  const months = [
    "Januar",
    "Februar",
    "Marec",
    "April",
    "Maj",
    "Junij",
    "Julij",
    "Avgust",
    "September",
    "Oktober",
    "November",
    "December",
  ];

  const { staticColors } = useAnimatedTheme();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateInfo[]>([]);
  const [weekStartDate, setWeekStartDate] = useState<Date>(
    getWeekStartDate(new Date())
  );

  const scrollRef = useRef<ScrollView>(null);

  function getWeekStartDate(date: Date): Date {
    const result = new Date(date);
    const day = result.getDay();

    if (day === 0) {
      result.setDate(result.getDate() - 6);
    } else {
      result.setDate(result.getDate() - (day - 1));
    }

    return result;
  }

  useEffect(() => {
    generateDateRange(weekStartDate);
  }, [weekStartDate]);

  const generateDateRange = (startDate: Date) => {
    const dates: DateInfo[] = [];
    const weekStart = new Date(startDate);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(weekStart);
      currentDate.setDate(weekStart.getDate() + i);

      let dayIndex;
      if (currentDate.getDay() === 0) {
        dayIndex = 6;
      } else {
        dayIndex = currentDate.getDay() - 1;
      }

      dates.push({
        dayName: days[dayIndex],
        dayNumber: currentDate.getDate(),
        month: months[currentDate.getMonth()],
        year: currentDate.getFullYear(),
        fullDate: new Date(currentDate),
      });
    }

    setDateRange(dates);
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setShowDatePicker(false);

    const newWeekStart = getWeekStartDate(date);
    if (newWeekStart.getTime() !== weekStartDate.getTime()) {
      setWeekStartDate(newWeekStart);
    }

    let dayIndex;
    if (date.getDay() === 0) {
      dayIndex = 6;
    } else {
      dayIndex = date.getDay() - 1;
    }

    onDaySelect(dayIndex, date);

    setTimeout(() => {
      if (scrollRef.current) {
        const scrollPosition = dayIndex * (54 + 8);
        scrollRef.current.scrollTo({ x: scrollPosition, animated: true });
      }
    }, 100);
  };

  const handleDaySelect = (dateInfo: DateInfo) => {
    const date = dateInfo.fullDate;
    const dayIndex = days.findIndex((day) => day === dateInfo.dayName);

    setSelectedDate(date);
    onDaySelect(dayIndex, date);
  };

  const formattedCurrentMonth = () => {
    return `${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
  };

  const goToPreviousWeek = () => {
    const newWeekStart = new Date(weekStartDate);
    newWeekStart.setDate(newWeekStart.getDate() - 7);
    setWeekStartDate(newWeekStart);
    setSelectedDate(newWeekStart);
  };

  const goToNextWeek = () => {
    const newWeekStart = new Date(weekStartDate);
    newWeekStart.setDate(newWeekStart.getDate() + 7);
    setWeekStartDate(newWeekStart);
    setSelectedDate(newWeekStart);
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={[
            styles.datePickerButton,
            { backgroundColor: staticColors.actionButton },
          ]}
        >
          <Text
            style={[
              styles.currentMonth,
              { color: staticColors.actionButtonText },
            ]}
          >
            {formattedCurrentMonth()}
          </Text>
          <Ionicons name={"calendar"} size={20} color={staticColors.blueIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.todayButton, { backgroundColor: staticColors.button }]}
          onPress={() => handleDateSelected(new Date())}
        >
          <Text style={{ fontWeight: "bold", color: staticColors.buttonText }}>
            Danes
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekNavigationContainer}>
        <TouchableOpacity
          style={[styles.weekNavButton, { paddingRight: 10 }]}
          onPress={goToPreviousWeek}
        >
          <Ionicons
            name={"chevron-back"}
            size={30}
            color={staticColors.blueIcon}
          />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.buttonContainer}
        >
          {dateRange.map((dateInfo, index) => (
            <DateButton
              dateInfo={dateInfo}
              selectedDay={selectedDay}
              handleDaySelect={handleDaySelect}
              key={index}
            />
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[styles.weekNavButton, { paddingLeft: 10 }]}
          onPress={goToNextWeek}
        >
          <Ionicons
            name={"chevron-forward"}
            size={30}
            color={staticColors.blueIcon}
          />
        </TouchableOpacity>
      </View>

      <ThemedDatePicker
        modal
        open={showDatePicker}
        date={selectedDate}
        onConfirm={handleDateSelected}
        onCancel={() => setShowDatePicker(false)}
        mode="date"
        locale="sl" // Slovenian locale
        title="Izberi datum"
        confirmText="Potrdi"
        cancelText="Prekliči"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 14,
    paddingHorizontal: 10,
  },
  currentMonth: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  todayButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  weekNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weekNavButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
