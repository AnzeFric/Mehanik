import { View, TextInput, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { useFocusEffect } from "expo-router";
import Mechanic from "@/components/user/items/Mechanic";
import DisplayItems from "@/components/global/DisplayItems";
import TitleRow from "@/components/shared/TitleRow";
import useMechanicStore from "@/stores/useMechanicStore";
import { useUser } from "@/hooks/useUser";

export default function MechanicsScreen() {
  const { mechanics, setMechanics } = useMechanicStore();
  const { getMechanics } = useUser();
  const [search, setSearch] = useState<string>("");

  const filteredMechanics =
    search.trim() === ""
      ? mechanics
      : mechanics.filter(
          (mechanic) =>
            mechanic.firstName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.lastName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.info.address
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            mechanic.info.city?.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.info.phone?.includes(search.toLowerCase()) ||
            mechanic.email?.toLowerCase().includes(search.toLowerCase())
        );

  useEffect(() => {
    const populateMechanicList = async () => {
      const mechanics = await getMechanics();
      setMechanics(mechanics);
    };
    populateMechanicList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => {
        setTimeout(() => {
          setSearch("");
        }, 100); // For smooth transition between screens
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TitleRow title={"Mehaniki"} hasBackButton={false} />
        <View style={styles.textInputContainer}>
          <SearchIcon color={Colors.light.primaryText} height={20} width={20} />
          <TextInput
            style={[AppStyles.text, styles.textInput]}
            placeholder="Išči"
            value={search}
            onChangeText={(text: string) => {
              setSearch(text);
            }}
            numberOfLines={1}
          />
        </View>
      </View>
      <DisplayItems
        list={filteredMechanics}
        renderItem={(mechanic, index) => (
          <Mechanic mechanicData={mechanic} key={index} />
        )}
        emptyMessage="Mehaniki ne obstajajo."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    gap: 15,
    borderBottomColor: Colors.light.inactiveBorder,
    borderStyle: "dashed",
    borderBottomWidth: 1,
  },
  textInputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.light.textInputBorder,
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginHorizontal: 25,
    gap: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  textInput: {
    height: 50,
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
