import { useState } from "react";
import { VehicleData } from "@/interfaces/vehicle";
import Vehicle from "@/components/user/items/Vehicle";
import TitleRow from "@/components/shared/TitleRow";
import DisplayItems from "@/components/global/DisplayItems";
import ThemedView from "@/components/global/themed/ThemedView";
import PlusButton from "@/components/global/PlusButton";
import { router } from "expo-router";

const fakeVehice: VehicleData = {
  uuid: "123",
  brand: "123",
  model: "123",
  buildYear: null,
  vin: "123",
  image: null,
  description: null,
};

// TODO: Get vehicles dynamically
export default function UserVehiclesScreen() {
  const [vehicles, setVehicles] = useState<Array<VehicleData>>([fakeVehice]);

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
