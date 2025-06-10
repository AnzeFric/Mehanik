import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useState } from "react";
import { AppStyles } from "@/constants/Styles";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useUser } from "@/hooks/useUser";
import TitleRow from "@/components/shared/TitleRow";
import useUserStore from "@/stores/useUserStore";

export default function SettingsScreen() {
  const { handleLogout } = useAuth();
  const { updateUser, deleteUser } = useUser();
  const { currentUser } = useUserStore();

  const [firstNameVal, setFirstNameVal] = useState<string>(
    currentUser.firstName
  );
  const [lastNameVal, setLastNameVal] = useState<string>(currentUser.lastName);
  const [isLightTheme, setIsLightTheme] = useState<boolean>(true); // TODO: get this from hook
  const [isNotificationOn, setIsNotificationOn] = useState<boolean>(true);

  const handleDeleteUser = () => {
    Alert.alert("Brisanje računa", "Ste prepričani?", [
      {
        text: "Zavrni",
      },
      {
        text: "Potrdi",
        onPress: () => deleteUser,
      },
    ]);
  };

  const handleUpdateFirstName = () => {
    if (currentUser.firstName === firstNameVal || firstNameVal === "") {
      Alert.alert("Napaka", "Spremenite ime pred posodabljanjem");
    } else {
      updateUser(firstNameVal, undefined);
    }
  };

  const handleUpdateLastName = () => {
    if (currentUser.lastName === lastNameVal || lastNameVal === "") {
      Alert.alert("Napaka", "Spremenite priimek pred posodabljanjem");
    } else {
      updateUser(undefined, lastNameVal);
    }
  };

  return (
    <ScrollView>
      <TitleRow
        title={`Pozdravljen ${currentUser.firstName}!`}
        hasBackButton={true}
      />

      <View style={[AppStyles.parentPadding, styles.contentContainer]}>
        <View>
          <Text style={AppStyles.text}>Spremeni podatke</Text>
          <View style={styles.nameInput}>
            <TextInput
              style={styles.input}
              placeholder="Ime"
              value={firstNameVal}
              onChangeText={setFirstNameVal}
              autoCapitalize="words"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateFirstName}
            >
              <Text style={styles.buttonText}>Potrdi</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nameInput}>
            <TextInput
              style={styles.input}
              placeholder="Priimek"
              value={lastNameVal}
              onChangeText={setLastNameVal}
              autoCapitalize="words"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handleUpdateLastName}
            >
              <Text style={styles.buttonText}>Potrdi</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={AppStyles.text}>Barva aplikacije</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isLightTheme && styles.selectedButton,
              ]}
              onPress={() => setIsLightTheme(true)}
            >
              <Text style={styles.buttonText}>Svetla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isLightTheme && styles.selectedButton,
              ]}
              onPress={() => setIsLightTheme(false)}
            >
              <Text style={styles.buttonText}>Temna</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={AppStyles.text}>Obvestila</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(true)}
            >
              <Text style={styles.buttonText}>Vklopljeno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(false)}
            >
              <Text style={styles.buttonText}>Izklopljeno</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={AppStyles.text}>Pogoji uporabe</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("../terms")}
          >
            <Text style={styles.buttonText}>Preberi</Text>
          </TouchableOpacity>
        </View>

        <View style={{ gap: 15 }}>
          <View>
            <Text style={AppStyles.text}>Račun</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text style={styles.buttonText}>Odjava</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.button} onPress={handleDeleteUser}>
              <Text style={styles.buttonText}>Odstrani</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomColor: Colors.light.inactiveBorder,
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderStyle: "dashed",
  },
  greeting: {
    fontSize: 32,
    flex: 1,
    textAlign: "center",
  },
  contentContainer: {
    marginVertical: 20,
    gap: 20,
  },
  nameInput: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
    flex: 1,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: Colors.light.inactiveButton,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: Colors.light.specialBlue,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    paddingVertical: 6,
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 8,
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
