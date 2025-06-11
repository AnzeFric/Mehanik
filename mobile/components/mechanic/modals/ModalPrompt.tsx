import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalReject({
  isVisible,
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonCancel]}
              onPress={onCancel}
            >
              <Text style={styles.textStyle}>Prekliči</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonConfirm]}
              onPress={onConfirm}
            >
              <Text style={styles.textStyle}>Potrdi</Text>
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
  buttonConfirm: {
    backgroundColor: Colors.light.confirmButton,
  },
  textStyle: {
    color: Colors.light.background,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
  },
});
