import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Ionicons } from "@expo/vector-icons";

const dayNames = ["Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"];
const monthNames = [
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

interface DaySelectorProps {
  selectedDay: string;
  onDaySelect: (day: string) => void;
}

interface DateInfo {
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
        dayName: dayNames[dayIndex],
        dayNumber: currentDate.getDate(),
        month: monthNames[currentDate.getMonth()],
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

    onDaySelect(dayNames[dayIndex]);

    setTimeout(() => {
      if (scrollRef.current) {
        const scrollPosition = dayIndex * (54 + 8);
        scrollRef.current.scrollTo({ x: scrollPosition, animated: true });
      }
    }, 100);
  };

  const handleDaySelect = (dateInfo: DateInfo) => {
    setSelectedDate(dateInfo.fullDate);
    onDaySelect(dateInfo.dayName);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formattedCurrentMonth = () => {
    return `${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
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
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.currentMonth}>{formattedCurrentMonth()}</Text>
          <Ionicons name="calendar" size={20} color="#3B82F6" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.todayButton}
          onPress={() => handleDateSelected(new Date())}
        >
          <Text style={styles.todayText}>Danes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.weekNavigationContainer}>
        <TouchableOpacity
          style={styles.weekNavButton}
          onPress={goToPreviousWeek}
        >
          <Ionicons name="chevron-back" size={30} color="#3B82F6" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.buttonContainer}>
            {dateRange.map((dateInfo, index) => (
              <View key={index} style={styles.dateButtonWrapper}>
                <TouchableOpacity
                  style={[
                    styles.dateButton,
                    selectedDay === dateInfo.dayName &&
                      styles.selectedDateButton,
                    isToday(dateInfo.fullDate) && styles.todayDateButton,
                  ]}
                  onPress={() => handleDaySelect(dateInfo)}
                >
                  <Text
                    style={[
                      styles.dayName,
                      selectedDay === dateInfo.dayName && styles.selectedText,
                      isToday(dateInfo.fullDate) && styles.todayText,
                    ]}
                  >
                    {dateInfo.dayName}
                  </Text>
                  <Text
                    style={[
                      styles.dayNumber,
                      selectedDay === dateInfo.dayName && styles.selectedText,
                      isToday(dateInfo.fullDate) && styles.todayText,
                    ]}
                  >
                    {dateInfo.dayNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.weekNavButton} onPress={goToNextWeek}>
          <Ionicons name="chevron-forward" size={30} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <DatePicker
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
  container: {
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  currentMonth: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginRight: 8,
  },
  datePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  todayButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: "#3B82F6",
  },
  todayText: {
    color: "white",
    fontWeight: "600",
  },
  weekNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weekNavButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingVertical: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
  },
  dateButtonWrapper: {
    alignItems: "center",
  },
  dateButton: {
    width: 54,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
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
