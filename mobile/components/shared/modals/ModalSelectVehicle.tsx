import { View, Modal, StyleSheet, ScrollView } from "react-native";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedView from "@/components/global/themed/ThemedView";
import { VehicleData } from "@/interfaces/vehicle";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import Vehicle from "@/components/user/items/Vehicle";

interface Props {
  vehicles: Array<VehicleData>;
  isVisible: boolean;
  setSelectedVehicle: (vehicle: VehicleData) => void;
  setIsVisible: (isVisible: boolean) => void;
}

export default function ModalSelectVehicle({
  vehicles,
  isVisible,
  setSelectedVehicle,
  setIsVisible,
}: Props) {
  const onCancel = () => {
    setIsVisible(false);
  };

  const handlePress = (vehicle: VehicleData) => {
    setSelectedVehicle(vehicle);
    setIsVisible(false);
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onCancel}>
      <View style={styles.centeredView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          <ThemedView type={"primary"} style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <ThemedText type={"normal"} bold style={styles.title}>
                Izberite vozilo
              </ThemedText>
              <ThemedIcon
                name={"close"}
                size={30}
                onPress={onCancel}
                style={{ alignSelf: "flex-end" }}
              />
            </View>
            <View style={styles.sectionContainer}>
              {vehicles.map((vehicle, index) => (
                <Vehicle
                  vehicle={vehicle}
                  onPress={() => handlePress(vehicle)}
                  key={index}
                />
              ))}
            </View>
          </ThemedView>
        </ScrollView>
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
  scrollContainer: {
    width: "85%",
    maxHeight: "80%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
    borderRadius: 6,
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
