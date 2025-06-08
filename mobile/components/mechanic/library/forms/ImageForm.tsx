import { TouchableHighlight, Image, StyleSheet } from "react-native";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";

interface Props {
  image?: string | null;
  setImage: (image: string) => void;
}

export default function ImageForm({ image, setImage }: Props) {
  const [imageLocal, setImageLocal] = useState<string | null>("");

  useEffect(() => {
    if (image) {
      setImageLocal(image);
    }
  }, [image]);

  const pickCustomerImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [16, 14],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageLocal(uri);

      // Convert to base64 for database storage
      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Add data URL prefix for proper format
        const base64WithPrefix = `data:image/jpeg;base64,${base64}`;
        setImage(base64WithPrefix);
      } catch (error) {
        console.error("Error converting image to base64:", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (!image) {
          setImageLocal("");
        }
      };
    }, [])
  );

  return (
    <TouchableHighlight
      style={styles.cameraContainer}
      underlayColor={Colors.light.underlayColor}
      onPress={pickCustomerImage}
    >
      {imageLocal ? (
        <Image source={{ uri: imageLocal }} style={styles.image} />
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
