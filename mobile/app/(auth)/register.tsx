import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";
import ThemedButton from "@/components/global/themed/ThemedButton";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import { AccountType } from "@/interfaces/user";

export default function LoginScreen() {
  const { handleRegister } = useAuth();
  const { staticColors } = useAnimatedTheme();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("user");

  useFocusEffect(
    useCallback(() => {
      return () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setConfirmPassword("");
        setAccountType("user");
      };
    }, [])
  );

  const handleRegisterPress = async () => {
    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Alert.alert("Napačen vnos", "Vsa polja potrebujejo biti izpolnjena");
      return;
    }

    if (password != confirmPassword) {
      Alert.alert("Napačen vnos", "Gesla se ne ujemata");
      return;
    }

    handleRegister(email, firstName, lastName, password, accountType);
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
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ paddingVertical: 35 }}>
          <ThemedText type={"xxlTitle"} bold>
            Ustvarite račun
          </ThemedText>
          <ThemedText type={"small"}>
            Izberite vrsto računa in izpolnite podatke
          </ThemedText>
        </View>

        <View style={{ gap: 20 }}>
          <ThemedTextInput
            style={inputStyle}
            placeholder={"Ime"}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize={"words"}
            autoComplete={"off"}
          />

          <ThemedTextInput
            style={inputStyle}
            placeholder={"Priimek"}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize={"words"}
            autoComplete={"off"}
          />

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

          <ThemedTextInput
            style={inputStyle}
            placeholder={"Ponovite geslo"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize={"none"}
            autoComplete={"off"}
            secureTextEntry
          />

          <View style={{ gap: 10 }}>
            <ThemedText type={"small"}>Kdo ste?</ThemedText>
            <View style={styles.userTypeContainer}>
              <ThemedButton
                buttonType={"option"}
                buttonText={"Sem stranka"}
                selected={accountType === "user"}
                onPress={() => setAccountType("user")}
              />
              <ThemedButton
                buttonType={"option"}
                buttonText={"Sem avtomehanik"}
                selected={accountType === "mechanic"}
                onPress={() => setAccountType("mechanic")}
              />
            </View>
          </View>

          <ThemedButton
            buttonType={"large"}
            onPress={handleRegisterPress}
            buttonText={"Registracija"}
          />

          <View style={styles.loginContainer}>
            <ThemedText type={"small"}>Že imate račun? </ThemedText>
            <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
              <ThemedText
                type={"small"}
                bold
                style={{ color: staticColors.button }}
              >
                Prijava
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
    paddingHorizontal: 25,
    marginVertical: 20,
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  loginContainer: {
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
