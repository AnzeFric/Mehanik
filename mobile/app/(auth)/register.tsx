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

  const handleRegistration = () => {
    console.log(
      "Registration attempted with:",
      email,
      name,
      password,
      confirmPassword
    );
  };

  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Ustvarite račun</Text>
        <Text style={styles.subtitle}>Izpolnite polja za registracijo</Text>
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
    fontFamily: "Jaldi-Bold",
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.secondaryText,
    fontFamily: "Jaldi-Regular",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.secondaryText,
  },
  loginLink: {
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
    color: Colors.light.specialBlue,
  },
});
