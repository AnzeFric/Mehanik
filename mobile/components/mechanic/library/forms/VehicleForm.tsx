import { TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VehicleData } from "@/interfaces/customer";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

interface Props {
  vehicle?: VehicleData;
  setVehicle: (vehicle: VehicleData | undefined) => void;
}

export default function VehicleForm({ vehicle, setVehicle }: Props) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [vin, setVin] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand || "");
      setModel(vehicle.model || "");
      setBuildYear(vehicle.buildYear?.toString() || "");
      setVin(vehicle.vin || "");
      setDescription(vehicle.description || "");
    }
  }, [vehicle]);

  // Update parent whenever form data changes
  useEffect(() => {
    if (brand || model || vin) {
      const vehicleData: VehicleData = {
        brand,
        model,
        buildYear: buildYear ? parseInt(buildYear, 10) : null,
        vin,
        description: description || null,
        image: vehicle?.image || null, // Preserve existing image
      };
      setVehicle(vehicleData);
    }
  }, [brand, model, buildYear, vin, description]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setBrand(vehicle?.brand || "");
        setModel(vehicle?.model || "");
        setBuildYear(vehicle?.buildYear?.toString() || "");
        setVin(vehicle?.vin || "");
        setDescription(vehicle?.description || "");
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
        value={buildYear}
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
        value={description}
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
