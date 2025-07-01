import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import { VehicleData } from "@/interfaces/vehicle";
import ModalPrompt from "@/components/global/modals/ModalPrompt";
import { useVehicle } from "@/hooks/useVehicle";
import useVehicleStore from "@/stores/useVehicleStore";

interface Props {
  vehicle: VehicleData;
  onPress: () => void;
}

export default function Vehicle({ vehicle, onPress }: Props) {
  const { staticColors } = useAnimatedTheme();
  const { deleteVehicle } = useVehicle();
  const { setShouldRefetch } = useVehicleStore();

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const handleDelete = async () => {
    const success = await deleteVehicle(vehicle.uuid);
    setIsDeleteVisible(false);
    if (success) {
      setShouldRefetch(true);
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri brisanju vozila. Poskusite ponovno kasneje."
      );
    }
  };

  return (
    <ThemedView type={"secondary"}>
      <TouchableOpacity
        style={[
          styles.container,
          { borderLeftColor: staticColors.specialBlue },
        ]}
        onLongPress={() => setIsDeleteVisible(true)}
        onPress={onPress}
      >
        {vehicle.image ? (
          <Image source={{ uri: vehicle.image }} style={styles.image} />
        ) : (
          <Image
            source={require("@/assets/logo-main.png")}
            style={styles.image}
          />
        )}
        <View style={{ flex: 1 }}>
          <ThemedText type={"small"} bold>
            {vehicle.brand} {vehicle.model}
            {vehicle.buildYear && (
              <>
                {", "}
                {vehicle.buildYear}
              </>
            )}
          </ThemedText>
          <ThemedText type={"extraSmall"}>{vehicle.vin}</ThemedText>
          {vehicle.description && (
            <ThemedText type={"extraSmall"}>{vehicle.description}</ThemedText>
          )}
        </View>
      </TouchableOpacity>
      <ModalPrompt
        isVisible={isDeleteVisible}
        message={"Ste prepričani, da želite izbrisati vozilo?"}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    borderLeftWidth: 6,
    alignItems: "center",
    gap: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
});
