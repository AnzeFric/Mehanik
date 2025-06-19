import { View, Modal, StyleSheet } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedDatePicker from "@/components/global/themed/ThemedDatePicker";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";

interface Props {
  title: string;
  firstScreen: number; // 0 - date picker, 1 - time picker, 2 - text input for message
  isVisible: boolean;
  onConfirm: (startDate: Date, endDate: Date, userMessage: string) => void;
  onCancel: () => void;
}

export default function ModalAppointment({
  isVisible,
  title,
  firstScreen,
  onConfirm,
  onCancel,
}: Props) {
  // Ensure firstScreen is within valid range
  const inputScreenNumber = Math.min(Math.max(firstScreen, 0), 2);

  const [date, setDate] = useState<Date>(new Date()); // TODO: add prop date and get default values from there
  const [time, setTime] = useState<Date>(new Date());
  const [message, setMessage] = useState<string>("");
  const [screenNumber, setScreenNumber] = useState<number>(inputScreenNumber);

  const cleanup = () => {
    setScreenNumber(inputScreenNumber);
    setMessage("");
  };

  const handlePreviousPress = () => {
    if (screenNumber > inputScreenNumber) {
      setScreenNumber((prevScreenNumber) => prevScreenNumber - 1);
    }
  };

  const handleNextPress = () => {
    if (screenNumber === 2) {
      cleanup();
      onConfirm(date, message);
    } else {
      setScreenNumber((prevScreenNumber) => prevScreenNumber + 1);
    }
  };

  const handleModalClose = () => {
    cleanup();
    onCancel();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={handleModalClose}
    >
      <View style={styles.centeredView}>
        <ThemedView type={"primary"} style={styles.modalView}>
          <ThemedIcon
            name={"close"}
            size={30}
            onPress={handleModalClose}
            style={{ alignSelf: "flex-end" }}
          />
          <ThemedText type={"title"} style={{ textAlign: "center" }}>
            {title}
          </ThemedText>
          <View style={styles.contentContainer}>
            {screenNumber === 0 && (
              <>
                <ThemedText type={"normal"} style={styles.itemTitle}>
                  Izberite datum
                </ThemedText>
                <ThemedDatePicker
                  date={date}
                  onDateChange={(newDate: Date) => {
                    setDate(newDate);
                  }}
                  mode={"date"}
                  is24hourSource={"locale"}
                />
              </>
            )}

            {screenNumber === 1 && (
              <>
                <ThemedText type={"normal"} style={styles.itemTitle}>
                  Izberite čas
                </ThemedText>
                <ThemedDatePicker
                  date={time}
                  onDateChange={(newTime: Date) => {
                    setTime(newTime);
                  }}
                  mode={"time"}
                  is24hourSource={"locale"}
                />
              </>
            )}

            {screenNumber === 2 && (
              <ThemedTextInput
                style={styles.input}
                placeholder={"Sporočilo (ni obvezno)"}
                value={message}
                onChangeText={setMessage}
                multiline={true}
                numberOfLines={5}
              />
            )}

            <View style={styles.buttonContainer}>
              <ThemedButton
                buttonType={"option-destroy"}
                buttonText={"Nazaj"}
                onPress={handlePreviousPress}
                selected={screenNumber != inputScreenNumber}
              />
              <ThemedButton
                buttonType={"option"}
                buttonText={screenNumber === 2 ? "Potrdi" : "Naprej"}
                onPress={handleNextPress}
              />
            </View>
          </View>
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    borderRadius: 6,
    width: "75%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  itemTitle: {
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 50,
  },
  input: {
    height: 125,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginVertical: 10,
    verticalAlign: "bottom",
  },
});
