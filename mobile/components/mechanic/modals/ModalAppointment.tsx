import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import DatePicker from "react-native-date-picker";
import { AppStyles } from "@/constants/Styles";
import CloseIcon from "@/assets/icons/XIcon.svg";

interface Props {
  isVisible: boolean;
  title: string;
  firstScreen: number; // 0 - date picker, 1 - time picker, 2 - text input for message
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalTime({
  isVisible,
  title,
  firstScreen,
  onConfirm,
  onCancel,
}: Props) {
  // Ensure firstScreen is within valid range
  const normalizedFirstScreen = Math.min(Math.max(firstScreen, 0), 2);

  const [date, setDate] = useState<Date>(new Date()); // TODO: add prop date and get default values from there
  const [time, setTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [screenNumber, setScreenNumber] = useState<number>(
    normalizedFirstScreen
  );

  const handlePreviousPress = () => {
    if (screenNumber > normalizedFirstScreen) {
      setScreenNumber((prevScreenNumber) => prevScreenNumber - 1);
    }
  };

  const handleNextPress = () => {
    if (screenNumber === 2) {
      onConfirm();
    } else {
      setScreenNumber((prevScreenNumber) => prevScreenNumber + 1);
    }
  };

  const handleModalClose = () => {
    setScreenNumber(normalizedFirstScreen);
    setDescription("");
    onCancel();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={handleModalClose}
      animationType={"fade"}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <CloseIcon
              style={styles.closeIcon}
              color={Colors.light.activeIcon}
              height={28}
              width={28}
              onPress={handleModalClose}
            />
            <Text style={[AppStyles.title, styles.title]}>{title}</Text>
          </View>
          <View style={styles.contentContainer}>
            {screenNumber === 0 && (
              <>
                <Text style={[AppStyles.text, styles.itemTitle]}>
                  Izberite datum
                </Text>
                <DatePicker
                  date={date}
                  onDateChange={(newDate: Date) => {
                    setDate(newDate);
                  }}
                  mode="date"
                  is24hourSource="locale"
                />
              </>
            )}

            {screenNumber === 1 && (
              <>
                <Text style={[AppStyles.text, styles.itemTitle]}>
                  Izberite čas
                </Text>
                <DatePicker
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
              <TextInput
                style={[styles.input, styles.inputText]}
                placeholder={"Sporočilo za stranko (ni obvezno)"} // TODO: Dodaj prop za stranka ali mehanik
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={5}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  screenNumber === normalizedFirstScreen
                    ? styles.butonInactive
                    : styles.buttonCancel,
                ]}
                onPress={handlePreviousPress}
              >
                <Text style={styles.buttonText}>Nazaj</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={handleNextPress}
              >
                <Text style={styles.buttonText}>
                  {screenNumber === 2 ? "Potrdi" : "Naprej"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    shadowColor: Colors.light.shadowColor,
    width: "75%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    display: "flex",
    paddingStart: 35,
    paddingEnd: 15,
    paddingTop: 10,
  },
  closeIcon: {
    alignSelf: "flex-end",
  },
  title: {
    alignSelf: "flex-start",
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
    gap: 60,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    elevation: 2,
  },
  buttonCancel: {
    backgroundColor: Colors.light.cancelButton,
  },
  butonInactive: {
    backgroundColor: Colors.light.inactiveButton,
  },
  buttonConfirm: {
    backgroundColor: Colors.light.confirmButton,
  },
  input: {
    height: 130,
    width: "80%",
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
  },
  inputText: {
    textAlign: "left",
    verticalAlign: "bottom",
    fontSize: 16,
  },
  buttonText: {
    color: Colors.light.background,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
