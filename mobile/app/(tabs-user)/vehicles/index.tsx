import { useState } from "react";
import { VehicleData } from "@/interfaces/vehicle";
import Vehicle from "@/components/user/items/Vehicle";
import TitleRow from "@/components/shared/TitleRow";
import DisplayItems from "@/components/global/DisplayItems";
import ThemedView from "@/components/global/themed/ThemedView";

// TODO: Get vehicles dynamically
export default function UserVehiclesScreen() {
  const [vehicles, setVehicles] = useState<Array<VehicleData>>([]);

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
    </ThemedView>
  );
}
