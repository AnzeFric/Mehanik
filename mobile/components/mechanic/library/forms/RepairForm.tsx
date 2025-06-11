import {
  Text,
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";
import CustomRadioButton from "./components/CustomRadioButton";
import CustomCheckBox from "./components/CustomCheckBox";
import { AppStyles } from "@/constants/Styles";
import { RepairData, RepairOptions } from "@/interfaces/repair";
import DatePicker from "react-native-date-picker";
import { formatDate } from "@/constants/util";
import { useFocusEffect } from "expo-router";

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
  const [type, setType] = useState<"small" | "large" | "other">("small");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [repairImages, setRepairImages] = useState<string[]>([]);
  const [date, setDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [options, setOptions] = useState<RepairOptions>(defaultOptions);

  const handleChange = (key: keyof typeof options, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const removeRepairImage = (index: number) => {
    const newImages = [...repairImages];
    newImages.splice(index, 1);
    setRepairImages(newImages);
  };

  const pickRepairImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      // Convert to base64 for database storage
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Add data URL prefix for proper format
        const base64WithPrefix = `data:image/jpeg;base64,${base64}`;
        setRepairImages([...repairImages, base64WithPrefix]);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  const handleDateSelected = (selectedDate: Date) => {
    setDate(selectedDate);
    setShowDatePicker(false);
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

  // Update parent whenever form data changes
  useEffect(() => {
    if (type === "other") {
      var repairData: RepairData = {
        uuid: repair?.uuid || "",
        type: type,
        options: defaultOptions,
        description: description,
        price: parseFloat(price) || null,
        note: note,
        date: date,
        images: repairImages,
      };
    } else {
      var repairData: RepairData = {
        uuid: repair?.uuid || "",
        type: type,
        options: options,
        description: "",
        price: parseFloat(price) || null,
        note: note,
        date: date,
        images: repairImages,
      };
    }
    setRepair(repairData);
  }, [type, description, note, price, date, repairImages, options]);

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
      <View style={styles.repairTypeContainer}>
        <View style={styles.radioGroup}>
          <>
            <CustomRadioButton
              name="Mali servis"
              currentValue={type}
              value="small"
              onChange={() => setType("small")}
            />
            <CustomRadioButton
              name="Veliki servis"
              currentValue={type}
              value="large"
              onChange={() => setType("large")}
            />
            <CustomRadioButton
              name="Drugo"
              currentValue={type}
              value="other"
              onChange={() => setType("other")}
            />
          </>
        </View>
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
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder={"Opišite izveden servis"}
          value={description}
          onChangeText={setDescription}
          autoCapitalize={"sentences"}
          multiline={true}
          numberOfLines={4}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder={"Opombe za servis (ni obvezno)"}
        value={note}
        onChangeText={setNote}
        autoCapitalize={"sentences"}
      />
      <TextInput
        style={styles.input}
        placeholder={"Cena (ni obvezno)"}
        value={price}
        onChangeText={setPrice}
        autoCapitalize={"none"}
        keyboardType={"numeric"}
      />

      <View style={styles.dateContainer}>
        <Text style={AppStyles.text}>Datum servisa:</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateButtonText}>{formatDate(date)}</Text>
        </TouchableOpacity>
      </View>

      <Text style={AppStyles.text}>Slike servisa (ni obvezno):</Text>
      <View style={styles.repairImagesContainer}>
        {repairImages.map((uri, index) => (
          <View key={index} style={styles.repairImageContainer}>
            <Image source={{ uri }} style={styles.repairImage} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeRepairImage(index)}
            >
              <Text style={styles.removeImageText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        {repairImages.length < 6 && (
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={pickRepairImage}
          >
            <CameraIcon height={20} width={20} />
          </TouchableOpacity>
        )}
      </View>

      <DatePicker
        modal
        open={showDatePicker}
        date={date}
        onConfirm={handleDateSelected}
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
  repairTypeContainer: {
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  dateButtonText: {
    fontSize: 16,
    color: Colors.light.primaryText,
  },
  repairImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
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
    backgroundColor: Colors.light.cancelButton,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageText: {
    color: "white",
    fontWeight: "bold",
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 5,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
});
