import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  View,
  TextInput,
} from "react-native";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useState } from "react";
import CustomRadioButton from "../CustomRadioButton";
import CustomCheckBox from "../CustomCheckBox";
import { AppStyles } from "@/constants/Styles";
import { RepairData, RepairOptions } from "@/interfaces/repair";
import { useFocusEffect } from "expo-router";

interface Props {
  setRepair: (repairData: RepairData | null) => void;
}

export default function RepairForm({ setRepair }: Props) {
  const [type, setType] = useState<"small" | "large" | "other">("small");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [note, setNote] = useState("");
  const [serviceImages, setServiceImages] = useState<string[]>([]);
  const [options, setOptions] = useState<RepairOptions>({
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
  });

  const handleChange = (key: keyof typeof options, value: boolean) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const removeServiceImage = (index: number) => {
    const newImages = [...serviceImages];
    newImages.splice(index, 1);
    setServiceImages(newImages);
  };

  const pickServiceImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setServiceImages([...serviceImages, result.assets[0].uri]);
    }
  };

  useEffect(() => {
    const updatedRepair: RepairData = {
      type,
      description,
      price: parseInt(price),
      note,
      images: serviceImages,
      options,
      date: new Date(),
    };
    setRepair(updatedRepair);
  }, [type, description, price, note, serviceImages, options]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setType("small");
        setDescription("");
        setPrice("");
        setNote("");
        setServiceImages([]);
        setOptions({
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
        });
      };
    }, [])
  );

  return (
    <>
      <View style={styles.serviceTypeContainer}>
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
        <View style={styles.serviceItemsContainer}>
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
            value={options.filterChange}
            onChange={(val) => handleChange("airFilter", val)}
          />
          <CustomCheckBox
            text="Kabinski filter"
            value={options.filterChange}
            onChange={(val) => handleChange("cabinFilter", val)}
          />
          <CustomCheckBox
            text="Preverjanje tekočin"
            value={options.filterChange}
            onChange={(val) => handleChange("fluidCheck", val)}
          />
          <CustomCheckBox
            text="Preverjanje akumulatorja"
            value={options.filterChange}
            onChange={(val) => handleChange("batteryCheck", val)}
          />
          <CustomCheckBox
            text="Zavore"
            value={options.brakeCheck}
            onChange={(val) => handleChange("brakeCheck", val)}
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
                text="Hladilna tekočina"
                value={options.coolant}
                onChange={(val) => handleChange("coolant", val)}
              />
              <CustomCheckBox
                text="Centriranje gum"
                value={options.coolant}
                onChange={(val) => handleChange("tireRotation", val)}
              />
              <CustomCheckBox
                text="Vzmetje"
                value={options.coolant}
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

      <Text style={AppStyles.text}>Slike servisa (ni obvezno):</Text>
      <View style={styles.serviceImagesContainer}>
        {serviceImages.map((uri, index) => (
          <View key={index} style={styles.serviceImageContainer}>
            <Image source={{ uri }} style={styles.serviceImage} />
            <TouchableHighlight
              style={styles.removeImageButton}
              underlayColor={Colors.light.underlayColor}
              onPress={() => removeServiceImage(index)}
            >
              <Text style={styles.removeImageText}>X</Text>
            </TouchableHighlight>
          </View>
        ))}
        <TouchableHighlight
          style={styles.addImageButton}
          underlayColor={Colors.light.underlayColor}
          onPress={pickServiceImage}
        >
          <CameraIcon height={20} width={20} />
        </TouchableHighlight>
      </View>
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
  serviceTypeContainer: {
    marginBottom: 15,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  serviceItemsContainer: {
    marginBottom: 15,
  },
  serviceImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  serviceImageContainer: {
    width: 100,
    height: 100,
    margin: 5,
    position: "relative",
  },
  serviceImage: {
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
