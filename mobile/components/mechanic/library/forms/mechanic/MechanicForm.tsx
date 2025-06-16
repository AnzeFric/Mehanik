import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Colors } from "@/constants/Colors";
import { BrandPrice, MechanicData } from "@/interfaces/user";
import { StyleSheet, View } from "react-native";
import BrandPriceDisplay from "./BrandPriceDisplay";
import ThemedText from "@/components/global/themed/ThemedText";
import ThemedTextInput from "@/components/global/themed/ThemedTextInput";

interface Props {
  mechanic: MechanicData;
  setMechanic: Dispatch<SetStateAction<MechanicData>>;
}

// TODO: Dodaj image?
export default function MechanicForm({ mechanic, setMechanic }: Props) {
  const [largeBrandPrice, setLargeBrandPrice] = useState<Array<BrandPrice>>([
    { name: "", price: "0" },
  ]);
  const [smallBrandPrice, setSmallBrandPrice] = useState<Array<BrandPrice>>([
    { name: "", price: "0" },
  ]);
  const [tyreBrandPrice, setTyreBrandPrice] = useState<Array<BrandPrice>>([
    { name: "", price: "0" },
  ]);

  useEffect(() => {
    const largeRepairPrices = mechanic.info.prices.largeRepair;
    const smallRepairPrices = mechanic.info.prices.smallRepair;
    const tyreChangePrices = mechanic.info.prices.tyreChange;

    if (largeRepairPrices) setLargeBrandPrice(largeRepairPrices);
    if (smallRepairPrices) setSmallBrandPrice(smallRepairPrices);
    if (tyreChangePrices) setTyreBrandPrice(tyreChangePrices);
  }, [mechanic]);

  const handleLargeBrandChange = useCallback((newArray: BrandPrice[]) => {
    setLargeBrandPrice(newArray);
    setMechanic((prev) => {
      const prevPrices = prev.info.prices || {};
      return {
        ...prev,
        info: {
          ...prev.info,
          prices: {
            ...prevPrices,
            largeRepair: newArray,
          },
        },
      };
    });
  }, []);

  const handleSmallBrandChange = useCallback((newArray: BrandPrice[]) => {
    setSmallBrandPrice(newArray);
    setMechanic((prev) => {
      const prevPrices = prev.info.prices || {};
      return {
        ...prev,
        info: {
          ...prev.info,
          prices: {
            ...prevPrices,
            smallRepair: newArray,
          },
        },
      };
    });
  }, []);

  const handleTyrePriceChange = useCallback((newArray: BrandPrice[]) => {
    setTyreBrandPrice(newArray);
    setMechanic((prev) => {
      const prevPrices = prev.info.prices || {};
      return {
        ...prev,
        info: {
          ...prev.info,
          prices: {
            ...prevPrices,
            tyreChange: newArray,
          },
        },
      };
    });
  }, []);

  const handleFirstNameChange = useCallback((value: string) => {
    setMechanic((prev) => ({
      ...prev,
      firstName: value,
    }));
  }, []);

  const handleLastNameChange = useCallback((value: string) => {
    setMechanic((prev) => ({
      ...prev,
      lastName: value,
    }));
  }, []);

  const handleAddressChange = useCallback((value: string) => {
    setMechanic((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        address: value,
      },
    }));
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setMechanic((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        city: value,
      },
    }));
  }, []);

  const handlePhoneChange = useCallback((value: string) => {
    setMechanic((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        phone: value,
      },
    }));
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ThemedText type={"normal"} bold>
          Osebni podatki
        </ThemedText>

        <ThemedTextInput
          style={styles.input}
          placeholder={"Ime"}
          value={mechanic.firstName}
          onChangeText={handleFirstNameChange}
          autoCapitalize={"words"}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder={"Priimek"}
          value={mechanic.lastName}
          onChangeText={handleLastNameChange}
          autoCapitalize={"words"}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder={"Naslov"}
          value={mechanic.info.address || ""}
          onChangeText={handleAddressChange}
          autoCapitalize={"sentences"}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder={"Kraj"}
          value={mechanic.info.city || ""}
          onChangeText={handleCityChange}
          autoCapitalize={"sentences"}
        />

        <ThemedTextInput
          style={styles.input}
          placeholder={"Telefonska št."}
          value={mechanic.info.phone || ""}
          onChangeText={handlePhoneChange}
          autoCapitalize={"none"}
          keyboardType={"phone-pad"}
        />
      </View>
      <View style={styles.container}>
        <ThemedText type={"normal"} bold>
          Cene storitev
        </ThemedText>
        <ThemedText type={"small"}>Povprečna cena za vsako storitev</ThemedText>
        <View style={styles.brandPriceContainer}>
          <View>
            <ThemedText type={"small"}>Veliki servis</ThemedText>
            <BrandPriceDisplay
              brandPriceArray={largeBrandPrice}
              setBrandPriceArray={handleLargeBrandChange}
            />
          </View>
          <View>
            <View>
              <ThemedText type={"small"}>Mali servis</ThemedText>
              <BrandPriceDisplay
                brandPriceArray={smallBrandPrice}
                setBrandPriceArray={handleSmallBrandChange}
              />
            </View>
          </View>
          <View>
            <View>
              <ThemedText type={"small"}>Menjava gum</ThemedText>
              <BrandPriceDisplay
                brandPriceArray={tyreBrandPrice}
                setBrandPriceArray={handleTyrePriceChange}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
  },
  brandPriceContainer: {
    paddingVertical: 20,
    gap: 15,
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
