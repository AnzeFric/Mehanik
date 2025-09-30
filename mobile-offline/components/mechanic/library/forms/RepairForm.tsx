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
import { useTranslation } from "react-i18next";

interface Props {
  repair?: RepairData;
  setRepair: (repairData: RepairData) => void;
}

const defaultOptions = {
  oilChange: false,
  filterChange: false,
  airFilter: false,
  cabinFilter: false,
  frontBrakes: false,
  backBrakes: false,
  batteryCheck: false,
  brakeFluid: false,

  // large
  coolant: false,
  sparkPlugs: false,
  outerTiming: false,
  outerTimingComplete: false,
  timingChain: false,
  transmissionFluid: false,
  transmissionFilter: false,
  gearFluid: false,
  waterPump: false,
};

export default function RepairForm({ repair, setRepair }: Props) {
  const { staticColors } = useAnimatedTheme();

  const { t } = useTranslation();

  const [type, setType] = useState<"small" | "large" | "other">("small");
  const [description, setDescription] = useState("");
  const [kilometers, setKilometers] = useState("");
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

  // Initialize form data when repair prop changes
  useEffect(() => {
    if (repair) {
      setType(repair.type);
      setDescription(repair.description || "");
      setKilometers(repair.kilometers?.toString() || "");
      setPrice(repair.price?.toString() || "");
      setNote(repair.note || "");
      setDate(repair.repairDate || new Date());
      setRepairImages(repair.images || []);
      setOptions(repair.options || defaultOptions);
    }
  }, [repair]);

  // Update parent whenever form data changes
  useEffect(() => {
    const repairData: RepairData = {
      uuid: repair?.uuid || "",
      type: type,
      kilometers: parseFloat(kilometers) || null,
      price: parseFloat(price) || null,
      repairDate: date,
      options: options,
      description: description || null,
      images: repairImages.length > 0 ? repairImages : [],
      note: note || null,
      customerId: repair?.customerId || "",
    };
    setRepair(repairData);
  }, [
    type,
    description,
    kilometers,
    price,
    note,
    repairImages,
    date,
    options,
    repair?.uuid,
    setRepair,
  ]);

  const handleDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const handleNoteChange = useCallback((value: string) => {
    setNote(value);
  }, []);

  const handleKilometersChange = useCallback((value: string) => {
    setKilometers(value);
  }, []);

  const handlePriceChange = useCallback((value: string) => {
    setPrice(value);
  }, []);

  const handleDateChange = useCallback((value: Date) => {
    setDate(value);
    setShowDatePicker(false);
  }, []);

  const handleTypeChange = useCallback(
    (newType: "small" | "large" | "other") => {
      setType(newType);
      setOptions(defaultOptions);
      setDescription("");
    },
    []
  );

  const handleChange = useCallback(
    (key: keyof typeof options, value: boolean) => {
      setOptions((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handleImageAdd = useCallback((base64WithPrefix: string) => {
    setRepairImages((prev) => [...prev, base64WithPrefix]);
  }, []);

  const handleImageRemove = useCallback((index: number) => {
    setRepairImages((prev) => {
      const newImages = [...prev];
      newImages.splice(index, 1);
      return newImages;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!repair) {
          setType("small");
          setDescription("");
          setKilometers("");
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
          buttonText={t("components.mechanic.forms.smallService")}
          onPress={() => handleTypeChange("small")}
          selected={type === "small"}
        />
        <ThemedButton
          buttonType={"option"}
          buttonText={t("components.mechanic.forms.largeService")}
          onPress={() => handleTypeChange("large")}
          selected={type === "large"}
        />
        <ThemedButton
          buttonType={"option"}
          buttonText={t("components.mechanic.forms.otherService")}
          onPress={() => handleTypeChange("other")}
          selected={type === "other"}
        />
      </View>
      {(type === "small" || type === "large") && (
        <View style={styles.repairItemsContainer}>
          <CustomCheckBox
            text={t("components.mechanic.forms.oilChange")}
            value={options.oilChange}
            onChange={(val) => handleChange("oilChange", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.filterChange")}
            value={options.filterChange}
            onChange={(val) => handleChange("filterChange", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.airFilter")}
            value={options.airFilter}
            onChange={(val) => handleChange("airFilter", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.cabinFilter")}
            value={options.cabinFilter}
            onChange={(val) => handleChange("cabinFilter", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.frontBrakes")}
            value={options.frontBrakes}
            onChange={(val) => handleChange("frontBrakes", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.backBrakes")}
            value={options.backBrakes}
            onChange={(val) => handleChange("backBrakes", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.batteryCheck")}
            value={options.batteryCheck}
            onChange={(val) => handleChange("batteryCheck", val)}
          />
          <CustomCheckBox
            text={t("components.mechanic.forms.brakeFluid")}
            value={options.brakeFluid}
            onChange={(val) => handleChange("brakeFluid", val)}
          />
          {type === "large" && (
            <>
              <CustomCheckBox
                text={t("components.mechanic.forms.coolant")}
                value={options.coolant}
                onChange={(val) => handleChange("coolant", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.sparkPlugs")}
                value={options.sparkPlugs}
                onChange={(val) => handleChange("sparkPlugs", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.outerTiming")}
                value={options.outerTiming}
                onChange={(val) => handleChange("outerTiming", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.outerTimingComplete")}
                value={options.outerTimingComplete}
                onChange={(val) => handleChange("outerTimingComplete", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.timingChain")}
                value={options.timingChain}
                onChange={(val) => handleChange("timingChain", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.transmissionFluid")}
                value={options.transmissionFluid}
                onChange={(val) => handleChange("transmissionFluid", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.transmissionFilter")}
                value={options.transmissionFilter}
                onChange={(val) => handleChange("transmissionFilter", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.gearFluid")}
                value={options.gearFluid}
                onChange={(val) => handleChange("gearFluid", val)}
              />
              <CustomCheckBox
                text={t("components.mechanic.forms.waterPump")}
                value={options.waterPump}
                onChange={(val) => handleChange("waterPump", val)}
              />
            </>
          )}
        </View>
      )}

      {type === "other" && (
        <ThemedTextInput
          style={[styles.input, styles.textArea]}
          placeholder={t("components.mechanic.forms.repairDescription")}
          value={description}
          onChangeText={handleDescriptionChange}
          autoCapitalize={"sentences"}
          multiline={true}
          numberOfLines={4}
        />
      )}
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.repairNote")}
        value={note}
        onChangeText={handleNoteChange}
        autoCapitalize={"sentences"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.repairKilometers")}
        value={kilometers}
        onChangeText={handleKilometersChange}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />
      <ThemedTextInput
        style={styles.input}
        placeholder={t("components.mechanic.forms.repairPrice")}
        value={price}
        onChangeText={handlePriceChange}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />

      <View style={styles.dateContainer}>
        <ThemedText type={"small"}>
          {t("components.mechanic.forms.repairDateLabel")}
        </ThemedText>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <ThemedText type={"small"}>{formatDate(date)}</ThemedText>
        </TouchableOpacity>
      </View>

      <ThemedText type={"small"}>
        {t("components.mechanic.forms.repairImagesLabel")}
      </ThemedText>
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
