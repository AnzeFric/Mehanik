import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { BrandPrice } from "@/interfaces/user";
import BrandPriceItem from "./BrandPriceItem";
import ThemedButton from "@/components/global/themed/ThemedButton";
import { useAnimatedTheme } from "@/hooks/useAnimatedTheme";

interface Props {
  brandPriceArray: Array<BrandPrice>;
  setBrandPriceArray: (newArray: Array<BrandPrice>) => void;
}

export default function BrandPriceDisplay({
  brandPriceArray,
  setBrandPriceArray,
}: Props) {
  const { staticColors } = useAnimatedTheme();

  const updateBrandPriceArray = (index: number, updatedItem: BrandPrice) => {
    const newArray = brandPriceArray.map((item, i) =>
      i === index ? updatedItem : item
    );
    setBrandPriceArray(newArray);
  };

  const addNewItem = () => {
    setBrandPriceArray([...brandPriceArray, { name: "", price: "0" }]);
  };

  const deleteItem = (deleteIndex: number) => {
    const newArr = brandPriceArray.filter((_, index) => index !== deleteIndex);
    setBrandPriceArray(newArr);
  };

  return (
    <View style={styles.container}>
      <View>
        {brandPriceArray.map((item, index) => (
          <View style={styles.itemContainer} key={index}>
            <View style={{ flex: 1 }}>
              <BrandPriceItem
                brandPrice={item}
                setBrandPrice={(updatedItem: BrandPrice) =>
                  updateBrandPriceArray(index, updatedItem)
                }
              />
            </View>
            <TouchableOpacity
              style={[
                styles.deleteButton,
                { backgroundColor: staticColors.destroyButton },
              ]}
              onPress={() => {
                deleteItem(index);
              }}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <ThemedButton
        buttonType={"small"}
        buttonText={"+ Dodaj"}
        onPress={addNewItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  itemContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    paddingHorizontal: 5,
    borderRadius: 60,
    marginLeft: 20,
    alignSelf: "flex-start",
    marginTop: 15,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "white",
    padding: 3,
  },
});
