import { Text, StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";
import CustomCheckBox from "./components/CustomCheckBox";
import { RepairData, RepairOptions } from "@/interfaces/repair";
import { formatDate } from "@/constants/util";
import { useFocusEffect } from "expo-router";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedDatePicker from "@/components/global/themed/ThemedDatePicker";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  repair?: RepairData | null;
  setRepair: (repairData: RepairData | null) => void;
}

const defaultOptions = {
  oilChange: false,
  filterChange: false,
  brakeCheck: false,
  tireRotation: false,
  fluidCheck: false,
  batteryCheck: false,
  sparkPlugs: false,
  airFilter: false,
  cabinFilter: false,
  suspension: false,
  timing: false,
  coolant: false,
};

export default function RepairForm({ repair, setRepair }: Props) {
  const { staticColors } = useAnimatedTheme();

  const [type, setType] = useState<"small" | "large" | "other">("small");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [repairImages, setRepairImages] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState<RepairOptions>(defaultOptions);

  const pickRepairImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.3,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // Convert to base64 for database storage
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Add data URL prefix for proper format
        const newImage = `data:image/jpeg;base64,${base64}`;
        handleImageAdd(newImage);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  useEffect(() => {
    if (repair) {
      setType(repair.type);
      setDescription(repair.description || "");
      setPrice(repair.price?.toString() || "");
      setNote(repair.note || "");
      setDate(repair.date || new Date());
      setRepairImages(repair.images || []);
      setOptions(repair.options || defaultOptions);
    }
  }, [repair]);

  // Helper function to update parent
  const updateParent = useCallback(
    (updates: Partial<RepairData>) => {
      const repairData: RepairData = {
        uuid: repair?.uuid || "",
        type: type,
        price: parseFloat(price) || null,
        date: date,
        options: options,
        description: description || null,
        images: repairImages || null,
        note: note || null,
        ...updates,
      };
      setRepair(repairData);
    },
    [
      repair,
      type,
      description,
      price,
      note,
      repairImages,
      date,
      options,
      setRepair,
    ]
  );

  const handleDescriptionChange = useCallback(
    (value: string) => {
      setDescription(value);
      updateParent({ description: value });
    },
    [updateParent]
  );

  const handleNoteChange = useCallback(
    (value: string) => {
      setNote(value);
      updateParent({ note: value });
    },
    [updateParent]
  );

  const handlePriceChange = useCallback(
    (value: string) => {
      setPrice(value);
      updateParent({ price: parseFloat(value) });
    },
    [updateParent]
  );

  const handleDateChange = useCallback(
    (value: Date) => {
      setDate(value);
      setShowDatePicker(false);
      updateParent({ date: value });
    },
    [updateParent]
  );

  const handleTypeChange = useCallback(
    (newType: "small" | "large" | "other") => {
      setType(newType);
      setOptions(defaultOptions);
      setDescription("");
      updateParent({ type: newType, options: defaultOptions, description: "" });
    },
    [updateParent]
  );

  const handleChange = useCallback(
    (key: keyof typeof options, value: boolean) => {
      setOptions((prev) => {
        const newOptions = { ...prev, [key]: value };
        updateParent({ options: newOptions });
        return newOptions;
      });
    },
    [updateParent]
  );

  const handleImageAdd = useCallback(
    (base64WithPrefix: string) => {
      setRepairImages((prev) => {
        const newImages = [...prev, base64WithPrefix];
        updateParent({ images: newImages });
        return newImages;
      });
    },
    [updateParent]
  );

  const handleImageRemove = useCallback(
    (index: number) => {
      setRepairImages((prev) => {
        const newImages = [...prev];
        newImages.splice(index, 1);
        updateParent({ images: newImages });
        return newImages;
      });
    },
    [updateParent]
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!repair) {
          setType("small");
          setDescription("");
          setPrice("");
          setNote("");
          setDate(new Date());
          setRepairImages([]);
          setOptions(defaultOptions);
        }
      };
    }, [repair])
  );

  return (
    <>
      <View style={styles.typeSelectContainer}>
        <ThemedButton
          buttonType={"option"}
          buttonText={"mali"}
          onPress={() => handleTypeChange("small")}
          selected={type === "small"}
        />
        <ThemedButton
          buttonType={"option"}
          buttonText={"veliki"}
          onPress={() => handleTypeChange("large")}
          selected={type === "large"}
        />
        <ThemedButton
          buttonType={"option"}
          buttonText={"drugo"}
          onPress={() => handleTypeChange("other")}
          selected={type === "other"}
        />
      </View>

      {(type === "small" || type === "large") && (
        <View style={styles.repairItemsContainer}>
          <CustomCheckBox
            text="Olje"
            value={options.oilChange}
            onChange={(val) => handleChange("oilChange", val)}
          />
          <CustomCheckBox
            text="Oljni filter"
            value={options.filterChange}
            onChange={(val) => handleChange("filterChange", val)}
          />
          <CustomCheckBox
            text="Zračni filter"
            value={options.airFilter}
            onChange={(val) => handleChange("airFilter", val)}
          />
          <CustomCheckBox
            text="Kabinski filter"
            value={options.cabinFilter}
            onChange={(val) => handleChange("cabinFilter", val)}
          />
          <CustomCheckBox
            text="Preverjanje tekočin"
            value={options.fluidCheck}
            onChange={(val) => handleChange("fluidCheck", val)}
          />
          <CustomCheckBox
            text="Preverjanje akumulatorja"
            value={options.batteryCheck}
            onChange={(val) => handleChange("batteryCheck", val)}
          />
          <CustomCheckBox
            text="Zavore"
            value={options.brakeCheck}
            onChange={(val) => handleChange("brakeCheck", val)}
          />
          <CustomCheckBox
            text="Dolitje hladilne tekočine"
            value={options.coolant}
            onChange={(val) => handleChange("coolant", val)}
          />
          {type === "large" && (
            <>
              <CustomCheckBox
                text="Svečke"
                value={options.sparkPlugs}
                onChange={(val) => handleChange("sparkPlugs", val)}
              />
              <CustomCheckBox
                text="Jermen/Veriga"
                value={options.timing}
                onChange={(val) => handleChange("timing", val)}
              />

              <CustomCheckBox
                text="Centriranje gum"
                value={options.tireRotation}
                onChange={(val) => handleChange("tireRotation", val)}
              />
              <CustomCheckBox
                text="Vzmetje"
                value={options.suspension}
                onChange={(val) => handleChange("suspension", val)}
              />
            </>
          )}
        </View>
      )}

      {type === "other" && (
        <ThemedTextInput
          style={[styles.input, styles.textArea]}
          placeholder={"Opišite izveden servis"}
          value={description}
          onChangeText={handleDescriptionChange}
          autoCapitalize={"sentences"}
          multiline={true}
          numberOfLines={4}
        />
      )}
      <ThemedTextInput
        style={styles.input}
        placeholder={"Opombe za servis (ni obvezno)"}
        value={note}
        onChangeText={handleNoteChange}
        autoCapitalize={"sentences"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={"Cena (ni obvezno)"}
        value={price}
        onChangeText={handlePriceChange}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />

      <View style={styles.dateContainer}>
        <ThemedText type={"small"}>Datum servisa:</ThemedText>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText type={"small"}>{formatDate(date)}</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText type={"small"}>Slike servisa (ni obvezno):</ThemedText>
      <View style={styles.repairImagesContainer}>
        {repairImages.map((uri, index) => (
          <View key={index} style={styles.repairImageContainer}>
            <Image source={{ uri }} style={styles.repairImage} />
            <TouchableOpacity
              style={[
                styles.removeImageButton,
                { backgroundColor: staticColors.destroyButton },
              ]}
              onPress={() => handleImageRemove(index)}
            >
              <Text style={{ color: staticColors.buttonText }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        {repairImages.length < 6 && (
          <TouchableOpacity
            style={[
              styles.addImageButton,
              { borderColor: staticColors.border },
            ]}
            onPress={pickRepairImage}
          >
            <ThemedIcon name={"image-outline"} size={20} />
          </TouchableOpacity>
        )}
      </View>

      <ThemedDatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={handleDateChange}
        onCancel={() => setShowDatePicker(false)}
        mode="date"
        locale="sl" // Slovenian locale
        title="Izberi datum"
        confirmText="Potrdi"
        cancelText="Prekliči"
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
  textArea: {
    height: 80,
    textAlignVertical: "bottom",
    paddingTop: 8,
  },
  typeSelectContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  repairItemsContainer: {
    marginBottom: 15,
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateButton: {
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    justifyContent: "center",
    paddingVertical: 8,
    marginTop: 5,
  },
  repairImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  repairImageContainer: {
    width: 100,
    height: 100,
    margin: 5,
    position: "relative",
  },
  repairImage: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  removeImageButton: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
