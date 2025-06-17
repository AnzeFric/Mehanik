import { Alert, StyleSheet, View } from "react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import VehicleForm from "@/components/mechanic/library/forms/VehicleForm";
import TitleRow from "@/components/shared/TitleRow";
import { VehicleData } from "@/interfaces/vehicle";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ImageForm from "@/components/mechanic/library/forms/ImageForm";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import { useVehicle } from "@/hooks/useVehicle";
import useVehicleStore from "@/stores/useVehicleStore";

export default function EditUserVehicleScreen() {
  const { vehicle } = useLocalSearchParams();

  const { updateVehicle } = useVehicle();
  const { setShouldRefetch } = useVehicleStore();

  const vehicleData: VehicleData = useMemo(() => {
    return JSON.parse(vehicle.toString());
  }, [vehicle]);

  const [newVehicle, setNewVehicle] = useState<VehicleData>();
  const [newVehicleImage, setNewVehicleImage] = useState<string | null>();

  useEffect(() => {
    setNewVehicle(vehicleData);
    setNewVehicleImage(vehicleData.image);
  }, [vehicle]);

  const handleEditVehicle = async () => {
    if (newVehicle && newVehicleImage) {
      const finalVehicleData = {
        ...newVehicle,
        image: newVehicleImage,
      };
      const result = await updateVehicle(finalVehicleData);
      if (result) {
        setShouldRefetch(true);
      } else {
        Alert.alert(
          "Napaka",
          "Prišlo je do napake pri posodabljanju podatkov. Poskusite ponovno kasneje"
        );
      }
      router.replace("/(tabs-user)/vehicles");
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setNewVehicle(vehicleData);
        setNewVehicleImage("");
      };
    }, [])
  );

  return (
    <ThemedScrollView>
      <TitleRow
        title={`${vehicleData.brand} ${vehicleData.model}`}
        hasBackButton={true}
        style={{ paddingBottom: 20 }}
      />
      <View style={styles.container}>
        <ImageForm
          image={newVehicle?.image || ""}
          setImage={setNewVehicleImage}
        />
        <View>
          <VehicleForm vehicle={newVehicle} setVehicle={setNewVehicle} />
        </View>
        <ThemedButton
          buttonType={"small"}
          buttonText={"Uredi"}
          onPress={handleEditVehicle}
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
