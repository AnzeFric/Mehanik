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
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login attempted with:", email, password);
  };

  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mehanik</Text>
        <Text style={styles.subtitle}>Prijavite se za nadaljevanje</Text>
      </View>

      <View style={{ gap: 20 }}>
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

        <TouchableHighlight
          style={AppStyles.button}
          onPress={handleLogin}
          underlayColor={Colors.light.specialBlueClick}
        >
          <Text style={AppStyles.buttonText}>Prijava</Text>
        </TouchableHighlight>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Nimate računa? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Registracija</Text>
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    fontFamily: "Jaldi-Regular",
    color: Colors.light.secondaryText,
  },
  registerLink: {
    fontSize: 16,
    fontFamily: "Jaldi-Bold",
    color: Colors.light.specialBlue,
  },
});
