import { Alert, StyleSheet, View } from "react-native";
import { useCallback, useState } from "react";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import TitleRow from "@/components/shared/TitleRow";
import { VehicleData } from "@/interfaces/vehicle";
import { router, useFocusEffect } from "expo-router";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import { useVehicle } from "@/hooks/useVehicle";
import useVehicleStore from "@/stores/useVehicleStore";

const defaultValues: VehicleData = {
  uuid: "",
  brand: "",
  model: "",
  buildYear: null,
  vin: "",
  image: null,
  description: null,
};

export default function AddUserVehicleScreen() {
  const { saveVehicle } = useVehicle();
  const { setShouldRefetch } = useVehicleStore();

  const [vehicle, setVehicle] = useState<VehicleData>(defaultValues);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);

  const handleSaveVehicle = async () => {
    const vehicleData = {
      ...vehicle,
      image: vehicleImage,
    };

    const result = await saveVehicle(vehicleData);
    if (result) {
      setShouldRefetch(true);
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri shranjevanju podatkov. Poskusite ponovno kasneje"
      );
    }
    router.replace("/(tabs-user)/vehicles");
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setVehicle(defaultValues);
      };
    }, [])
  );

  return (
    <ThemedScrollView>
      <TitleRow
        title={"Dodaj vozilo"}
        hasBackButton={true}
        style={{ paddingBottom: 20 }}
      />
      <View style={styles.container}>
        <ImageForm setImage={setVehicleImage} />
        <VehicleForm setVehicle={setVehicle} />
        <ThemedButton
          buttonType={"small"}
          buttonText={"Shrani"}
          onPress={handleSaveVehicle}
        />
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 15,
  },
});
