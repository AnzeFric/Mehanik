import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { MechanicData } from "@/interfaces/user";
import useMechanicStore from "@/stores/accounts/useMechanicStore";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import BrandPrices from "@/components/user/items/BrandPrices";
import ThemedButton from "@/components/global/themed/ThemedButton";

export default function MechanicScreen() {
  const { email } = useLocalSearchParams();
  const { mechanics } = useMechanicStore();
  const [mechanicData, setMechanicData] = useState<MechanicData>();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const foundMehcanic = mechanics.find(
      (mechanic) => mechanic.email === email
    );
    setMechanicData(foundMehcanic);
  }, [email]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ y: 0 });
        }
      };
    }, [])
  );

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      <TitleRow
        title={`${mechanicData?.firstName} ${mechanicData?.lastName}`}
        hasBackButton={true}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionContainer}>
          <ThemedText type={"title"} bold>
            Lokacija
          </ThemedText>
          <View style={{ flexDirection: "row" }}>
            {mechanicData?.info.address && (
              <ThemedText type={"normal"}>
                {mechanicData.info.address}
              </ThemedText>
            )}
            {mechanicData?.info.city && (
              <ThemedText type={"normal"}>
                {", "}
                {mechanicData.info.city}
              </ThemedText>
            )}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <ThemedText type={"title"} bold>
            Kontakt
          </ThemedText>
          {mechanicData?.info.phone && (
            <ThemedText type={"normal"}>{mechanicData.info.phone}</ThemedText>
          )}
          {mechanicData?.email && (
            <ThemedText type={"normal"}>{mechanicData.email}</ThemedText>
          )}
        </View>

        <ThemedView type={"secondary"} style={styles.priceContainer}>
          <ThemedText type={"title"} bold>
            Cene
          </ThemedText>
          <View style={styles.priceSection}>
            <BrandPrices
              title={"Veliki servis"}
              brandPrices={mechanicData?.info.prices.largeRepair}
            />
          </View>
          <View style={styles.priceSection}>
            <BrandPrices
              title={"Mali servis"}
              brandPrices={mechanicData?.info.prices.smallRepair}
            />
          </View>
          <View style={styles.priceSection}>
            <BrandPrices
              title={"Menjava gum"}
              brandPrices={mechanicData?.info.prices.tyreChange}
            />
          </View>
        </ThemedView>

        <ThemedButton
          buttonType={"small"}
          buttonText={"Preveri proste termine"}
          onPress={() =>
            router.push(`/mechanics/mechanic/appointment/${email}`)
          }
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    gap: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginTop: 20,
  },
  sectionContainer: {
    gap: 5,
  },
  priceContainer: {
    padding: 15,
    borderRadius: 4,
    gap: 10,
  },
  priceSection: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: Colors.light.inactiveBorder,
    paddingTop: 8,
  },
});
