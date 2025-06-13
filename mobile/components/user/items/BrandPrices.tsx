import { View, StyleSheet } from "react-native";
import { BrandPrice } from "@/interfaces/user";
import ThemedText from "@/components/global/themed/ThemedText";

interface Props {
  title: string;
  brandPrices: Array<BrandPrice> | null | undefined;
}

export default function BrandPrices({ title, brandPrices }: Props) {
  return (
    <>
      <ThemedText type={"normal"}>{title}</ThemedText>
      {brandPrices && brandPrices.length > 0 ? (
        brandPrices.map((brand, index) => (
          <View style={styles.priceRow} key={index}>
            <ThemedText type={"small"}>{brand.name}</ThemedText>
            <ThemedText type={"small"} bold>
              {brand.price}€
            </ThemedText>
          </View>
        ))
      ) : (
        <ThemedText type={"small"}>Cene niso podane</ThemedText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
  },
});
