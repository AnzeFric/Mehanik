import { TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VehicleData } from "@/interfaces/vehicle";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

interface Props {
  vehicle?: VehicleData;
  setVehicle: (vehicle: VehicleData) => void;
}

export default function VehicleForm({ vehicle, setVehicle }: Props) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [buildYear, setBuildYear] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");

  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand);
      setModel(vehicle.model);
      setVin(vehicle.vin);
      setBuildYear(vehicle.buildYear ? vehicle.buildYear.toString() : null);
      setDescription(vehicle.description);
    }
  }, [vehicle]);

  // Update parent whenever form data changes
  useEffect(() => {
    if (brand || model || vin || buildYear || description) {
      const vehicleData: VehicleData = {
        uuid: vehicle?.uuid || "",
        brand: brand,
        model: model,
        buildYear: buildYear ? parseInt(buildYear, 10) : null,
        vin: vin,
        description: description,
        image: vehicle?.image || null,
      };
      setVehicle(vehicleData);
    }
  }, [brand, model, buildYear, vin, description]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!vehicle) {
          setBrand("");
          setModel("");
          setVin("");
          setBuildYear("");
          setDescription("");
        }
      };
    }, [])
  );

  return (
    <>
      <TextInput
        style={styles.input}
        placeholder={"Znamka"}
        value={brand}
        onChangeText={setBrand}
        autoCapitalize={"words"}
      />
      <TextInput
        style={styles.input}
        placeholder={"Model"}
        value={model}
        onChangeText={setModel}
        autoCapitalize={"words"}
      />
      <TextInput
        style={styles.input}
        placeholder={"Leto izdelave (ni obvezno)"}
        value={buildYear || ""}
        onChangeText={setBuildYear}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />
      <TextInput
        style={styles.input}
        placeholder={"VIN"}
        value={vin}
        onChangeText={setVin}
        autoCapitalize={"characters"}
      />
      <TextInput
        style={[styles.input, { textAlignVertical: "top" }]}
        placeholder={"Dodaten opis vozila (ni obvezno)"}
        value={description || ""}
        onChangeText={setDescription}
        autoCapitalize={"sentences"}
        multiline={true}
        numberOfLines={3}
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
});
