import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { BrandPrice } from "@/interfaces/user";
import BrandPriceItem from "./BrandPriceItem";
import { AppStyles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";

interface Props {
  brandPriceArray: Array<BrandPrice>;
  setBrandPriceArray: (newArray: Array<BrandPrice>) => void;
}

export default function BrandPriceDisplay({
  brandPriceArray,
  setBrandPriceArray,
}: Props) {
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
              style={styles.deleteButton}
              onPress={() => {
                deleteItem(index);
              }}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity style={AppStyles.button} onPress={addNewItem}>
        <Text style={AppStyles.buttonText}>+ Dodaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    paddingHorizontal: 5,
    backgroundColor: Colors.light.destructiveRed,
    borderRadius: 60,
    marginLeft: 20,
  },
  deleteButtonText: {
    fontWeight: "bold",
    color: "white",
    padding: 3,
  },
});
