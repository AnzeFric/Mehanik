import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/Styles";
import { MechanicData } from "@/interfaces/user";
import { TextInput, StyleSheet, Text, View } from "react-native";

interface Props {
  mechanic: MechanicData;
  setMechanic: (mehcanic: MechanicData) => void;
}

// TODO: Dodaj image?
export default function MechanicForm({ mechanic, setMechanic }: Props) {
  const handleFirstNameChange = () => {};
  const handleLastNameChange = () => {};
  const handleEmailChange = () => {};
  const handleAddressChange = () => {};
  const handleCityChange = () => {};
  const handlePhoneChange = () => {};

  return (
    <>
      <View style={styles.container}>
        <Text style={AppStyles.text}>Osebni podatki</Text>

        <TextInput
          style={styles.input}
          placeholder={"Ime"}
          value={mechanic.firstName}
          onChangeText={handleFirstNameChange}
          autoCapitalize={"words"}
        />

        <TextInput
          style={styles.input}
          placeholder={"Priimek"}
          value={mechanic.lastName}
          onChangeText={handleLastNameChange}
          autoCapitalize={"words"}
        />

        <TextInput
          style={styles.input}
          placeholder={"Email"}
          value={mechanic.email}
          onChangeText={handleEmailChange}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
        />

        <TextInput
          style={styles.input}
          placeholder={"Naslov"}
          value={mechanic.info.address || ""}
          onChangeText={handleAddressChange}
          autoCapitalize={"sentences"}
        />

        <TextInput
          style={styles.input}
          placeholder={"Kraj"}
          value={mechanic.info.city || ""}
          onChangeText={handleCityChange}
          autoCapitalize={"sentences"}
        />

        <TextInput
          style={styles.input}
          placeholder={"Telefonska št."}
          value={mechanic.info.phone || ""}
          onChangeText={handlePhoneChange}
          autoCapitalize={"none"}
          keyboardType={"phone-pad"}
        />
      </View>
      <View style={styles.container}>
        <Text style={AppStyles.text}>Cene storitev</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
});
