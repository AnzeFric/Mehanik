import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BrandPrice } from "@/interfaces/user";
import { Colors } from "@/constants/Colors";
import { vehicleBrands } from "@/interfaces/vehicle";
import { useEffect, useMemo, useState } from "react";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";
import { useAnimatedTheme } from "@/hooks/utils/useAnimatedTheme";

interface Props {
  brandPrice: BrandPrice;
  setBrandPrice: (brandPrice: BrandPrice) => void;
}

export default function BrandPriceItem({ brandPrice, setBrandPrice }: Props) {
  const { staticColors } = useAnimatedTheme();

  const [name, setName] = useState(brandPrice.name);
  const [optionsFocus, setOptionsFocus] = useState(false);

  useEffect(() => {
    setName(brandPrice.name);
  }, [brandPrice]);

  const filteredBrands = useMemo(() => {
    return vehicleBrands.filter((item) =>
      item.toLowerCase().includes(name.toLowerCase())
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
        <ScrollView
          style={styles.optionsContainer}
          nestedScrollEnabled
          keyboardShouldPersistTaps={"handled"}
        >
          {filteredBrands.map((brand, index) => (
            <TouchableOpacity
              style={[
                styles.option,
                { backgroundColor: staticColors.primaryBackground },
                index !== 0 && { paddingTop: 15 },
              ]}
              onPress={() => {
                handleNameChange(brand);
              }}
              key={index}
            >
              <Text
                style={[styles.optionText, { color: staticColors.primaryText }]}
              >
                {brand}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  optionsContainer: {
    borderWidth: 0.5,
    borderRadius: 8,
    maxHeight: 200,
  },
  option: {
    borderBottomWidth: 0.8,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 18,
  },
});
