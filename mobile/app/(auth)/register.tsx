import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState, useCallback } from "react";
import { Link, useFocusEffect } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { AccountType } from "@/interfaces/account";

export default function LoginScreen() {
  const { handleRegister } = useAuth();
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

  return (
    <View style={styles.container}>
      <ScrollView style={AppStyles.parentPadding}>
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
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize={"words"}
            autoComplete={"off"}
          />

          <TextInput
            style={AppStyles.textInput}
            placeholder={"Priimek"}
            value={lastName}
            onChangeText={setLastName}
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
            autoCapitalize={"none"}
            autoComplete={"off"}
            secureTextEntry
          />

          <TextInput
            style={AppStyles.textInput}
            placeholder={"Ponovite geslo"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoCapitalize={"none"}
            autoComplete={"off"}
            secureTextEntry
          />

          <View style={{ gap: 10 }}>
            <Text style={styles.subtitle}>Kdo ste?</Text>
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
            style={AppStyles.bigButton}
            onPress={handleRegisterPress}
            underlayColor={Colors.light.specialBlueClick}
          >
            <Text style={AppStyles.bigButtonText}>Registracija</Text>
          </TouchableHighlight>

          <View style={styles.loginContainer}>
            <Text style={styles.subtitle}>Že imate račun? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Prijava</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.specialBlue,
  },
});
