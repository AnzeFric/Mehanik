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
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { AccountType } from "@/interfaces/account";

export default function LoginScreen() {
  const { handleRegister } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("user");

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
          placeholder={"Ime"}
          value={name}
          onChangeText={setName}
          autoCapitalize={"words"}
          autoComplete={"off"}
        />

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

        <TextInput
          style={AppStyles.textInput}
          placeholder={"Ponovite geslo"}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoComplete={"off"}
          secureTextEntry
        />

        <View style={{ gap: 10 }}>
          <Text>Kdo ste?</Text>
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[
                styles.userTypeButton,
                accountType === "user" && styles.selectedButton,
              ]}
              onPress={() => setAccountType("user")}
            >
              <Text style={styles.userTypeText}>Sem stranka</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.userTypeButton,
                accountType === "mechanic" && styles.selectedButton,
              ]}
              onPress={() => setAccountType("mechanic")}
            >
              <Text style={styles.userTypeText}>Sem avtomehanik</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableHighlight
          style={AppStyles.button}
          onPress={handleRegister}
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
