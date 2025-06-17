import { View, Modal, StyleSheet } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedIcon from "@/components/global/themed/ThemedIcon";

export interface SectionData {
  title: string;
  text: Array<string>;
}

interface Props {
  isVisible: boolean;
  modalTitle: string;
  sections: Array<SectionData>;
  onCancel: () => void;
}

export default function ModalInfo({
  isVisible,
  modalTitle,
  sections,
  onCancel,
}: Props) {
  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <ThemedView type={"primary"} style={styles.modalView}>
          <View style={{ flexDirection: "row" }}>
            <ThemedText type={"normal"} bold style={styles.title}>
              {modalTitle}
            </ThemedText>
            <ThemedIcon
              name={"close"}
              size={30}
              onPress={onCancel}
              style={{ alignSelf: "flex-end" }}
            />
          </View>
          <View style={styles.sectionContainer}>
            {sections.map((section, index) => (
              <ThemedView
                type={"secondary"}
                style={styles.sectionItem}
                key={index}
              >
                <ThemedText type={"small"} bold>
                  {section.title}
                </ThemedText>
                <View>
                  {section.text.map((text, index) => (
                    <ThemedText type={"extraSmall"} key={index}>
                      {text}
                    </ThemedText>
                  ))}
                </View>
              </ThemedView>
            ))}
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
    borderRadius: 6,
    width: "75%",
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
  },
  sectionContainer: {
    padding: 10,
    gap: 15,
  },
  sectionItem: {
    gap: 3,
    textAlign: "left",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
