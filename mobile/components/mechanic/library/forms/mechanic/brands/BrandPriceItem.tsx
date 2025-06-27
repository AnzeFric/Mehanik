import { View, StyleSheet } from "react-native";
import { BrandPrice } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";
import { vehicleBrands } from "@/interfaces/vehicle";
import { useEffect, useMemo, useState } from "react";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import ThemedDropDown from "@/components/global/themed/ThemedDropDown";

interface Props {
  brandPrice: BrandPrice;
  setBrandPrice: (brandPrice: BrandPrice) => void;
}

export default function BrandPriceItem({ brandPrice, setBrandPrice }: Props) {
  const [name, setName] = useState(brandPrice.name);
  const [optionsFocus, setOptionsFocus] = useState(false);

  useEffect(() => {
    setName(brandPrice.name);
  }, [brandPrice]);

  const filteredBrands = useMemo(() => {
    if (!name) return vehicleBrands; // Show all when empty
    return vehicleBrands.filter((item) =>
      item.toLowerCase().startsWith(name.toLowerCase())
    );
  }, [name]);

  const handleNameChange = (text: string) => {
    setName(text);
    setBrandPrice({ ...brandPrice, name: text });
  };

  const handlePriceChange = (text: string) => {
    setBrandPrice({ ...brandPrice, price: text });
  };

  return (
    <View>
      <View style={styles.contentContainer}>
        <ThemedTextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={"Znamka"}
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize={"words"}
          onFocus={() => setOptionsFocus(true)}
          onBlur={() => {
            setOptionsFocus(false);
          }}
        />
        <ThemedTextInput
          style={[styles.input, styles.inputPhone]}
          placeholder={"Cena"}
          value={brandPrice?.price}
          onChangeText={handlePriceChange}
          autoCapitalize={"none"}
          keyboardType={"decimal-pad"}
        />
      </View>
      {optionsFocus && (
        <ThemedDropDown items={filteredBrands} onPress={handleNameChange} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
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
