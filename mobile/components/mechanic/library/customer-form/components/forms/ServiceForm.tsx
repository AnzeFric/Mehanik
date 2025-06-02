import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  View,
} from "react-native";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CustomRadioButton from "../CustomRadioButton";
import CustomCheckBox from "../CustomCheckBox";
import CustomController from "../CustomController";
import { AppStyles } from "@/constants/Styles";
import { CustomerFormData } from "@/interfaces/customer";

type CustomerInfoProps = {
  control: Control<CustomerFormData>;
  watch: UseFormWatch<CustomerFormData>;
};

export default function ServiceForm({ control, watch }: CustomerInfoProps) {
  const serviceType = watch("repair.type");
  const [serviceImages, setServiceImages] = useState<string[]>([]);

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

  return (
    <>
      <View style={styles.serviceTypeContainer}>
        <View style={styles.radioGroup}>
          <Controller
            control={control}
            name="repair.type"
            render={({ field: { onChange, value } }) => (
              <>
                <CustomRadioButton
                  name="Mali servis"
                  currentValue={value}
                  value="small"
                  onChange={() => onChange("small")}
                />
                <CustomRadioButton
                  name="Veliki servis"
                  currentValue={value}
                  value="large"
                  onChange={() => onChange("large")}
                />
                <CustomRadioButton
                  name="Drugo"
                  currentValue={value}
                  value="other"
                  onChange={() => onChange("other")}
                />
              </>
            )}
          />
        </View>
      </View>

      {(serviceType === "small" || serviceType === "large") && (
        <View style={styles.serviceItemsContainer}>
          <CustomCheckBox
            control={control}
            name={"repair.options.oilChange"}
            text={"Olje"}
          />
          <CustomCheckBox
            control={control}
            name={"repair.options.filterChange"}
            text={"Filter"}
          />
          <CustomCheckBox
            control={control}
            name={"repair.options.brakeCheck"}
            text={"Zavore"}
          />
          {serviceType === "large" && (
            <>
              <CustomCheckBox
                control={control}
                name={"repair.options.sparkPlugs"}
                text={"Svečke"}
              />
              <CustomCheckBox
                control={control}
                name={"repair.options.timing"}
                text={"Jermen/Veriga"}
              />
              <CustomCheckBox
                control={control}
                name={"repair.options.coolant"}
                text={"Hladilna"}
              />
            </>
          )}
        </View>
      )}

      {serviceType === "other" && (
        <CustomController
          control={control}
          placeholder={"Opišite izveden servis."}
          optional={false}
          name={"repair.description"}
          textStyle={[styles.textArea, { textAlignVertical: "bottom" }]}
          multiline={true}
          numberOfLines={4}
        />
      )}
      <CustomController
        control={control}
        placeholder={"Opombe za servis (ni obvezno)"}
        optional={true}
        name={"repair.note"}
        textStyle={[styles.textArea, { textAlignVertical: "bottom" }]}
        multiline={true}
        numberOfLines={3}
      />
      <CustomController
        control={control}
        placeholder={"Cena (ni obvezno)"}
        optional={true}
        name={"repair.price"}
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
  textArea: {
    height: 80,
    textAlignVertical: "top",
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
