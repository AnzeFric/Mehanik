import { Image, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ThemedIcon from "@/components/global/themed/ThemedIcon";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  image?: string | null;
  setImage: (image: string) => void;
}

export default function ImageForm({ image, setImage }: Props) {
  const { staticColors } = useAnimatedTheme();

  const [imageLocal, setImageLocal] = useState<string | null>("");

  // Only populate local image when image prop changes
  useEffect(() => {
    if (image != undefined) {
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

      try {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Add data URL prefix for proper format
        const base64WithPrefix = `data:image/jpeg;base64,${base64}`;

        setImage(base64WithPrefix);
      } catch (error) {
        console.error("Error converting image to base64:", error);
        setImageLocal(image || "");
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
    }, [image])
  );

  return (
    <TouchableOpacity
      style={[
        styles.cameraContainer,
        { borderColor: staticColors.border, borderWidth: imageLocal ? 0 : 2 },
      ]}
      onPress={pickCustomerImage}
    >
      {imageLocal ? (
        <Image source={{ uri: imageLocal }} style={styles.image} />
      ) : (
        <ThemedIcon name={"image-outline"} size={30} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    borderStyle: "dashed",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});
