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
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalTime({
  isVisible,
  title,
  onConfirm,
  onCancel,
}: Props) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [screenNumber, setScreenNumber] = useState<number>(0);

  const handlePreviousPress = () => {
    if (screenNumber > 0) {
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

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CloseIcon
            color={Colors.light.activeIcon}
            height={28}
            width={28}
            onPress={onCancel}
          />
          <Text style={AppStyles.title}>{title}</Text>
          {screenNumber === 0 && (
            <View>
              <Text style={AppStyles.text}>Izberite datum</Text>
              <DatePicker
                date={date}
                onDateChange={(newDate: Date) => {
                  setDate(newDate);
                }}
                mode="date"
                is24hourSource="locale"
              />
            </View>
          )}

          {screenNumber === 1 && (
            <View>
              <Text style={AppStyles.text}>Izberite čas</Text>
              <DatePicker
                date={time}
                onDateChange={(newTime: Date) => {
                  setTime(newTime);
                }}
                mode={"time"}
                is24hourSource={"locale"}
              />
            </View>
          )}

          {screenNumber === 2 && (
            <View>
              <Text style={AppStyles.text}>Dodajte opis</Text>
              <TextInput
                style={AppStyles.textInput}
                placeholder="Dodatno sporočilo stranki"
                value={description}
                onChangeText={setDescription}
                numberOfLines={4}
                multiline={true}
              />
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                screenNumber === 0 ? styles.butonInactive : styles.buttonCancel,
              ]}
              onPress={handlePreviousPress}
            >
              <Text style={styles.textStyle}>Nazaj</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={handleNextPress}
            >
              <Text style={styles.textStyle}>
                {screenNumber === 2 ? "Potrdi" : "Naprej"}
              </Text>
            </TouchableOpacity>
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
    padding: 35,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    alignItems: "center",
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
  textStyle: {
    color: Colors.light.background,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Jaldi-Regular",
    fontSize: 20,
    lineHeight: 24,
  },
});
