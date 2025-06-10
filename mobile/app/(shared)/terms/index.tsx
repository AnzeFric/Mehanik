import { View, TextInput, StyleSheet } from "react-native";
import { useState, useMemo, useCallback, useRef } from "react";
import { useFocusEffect } from "expo-router";
import TitleRow from "@/components/shared/TitleRow";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import TermsItem from "@/components/shared/terms/TermsItem";
import { items } from "@/data/terms/terms.json";
import { AppStyles } from "@/constants/Styles";
import ThemedScrollView from "@/components/global/themed/ThemedScrollView";

export default function TermsScreen() {
  const [value, setValue] = useState("");
  const inputRef = useRef<TextInput>(null);

  const terms = useMemo(() => {
    return items;
  }, [items]);

  const filteredTerms = terms.filter(
    (item) =>
      item.title.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        setValue("");
      };
    }, [])
  );

  return (
    <ThemedScrollView>
      <TitleRow title={"Pogoji in določila"} hasBackButton={true} />
      <View style={styles.contentContainer}>
        <View style={AppStyles.inputContainer}>
          <TextInput
            style={AppStyles.input}
            placeholder={"Iskanje"}
            value={value}
            onChangeText={setValue}
            ref={inputRef}
          />
          <Ionicons
            name={"search-outline"}
            size={20}
            color={"#888"}
            onPress={() => inputRef.current?.focus()}
          />
        </View>

        <View style={{ gap: 10 }}>
          {filteredTerms.map((item, index) => (
            <TermsItem id={item.id} title={item.title} key={index} />
          ))}
        </View>
      </View>
    </ThemedScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    gap: 30,
  },
  button: {
    borderRadius: 8,
    backgroundColor: Colors.light.specialBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
