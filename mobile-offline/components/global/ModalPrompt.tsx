import { View, Modal, StyleSheet } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedText from "@/components/global/themed/ThemedText";
import { useTranslation } from "react-i18next";

interface Props {
  isVisible: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalPrompt({
  isVisible,
  message,
  onConfirm,
  onCancel,
}: Props) {
  const { t } = useTranslation();

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
      animationType={"fade"}
    >
      <View style={styles.centeredView}>
        <ThemedView type={"primary"} style={styles.modalView}>
          <ThemedText type={"normal"} style={styles.modalText}>
            {message}
          </ThemedText>
          <View style={styles.buttonContainer}>
            <ThemedButton
              buttonType={"option-destroy"}
              buttonText={t("components.global.cancel")}
              onPress={onCancel}
            />
            <ThemedButton
              buttonType={"option"}
              buttonText={t("components.global.confirm")}
              onPress={onConfirm}
            />
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
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    padding: 35,
    borderRadius: 6,
    alignItems: "center",
    width: "75%",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingTop: 10,
    gap: 60,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
