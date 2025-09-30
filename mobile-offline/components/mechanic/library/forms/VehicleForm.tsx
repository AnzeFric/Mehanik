import { StyleSheet } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { VehicleData } from "@/interfaces/vehicle";
import { Colors } from "@/constants/Colors";
import { useFocusEffect } from "expo-router";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import { useTranslation } from "react-i18next";

interface Props {
  vehicle?: VehicleData;
  setVehicle: (vehicle: VehicleData) => void;
}

export default function VehicleForm({ vehicle, setVehicle }: Props) {
  const { t } = useTranslation();

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vin, setVin] = useState<string | null>("");
  const [buildYear, setBuildYear] = useState<string | null>("");
  const [description, setDescription] = useState<string | null>("");

  // Only populate form fields when vehicle prop changes
  useEffect(() => {
    if (vehicle) {
      setBrand(vehicle.brand);
      setModel(vehicle.model);
      setVin(vehicle.vin ? vehicle.vin : null);
      setBuildYear(vehicle.buildYear ? vehicle.buildYear.toString() : null);
      setDescription(vehicle.description);
    }
  }, [vehicle]);

  // Helper function to update parent
  const updateParent = useCallback(
    (updates: Partial<VehicleData>) => {
      const vehicleData: VehicleData = {
        brand: brand,
        model: model,
        buildYear: buildYear ? parseInt(buildYear, 10) : null,
        vin: vin,
        description: description,
        image: vehicle?.image || null,
        customerId: vehicle?.customerId || "",
        ...updates, // Apply the specific update
      };
      setVehicle(vehicleData);
    },
    [vehicle, brand, model, buildYear, vin, description, setVehicle]
  );

  const handleBrandChange = useCallback(
    (value: string) => {
      setBrand(value);
      updateParent({ brand: value });
    },
    [updateParent]
  );

  const handleModelChange = useCallback(
    (value: string) => {
      setModel(value);
      updateParent({ model: value });
    },
    [updateParent]
  );

  const handleVinChange = useCallback(
    (value: string) => {
      setVin(value);
      updateParent({ vin: value });
    },
    [updateParent]
  );

  const handleBuildYearChange = useCallback(
    (value: string) => {
      setBuildYear(value);
      updateParent({ buildYear: value ? parseInt(value, 10) : null });
    },
    [updateParent]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      setDescription(value);
      updateParent({ description: value });
    },
    [updateParent]
  );

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
    }, [vehicle])
  );

  return (
    <>
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.vehicleBrand")}
        value={brand}
        onChangeText={handleBrandChange}
        autoCapitalize={"words"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.vehicleModel")}
        value={model}
        onChangeText={handleModelChange}
        autoCapitalize={"words"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.vehicleYear")}
        value={buildYear || ""}
        onChangeText={handleBuildYearChange}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.vehicleVin")}
        value={vin || ""}
        onChangeText={handleVinChange}
        autoCapitalize={"characters"}
      />
      <ThemedTextInput
        style={[styles.input, { textAlignVertical: "top" }]}
        placeholder={t("components.mechanic.forms.vehicleDescription")}
        value={description || ""}
        onChangeText={handleDescriptionChange}
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
