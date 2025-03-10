import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useCallback } from "react";
import SearchIcon from "@/assets/icons/SearchIcon.svg";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { useFocusEffect } from "expo-router";
import { MechanicData } from "@/interfaces/user";
import Mechanic from "@/components/user/items/Mechanic";
import DisplayItems from "@/components/global-help/DisplayItems";

const fakeMechanicsData: MechanicData[] = [
  {
    id: 0,
    firstName: "John",
    lastName: "Doe",
    address: "123 Main Street",
    city: "New York",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "johndoe@example.com",
    phoneNumber: "+1 555-123-4567",
  },
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Connor",
    address: "456 Elm Avenue",
    city: "Los Angeles",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "sarah.connor@example.com",
    phoneNumber: "+1 555-987-6543",
  },
  {
    id: 2,
    firstName: "Mike",
    lastName: "Johnson",
    address: "789 Oak Drive",
    city: "Chicago",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    email: "mike.johnson@example.com",
    phoneNumber: "+1 555-456-7890",
  },
  {
    id: 3,
    firstName: "Emily",
    lastName: "Smith",
    address: "101 Pine Street",
    city: "Houston",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "emily.smith@example.com",
    phoneNumber: "+1 555-321-6789",
  },
  {
    id: 4,
    firstName: "David",
    lastName: "Brown",
    address: "202 Maple Road",
    city: "Miami",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "david.brown@example.com",
    phoneNumber: "+1 555-654-3210",
  },
];

export default function MechanicsScreen() {
  const [mechanicList, setMechanicList] =
    useState<Array<MechanicData>>(fakeMechanicsData);
  const [search, setSearch] = useState<string>("");

  const filteredMechanics =
    search.trim() === ""
      ? mechanicList
      : mechanicList.filter(
          (mechanic) =>
            mechanic.firstName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.lastName.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.address?.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.city?.toLowerCase().includes(search.toLowerCase()) ||
            mechanic.phoneNumber?.includes(search.toLowerCase()) ||
            mechanic.email?.toLowerCase().includes(search.toLowerCase())
        );

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
        <Text style={AppStyles.bigTitle}>Mehaniki</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Sortiraj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Filtriraj</Text>
          </TouchableOpacity>
        </View>
      </View>
      <DisplayItems
        list={filteredMechanics}
        renderItem={(mechanic, index) => (
          <Mechanic mechanicData={mechanic} key={index} />
        )}
        emptyMessage="Nimate novih terminov."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
  },
  header: {
    marginHorizontal: 25,
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
    gap: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  textInput: {
    height: 50,
    flex: 1,
    lineHeight: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: Colors.light.specialBlue,
    borderRadius: 8,
    paddingVertical: 6,
    flex: 1,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    color: Colors.light.darkButtonText,
    fontSize: 18,
    fontFamily: "Jaldi-Bold",
    textAlign: "center",
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
