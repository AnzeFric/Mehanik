import { TouchableHighlight, Image, StyleSheet } from "react-native";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";

interface Props {
  image: string | null | undefined;
  setImage: (image: string) => void;
}

export default function ImageForm({ image, setImage }: Props) {
  const pickCustomerImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 14],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableHighlight
      style={styles.cameraContainer}
      underlayColor={Colors.light.underlayColor}
      onPress={pickCustomerImage}
    >
      {image ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <CameraIcon height={30} width={30} />
      )}
    </TouchableHighlight>
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
