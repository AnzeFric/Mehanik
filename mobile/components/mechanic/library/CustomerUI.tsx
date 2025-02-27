import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import CameraIcon from "@/assets/icons/CameraIcon.svg";
import { Colors } from "@/constants/Colors";

export default function CustomerUI() {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.cameraContainer}
        underlayColor={Colors.light.underlayColor}
        onPress={() => {}}
      >
        <CameraIcon height={30} width={30} />
      </TouchableHighlight>
      <Text>sliko/slike vozila, neobvezno</Text>
      <Text></Text>
      <Text>Ime, obvezen</Text>
      <Text>Priimek, obvezen</Text>
      <Text>Naslov, neobvezen</Text>
      <Text>Kontakt: Telefonska ali email, oba neobvezna</Text>
      <Text></Text>
      <Text>Znamko vozila, obvezen</Text>
      <Text>Model vozila, obvezen</Text>
      <Text>Letnik vozila, neobvezen</Text>
      <Text>VIN vozila, neobvezen</Text>
      <Text>Dodaten opis za vozilo, neobvezen</Text>
      <Text></Text>
      <Text>Tip servisa(mali, velik, drugo), neobvezen</Text>
      <Text> - (mali, velik):</Text>
      <Text> - - Poklikat za mali ali velik, bodo predefinirana polja</Text>
      <Text> - - Zraven vsakega klika se lahko vpiše dodatna informacija</Text>
      <Text> - - Sliko/slike servisa, neobvezno</Text>
      <Text> - - Polje za dodaten opis, neobvezno</Text>
      <Text> - - - Polje za ceno?, neobvezno: Se v brainstormu</Text>
      <Text> - drugo:</Text>
      <Text> - - Polje za vpis kaj je bilo narejeno, neobvezno</Text>
      <Text> - - Polje za dodaten opis, neobvezno</Text>
      <Text> - - Sliko/slike servisa, neobvezno</Text>
      <Text> - - - Polje za ceno?, neobvezno: Se v brainstormu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 25, flex: 1 },
  cameraContainer: {
    borderWidth: 1,
    borderColor: Colors.light.inactiveBorder,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
});
