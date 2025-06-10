import {
  View,
  Text,
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
  const { deleteUser } = useUser();
  const { currentUser } = useUserStore();

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

  return (
    <ScrollView>
      <TitleRow
        title={`Pozdravljen ${currentUser.firstName}!`}
        hasBackButton={true}
      />

      <View style={[AppStyles.parentPadding, styles.contentContainer]}>
        <View style={styles.itemContainer}>
          <Text style={AppStyles.text}>Barva aplikacije</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isLightTheme && styles.selectedButton,
              ]}
              onPress={() => setIsLightTheme(true)}
            >
              <Text style={AppStyles.buttonText}>Svetla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isLightTheme && styles.selectedButton,
              ]}
              onPress={() => setIsLightTheme(false)}
            >
              <Text style={AppStyles.buttonText}>Temna</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={AppStyles.text}>Obvestila</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(true)}
            >
              <Text style={AppStyles.buttonText}>Vklopljeno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionButton,
                !isNotificationOn && styles.selectedButton,
              ]}
              onPress={() => setIsNotificationOn(false)}
            >
              <Text style={AppStyles.buttonText}>Izklopljeno</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={AppStyles.text}>Pogoji uporabe</Text>
          <TouchableOpacity
            style={AppStyles.button}
            onPress={() => router.push("../terms")}
          >
            <Text style={AppStyles.buttonText}>Preberi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.itemContainer}>
          <View style={styles.itemContainer}>
            <Text style={AppStyles.text}>Račun</Text>
            <TouchableOpacity style={AppStyles.button} onPress={handleLogout}>
              <Text style={AppStyles.buttonText}>Odjava</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={handleDeleteUser}
            >
              <Text style={AppStyles.buttonText}>Odstrani</Text>
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
  itemContainer: {
    gap: 10,
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
});
