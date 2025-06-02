import { TextInput, StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VehicleData } from "@/interfaces/customer";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";

interface Props {
  setVehicle: (vehicle: VehicleData | undefined) => void;
}

export default function VehicleForm({ setVehicle }: Props) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [buildYear, setBuildYear] = useState("");
  const [vin, setVin] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const updatedVehicle: VehicleData = {
      brand,
      model,
      buildYear: buildYear ? parseInt(buildYear) : 0,
      vin,
      description,
      image: null,
    };
    setVehicle(updatedVehicle);
  }, [brand, model, buildYear, vin, description]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setBrand("");
        setModel("");
        setBuildYear("");
        setVin("");
        setDescription("");
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
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder={"Model"}
        value={model}
        onChangeText={setModel}
        autoCapitalize={"none"}
      />
      <TextInput
        style={styles.input}
        placeholder={"Leto izdelave"}
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
        style={[styles.input, { textAlignVertical: "bottom" }]}
        placeholder={"Dodaten opis vozila (ni obvezno)"}
        value={description}
        onChangeText={setDescription}
        autoCapitalize={"characters"}
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
