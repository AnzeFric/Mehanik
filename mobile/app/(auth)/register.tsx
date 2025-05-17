import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Default: Normal user

  const handleRegistration = () => {
    console.log(
      "Registration attempted with:",
      email,
      name,
      password,
      confirmPassword,
      "User Type:",
      userType
    );
  };

  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Ustvarite račun</Text>
        <Text style={styles.subtitle}>
          Izberite vrsto računa in izpolnite podatke
        </Text>
      </View>

      <View style={{ gap: 20 }}>
        <TextInput
          style={AppStyles.textInput}
          placeholder="Ime"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <TextInput
          style={AppStyles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={AppStyles.textInput}
          placeholder="Geslo"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TextInput
          style={AppStyles.textInput}
          placeholder="Ponovite geslo"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <View style={{ gap: 10 }}>
          <Text>Kdo ste?</Text>
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === "user" && styles.selectedButton,
              ]}
              onPress={() => setUserType("user")}
            >
              <Text style={styles.userTypeText}>Sem stranka</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                userType === "mechanic" && styles.selectedButton,
              ]}
              onPress={() => setUserType("mechanic")}
            >
              <Text style={styles.userTypeText}>Sem avtomehanik</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight
          style={AppStyles.button}
          onPress={handleRegistration}
          underlayColor={Colors.light.specialBlueClick}
        >
          <Text style={AppStyles.buttonText}>Registracija</Text>
        </TouchableHighlight>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Že imate račun? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Prijava</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 60,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.light.inactiveButton,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.light.specialBlue,
  },
  userTypeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.specialBlue,
  },
});
