import {
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "@/hooks/accounts/useAuth";
import ThemedView from "@/components/global/themed/ThemedView";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";

export default function LoginScreen() {
  const { handleLogin } = useAuth();
  const { staticColors } = useAnimatedTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail("");
        setPassword("");
      };
    }, [])
  );

  const handleLoginPress = async () => {
    if (email === "" || password === "") {
      Alert.alert("Napačen vnos", "Vsa polja potrebujejo biti izpolnjena");
      return;
    }
    const success = await handleLogin(email, password);
    if (success) {
      router.replace("/");
    } else {
      Alert.alert(
        "Napaka",
        "Prišlo je do napake pri prijavi. Poskusite ponovno kasneje."
      );
    }
  };

  const inputStyle = [
    [
      styles.input,
      {
        borderColor: staticColors.inputBorder,
        backgroundColor: staticColors.inputBackground,
      },
    ],
  ];

  return (
    <ThemedView type={"background"} style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.headerContainer}>
          <ThemedText type={"xxlTitle"} bold>
            Mehanik
          </ThemedText>
          <ThemedText type={"normal"}>Prijavite se za nadaljevanje</ThemedText>
        </View>

        <View
          style={{
            gap: 20,
          }}
        >
          <ThemedTextInput
            style={inputStyle}
            placeholder={"Email"}
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
            autoCapitalize={"none"}
            autoComplete={"off"}
          />

          <ThemedTextInput
            style={inputStyle}
            placeholder={"Geslo"}
            value={password}
            onChangeText={setPassword}
            autoCapitalize={"none"}
            autoComplete={"off"}
            secureTextEntry
          />

          <ThemedButton
            buttonType={"large"}
            onPress={handleLoginPress}
            buttonText={"Prijava"}
          />

          <View style={styles.registerContainer}>
            <ThemedText type={"small"}>Nimate računa? </ThemedText>
            <TouchableOpacity
              onPress={() => router.replace("/(auth)/register")}
            >
              <ThemedText
                type={"small"}
                bold
                style={{ color: staticColors.button }}
              >
                Registracija
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  headerContainer: {
    paddingVertical: 35,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
});
