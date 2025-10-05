import { View, StyleSheet, Alert } from "react-native";
import TitleRow from "@/components/global/TitleRow";
import { useTheme } from "@/context/ThemeContext";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedButton from "@/components/global/themed/ThemedButton";
import DatabaseBackupService from "@/database/services/DatabaseService";
import { router } from "expo-router";
import { useCustomers } from "@/hooks/useCustomers";
import useDataStore from "@/stores/useDataStore";
import { useTranslation } from "react-i18next";
import useTranslationStore from "@/stores/useTranslationStore";
import i18n from "@/assets/i18n/i18n";
import { Translation } from "@/interfaces/translation";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";
import useUserStore from "@/stores/useUserStore";

export default function SettingsScreen() {
  const { setCustomers } = useDataStore();
  const { selectedTranslation, setSelectedTranslation } = useTranslationStore();
  const { firstName, lastName, setFirstName, setLastName } = useUserStore();

  const { selectedTheme, setSelectedTheme } = useTheme();
  const { fetchCustomers } = useCustomers();
  const { t } = useTranslation();

  const exportDatabase = async () => {
    const result = await DatabaseBackupService.exportDatabase();
    if (result) {
      Alert.alert(
        t("screens.settings.text.exportSuccessTitle"),
        t("screens.settings.text.exportSuccessText")
      );
    } else {
      Alert.alert(
        t("screens.settings.text.exportFailTitle"),
        t("screens.settings.text.exportFailText")
      );
    }
    router.back();
  };

  const importDatabase = async () => {
    const result = await DatabaseBackupService.importDatabase();
    if (result) {
      Alert.alert(
        t("screens.settings.text.importSuccessTitle"),
        t("screens.settings.text.importSuccessText")
      );
      const customers = await fetchCustomers();
      if (customers) {
        setCustomers(customers);
      }
    } else {
      Alert.alert(
        t("screens.settings.text.importFailTitle"),
        t("screens.settings.text.importFailText")
      );
    }
    router.back();
  };

  const changeTranslation = (translation: Translation) => {
    setSelectedTranslation(translation);
    i18n.changeLanguage(translation);
  };

  return (
    <ThemedScrollView contentContainerStyle={styles.container}>
      <TitleRow title={t("screens.settings.text.title")} hasBackButton={true} />
      <View style={styles.itemContainer}>
        <ThemedText type={"normal"}>
          {t("screens.settings.text.themeLabel")}
        </ThemedText>
        <View style={styles.optionContainer}>
          <ThemedButton
            buttonType={"small"}
            buttonText={t("screens.settings.text.themeLight")}
            onPress={() => setSelectedTheme("light")}
            selected={selectedTheme === "light"}
            buttonStyle={styles.optionButton}
          />
          <ThemedButton
            buttonType={"small"}
            buttonText={t("screens.settings.text.themeDark")}
            onPress={() => setSelectedTheme("dark")}
            selected={selectedTheme === "dark"}
            buttonStyle={styles.optionButton}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <ThemedText type={"normal"}>
          {t("screens.settings.text.languageLabel")}
        </ThemedText>
        <View style={styles.optionContainer}>
          <ThemedButton
            buttonType={"small"}
            buttonText={"Slo"}
            onPress={() => changeTranslation("sl")}
            selected={selectedTranslation === "sl"}
            buttonStyle={styles.optionButton}
          />
          <ThemedButton
            buttonType={"small"}
            buttonText={"Eng"}
            onPress={() => changeTranslation("en")}
            selected={selectedTranslation === "en"}
            buttonStyle={styles.optionButton}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View>
          <ThemedText type={"normal"}>
            {t("screens.settings.text.nameLabel")}
          </ThemedText>
          <ThemedText type={"small"}>
            {t("screens.settings.text.nameDisclaimer")}
          </ThemedText>
        </View>
        <View style={styles.nameContainer}>
          <ThemedTextInput
            style={styles.input}
            placeholder={t("screens.settings.text.name")}
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize={"words"}
          />
          <ThemedTextInput
            style={styles.input}
            placeholder={t("screens.settings.text.surname")}
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize={"words"}
          />
        </View>
      </View>
      <View style={styles.itemContainer}>
        <ThemedText type={"normal"}>
          {t("screens.settings.text.importExportLabel")}
        </ThemedText>
        <View style={styles.itemContainer}>
          <ThemedButton
            buttonType={"small"}
            buttonText={t("screens.settings.text.export")}
            onPress={exportDatabase}
          />
          <ThemedButton
            buttonType={"small"}
            buttonText={t("screens.settings.text.import")}
            onPress={importDatabase}
          />
        </View>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 30,
  },
  itemContainer: {
    gap: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: "center",
  },
  nameContainer: {
    flexDirection: "row",
    gap: 20,
  },
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    paddingVertical: 8,
    flex: 1,
  },
});
