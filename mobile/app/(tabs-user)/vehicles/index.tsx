import { useCallback, useEffect, useState } from "react";
import { VehicleData } from "@/interfaces/vehicle";
import Vehicle from "@/components/user/items/Vehicle";
import TitleRow from "@/components/shared/TitleRow";
import DisplayItems from "@/components/global/DisplayItems";
import ThemedView from "@/components/global/themed/ThemedView";
import PlusButton from "@/components/global/PlusButton";
import { router, useFocusEffect } from "expo-router";
import useVehicleStore from "@/stores/useVehicleStore";
import { useVehicle } from "@/hooks/useVehicle";

export default function UserVehiclesScreen() {
  const { shouldRefetch, setShouldRefetch } = useVehicleStore();
  const { fetchVehicles } = useVehicle();
  const [vehicles, setVehicles] = useState<Array<VehicleData>>([]);

  useEffect(() => {
    setShouldRefetch(true);
  }, []);

  const vehiclesFetch = async () => {
    const fetchedVehicles = await fetchVehicles();
    setVehicles(fetchedVehicles);
  };

  useFocusEffect(
    useCallback(() => {
      if (shouldRefetch) {
        vehiclesFetch();
        setShouldRefetch(false);
      }
    }, [shouldRefetch])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow
        title={"Vozila"}
        hasBackButton={false}
        style={{ paddingBottom: 20 }}
      />
      <DisplayItems
        list={vehicles}
        renderItem={(vehicle, index) => (
          <Vehicle vehicle={vehicle} key={index} />
        )}
        emptyMessage="Nimate vnešenih vozil."
      />
      <PlusButton
        onPress={() => {
          router.push("/(tabs-user)/vehicles/vehicle/add");
        }}
      />
    </ThemedView>
  );
}
