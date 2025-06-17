import { StyleSheet, View } from "react-native";
import { useState } from "react";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import { VehicleData } from "@/interfaces/vehicle";
import { Vehicle } from "@/components/user/items/Vehicle";
import TitleRow from "@/components/shared/TitleRow";

// TODO: Get vehicles dynamically
export default function UserVehiclesScreen() {
  const [vehicles, setVehicles] = useState<Array<VehicleData>>([]);

  return (
    <ThemedScrollView>
      <TitleRow title={"Vozila"} hasBackButton={false} />
      <View style={styles.container}>
        {vehicles.map((vehicle, index) => (
          <Vehicle vehicle={vehicle} key={index} />
        ))}
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
});
