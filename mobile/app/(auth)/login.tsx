import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import { Link, useFocusEffect } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { handleLogin } = useAuth();
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

    handleLogin(email, password);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={AppStyles.parentPadding}>
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
            autoCapitalize={"none"}
            autoComplete={"off"}
            secureTextEntry
          />

          <TouchableOpacity
            style={AppStyles.bigButton}
            onPress={handleLoginPress}
          >
            <Text style={AppStyles.bigButtonText}>Prijava</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Nimate računa? </Text>
            <Link href="/(auth)/register" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Registracija</Text>
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
