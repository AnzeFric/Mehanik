import { View, Modal, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedDatePicker from "@/components/global/themed/ThemedDatePicker";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";

interface Props {
  title: string;
  startDate?: Date;
  endDate?: Date;
  firstScreen: number; // 0 - start date picker, 1 - end date picker, 2 - text input for message
  isVisible: boolean;
  onConfirm: (startDate: Date, endDate: Date, userMessage: string) => void;
  onCancel: () => void;
}

export default function ModalAppointment({
  title,
  startDate = new Date(),
  endDate = new Date(),
  firstScreen,
  isVisible,
  onConfirm,
  onCancel,
}: Props) {
  // Ensure firstScreen is within valid range
  const inputScreenNumber = Math.min(Math.max(firstScreen, 0), 2);

  const [newStartDate, setNewStartDate] = useState(startDate);
  const [newEndDate, setNewEndDate] = useState(endDate);
  const [message, setMessage] = useState("");
  const [screenNumber, setScreenNumber] = useState(inputScreenNumber);

  useEffect(() => {
    setNewStartDate(startDate);
    setNewEndDate(endDate);
  }, [startDate, endDate]);

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
      onConfirm(newStartDate, newEndDate, message);
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
                  Izberite začetni datum
                </ThemedText>
                <ThemedDatePicker
                  date={newStartDate}
                  onDateChange={(newDate: Date) => {
                    setNewStartDate(newDate);
                  }}
                  mode={"datetime"}
                  is24hourSource={"locale"}
                />
              </>
            )}

            {screenNumber === 1 && (
              <>
                <ThemedText type={"normal"} style={styles.itemTitle}>
                  Izberite končni datum
                </ThemedText>
                <ThemedDatePicker
                  date={newEndDate}
                  onDateChange={(newDate: Date) => {
                    setNewEndDate(newDate);
                  }}
                  mode={"datetime"}
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
