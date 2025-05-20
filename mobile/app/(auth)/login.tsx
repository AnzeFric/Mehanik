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
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={[AppStyles.parentPadding, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mehanik</Text>
        <Text style={styles.subtitle}>Prijavite se za nadaljevanje</Text>
      </View>

      <View
        style={{
          gap: 20,
        }}
      >
        <TextInput
          style={AppStyles.textInput}
          placeholder={"Email"}
          value={email}
          onChangeText={setEmail}
          keyboardType={"email-address"}
          autoCapitalize={"none"}
          autoComplete={"off"}
        />

        <TextInput
          style={AppStyles.textInput}
          placeholder={"Geslo"}
          value={password}
          onChangeText={setPassword}
          autoComplete={"off"}
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
    gap: 20,
    paddingTop: 100,
  },
  headerContainer: {
    paddingVertical: 35,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  registerLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.specialBlue,
  },
});
