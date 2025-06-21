import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { WorkHour, DayType, TimeSlot, PickerType } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";
import { useEffect, useMemo, useState } from "react";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import ThemedButton from "@/components/global/themed/ThemedButton";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import ThemedDatePicker from "@/components/global/themed/ThemedDatePicker";
import { formatTime } from "@/constants/util";
import ThemedText from "@/components/global/themed/ThemedText";

const dayLabels: Record<DayType, string> = {
  pon: "Ponedeljek",
  tor: "Torek",
  sre: "Sreda",
  čet: "Četrtek",
  pet: "Petek",
  sob: "Sobota",
  ned: "Nedelja",
};

const days: Array<DayType> = ["pon", "tor", "sre", "čet", "pet", "sob", "ned"];

interface Props {
  workHour: WorkHour;
  setWorkHour: (workHour: WorkHour) => void;
}

export default function WorkHourItem({ workHour, setWorkHour }: Props) {
  const { staticColors } = useAnimatedTheme();

  const [daySearch, setDaySearch] = useState(dayLabels[workHour.day]);
  const [daysFocus, setDaysFocus] = useState(false);

  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerFocus, setPickerFocus] = useState<PickerType>({
    index: 0,
    dateTime: new Date(),
    isStart: true,
  });

  useEffect(() => {
    setDaySearch(dayLabels[workHour.day]);
  }, [workHour.day]);

  const filteredDays = useMemo(() => {
    return days.filter((dayKey) =>
      dayLabels[dayKey].toLowerCase().includes(daySearch.toLowerCase())
    );
  }, [daySearch]);

  const handleDayChange = (selectedDay: DayType) => {
    setDaySearch(dayLabels[selectedDay]);
    setWorkHour({ ...workHour, day: selectedDay });
    setDaysFocus(false);
  };

  const updateTimeSlot = (
    index: number,
    updatedTime: string,
    isStart: boolean
  ) => {
    const currentSlot = workHour.shifts[index];
    const newTimeSlot: TimeSlot = {
      start: isStart ? updatedTime : currentSlot.start,
      end: isStart ? currentSlot.end : updatedTime,
    };

    const updatedShifts = workHour.shifts.map((slot, i) =>
      i === index ? newTimeSlot : slot
    );

    const newWorkHour: WorkHour = {
      ...workHour,
      shifts: updatedShifts,
    };

    setWorkHour(newWorkHour);
  };

  const addTimeSlot = () => {
    const newShift: TimeSlot = {
      start: "08:00",
      end: "16:00",
    };
    const newWorkHour: WorkHour = {
      ...workHour,
      shifts: [...workHour.shifts, newShift],
    };
    setWorkHour(newWorkHour);
  };

  const deleteTimeSlot = (index: number) => {
    const updatedShifts = workHour.shifts.filter((slot, i) => i != index);
    const newWorkHour: WorkHour = {
      ...workHour,
      shifts: updatedShifts,
    };
    setWorkHour(newWorkHour);
  };

  const handlePickerConfirm = (date: Date) => {
    updateTimeSlot(pickerFocus.index, formatTime(date), pickerFocus.isStart);
    setPickerOpen(false);
  };

  const handleOpenPicker = (index: number, time: string, isStart: boolean) => {
    const splitString = time.split(":");

    const hour = parseInt(splitString[0]);
    const min = parseInt(splitString[1]);

    let timeDate = new Date();
    timeDate.setHours(hour, min, 0, 0);

    setPickerFocus({ index: index, dateTime: timeDate, isStart: isStart });
    setPickerOpen(true);
  };

  const handleToggleChange = (value: boolean) => {
    setWorkHour({ ...workHour, isOpen: value });
  };

  return (
    <View style={{ flex: 1, gap: 10 }}>
      <ThemedTextInput
        style={styles.input}
        placeholder={"Dan"}
        value={daySearch}
        onChangeText={setDaySearch}
        autoCapitalize={"words"}
        onFocus={() => setDaysFocus(true)}
        onBlur={() => setDaysFocus(false)}
      />
      {daysFocus && (
        <ScrollView
          style={styles.optionsContainer}
          nestedScrollEnabled
          keyboardShouldPersistTaps={"handled"}
        >
          {filteredDays.map((day, index) => (
            <TouchableOpacity
              style={[
                styles.option,
                { backgroundColor: staticColors.secondaryBackground },
                index !== 0 && { paddingTop: 15 },
              ]}
              onPress={() => {
                handleDayChange(day);
              }}
              key={index}
            >
              <Text
                style={[styles.optionText, { color: staticColors.primaryText }]}
              >
                {dayLabels[day]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View style={styles.toggleContainer}>
        <ThemedText type={"small"} bold>
          Odprto:
        </ThemedText>
        <Switch
          value={workHour.isOpen}
          onValueChange={handleToggleChange}
          trackColor={{ true: staticColors.track, false: staticColors.track }}
          thumbColor={staticColors.thumb}
        />
      </View>

      {workHour.isOpen && (
        <View style={{ gap: 10 }}>
          {workHour.shifts.map((slot, index) => (
            <View style={styles.shiftContainer} key={index}>
              <ThemedText type={"extraSmall"}>Od:</ThemedText>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => handleOpenPicker(index, slot.start, true)}
              >
                <ThemedText type={"extraSmall"}>{slot.start}</ThemedText>
              </TouchableOpacity>

              <ThemedText type={"extraSmall"}>Do:</ThemedText>
              <TouchableOpacity
                style={styles.timeInput}
                onPress={() => handleOpenPicker(index, slot.end, false)}
              >
                <ThemedText type={"extraSmall"}>{slot.end}</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  { backgroundColor: staticColors.destroyButton },
                ]}
                onPress={() => {
                  deleteTimeSlot(index);
                }}
              >
                <Text style={styles.deleteButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <ThemedButton
            buttonType="small"
            buttonText="+ Dodaj izmeno"
            onPress={addTimeSlot}
          />
        </View>
      )}
      <ThemedDatePicker
        modal
        open={pickerOpen}
        date={pickerFocus.dateTime}
        onConfirm={handlePickerConfirm}
        onCancel={() => setPickerOpen(false)}
        mode="time"
        locale="sl"
        title="Izberi čas"
        confirmText="Potrdi"
        cancelText="Prekliči"
        minuteInterval={10}
        is24hourSource={"locale"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
  optionsContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    maxHeight: 200,
  },
  option: {
    borderBottomWidth: 0.8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  shiftContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeInput: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: Colors.light.inactiveBorder,
  },
  deleteButton: {
    paddingHorizontal: 5,
    borderRadius: 60,
    marginLeft: 20,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "white",
    padding: 3,
  },
});
