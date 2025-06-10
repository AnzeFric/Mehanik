import { View, StyleSheet, TextInput } from "react-native";
import { BrandPrice } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";

interface Props {
  brandPrice: BrandPrice;
  setBrandPrice: (brandPrice: BrandPrice) => void;
}

export default function BrandPriceItem({ brandPrice, setBrandPrice }: Props) {
  const handleNameChange = (text: string) => {
    setBrandPrice({ ...brandPrice, name: text });
  };

  const handlePriceChange = (text: string) => {
    const price = text ? parseFloat(text) || 0 : 0;
    setBrandPrice({ ...brandPrice, price });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder={"Ime"}
        value={brandPrice?.name}
        onChangeText={handleNameChange}
        autoCapitalize={"words"}
      />
      <TextInput
        style={[styles.input, styles.inputPhone]}
        placeholder={"Telefonska št. (ni obvezno)"}
        value={brandPrice?.price.toString()}
        onChangeText={handlePriceChange}
        autoCapitalize={"none"}
        keyboardType={"phone-pad"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  input: {
    height: 45,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.inactiveBorder,
    marginBottom: 15,
    paddingVertical: 8,
  },
  inputPhone: {
    width: 80,
    textAlign: "right",
  },
});
