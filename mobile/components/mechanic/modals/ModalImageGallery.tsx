import { View, Modal, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

interface Props {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalImageGallery({
  isVisible,
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}></View>
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
});
