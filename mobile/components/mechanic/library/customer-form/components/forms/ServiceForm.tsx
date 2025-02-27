import {
  Text,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  View,
} from "react-native";
import {
  Control,
  Controller,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { ServiceFormData } from "../../CustomerForm";
import { useState } from "react";
import CustomRadioButton from "../CustomRadioButton";
import CustomCheckBox from "../CustomCheckBox";
import CustomController from "../CustomController";
import { AppStyles } from "@/constants/Styles";

type CustomerInfoProps = {
  control: Control<ServiceFormData>;
  watch: UseFormWatch<ServiceFormData>;
  errors: FieldErrors<ServiceFormData>;
};

export default function UserForm({
  control,
  watch,
  errors,
}: CustomerInfoProps) {
  const serviceType = watch("serviceType");
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
            name="serviceType"
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
            name={"serviceItems.oilChange"}
            text={"Olje"}
          />
          <CustomCheckBox
            control={control}
            name={"serviceItems.filterChange"}
            text={"Filter"}
          />
          <CustomCheckBox
            control={control}
            name={"serviceItems.brakeCheck"}
            text={"Zavore"}
          />
          {serviceType === "large" && (
            <>
              <CustomCheckBox
                control={control}
                name={"serviceItems.sparkPlugs"}
                text={"Svečke"}
              />
              <CustomCheckBox
                control={control}
                name={"serviceItems.timing"}
                text={"Jermen/Veriga"}
              />
              <CustomCheckBox
                control={control}
                name={"serviceItems.coolant"}
                text={"Hladilna"}
              />
            </>
          )}
        </View>
      )}

      {serviceType === "other" && (
        <CustomController
          control={control}
          error={errors.customServiceDescription}
          placeholder={"Opišite izveden servis."}
          optional={false}
          name={"customServiceDescription"}
          textStyle={[styles.textArea, { textAlignVertical: "bottom" }]}
          multiline={true}
          numberOfLines={4}
        />
      )}
      <CustomController
        control={control}
        placeholder={"Opombe za servis (ni obvezno)"}
        optional={true}
        name={"serviceNotes"}
        textStyle={[styles.textArea, { textAlignVertical: "bottom" }]}
        multiline={true}
        numberOfLines={3}
      />
      <CustomController
        control={control}
        placeholder={"Cena (ni obvezno)"}
        optional={true}
        name={"servicePrice"}
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
