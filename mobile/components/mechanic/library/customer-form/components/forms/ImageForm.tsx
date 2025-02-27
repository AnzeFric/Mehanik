import { TouchableHighlight, Image, StyleSheet } from "react-native";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import { ServiceFormData } from "../../CustomerForm";
import * as ImagePicker from "expo-image-picker";

interface Props {
  control: Control<ServiceFormData>;
  setValue: UseFormSetValue<ServiceFormData>;
}
export default function ImageForm({ control, setValue }: Props) {
  const pickCustomerImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 14],
      quality: 1,
    });

    if (!result.canceled) {
      setValue("imageUri", result.assets[0].uri);
    }
  };

  return (
    <Controller
      control={control}
      name="imageUri"
      render={({ field: { value } }) => (
        <TouchableHighlight
          style={styles.cameraContainer}
          underlayColor={Colors.light.underlayColor}
          onPress={pickCustomerImage}
        >
          {value ? (
            <Image source={{ uri: value }} style={styles.image} />
          ) : (
            <CameraIcon height={30} width={30} />
          )}
        </TouchableHighlight>
      )}
    />
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
