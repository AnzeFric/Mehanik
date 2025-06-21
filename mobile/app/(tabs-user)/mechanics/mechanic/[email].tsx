import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect, useCallback, useRef } from "react";
import { Colors } from "@/constants/Colors";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { DayType, MechanicData } from "@/interfaces/user";
import useMechanicStore from "@/stores/accounts/useMechanicStore";
import TitleRow from "@/components/shared/TitleRow";
import ThemedView from "@/components/global/themed/ThemedView";
import ThemedText from "@/components/global/themed/ThemedText";
import BrandPrices from "@/components/user/items/BrandPrices";
import ThemedButton from "@/components/global/themed/ThemedButton";

const dayLabels: Record<DayType, string> = {
  pon: "Ponedeljek",
  tor: "Torek",
  sre: "Sreda",
  čet: "Četrtek",
  pet: "Petek",
  sob: "Sobota",
  ned: "Nedelja",
};

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
              <ThemedText type={"small"}>
                {mechanicData.info.address}
              </ThemedText>
            )}
            {mechanicData?.info.city && (
              <ThemedText type={"small"}>
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
            <ThemedText type={"small"}>{mechanicData.info.phone}</ThemedText>
          )}
          {mechanicData?.email && (
            <ThemedText type={"small"}>{mechanicData.email}</ThemedText>
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

        <ThemedView type={"secondary"} style={styles.priceContainer}>
          <ThemedText type={"title"} bold>
            Delovnik
          </ThemedText>
          {mechanicData?.info.workHours?.map((workHour, index) => (
            <View style={styles.priceSection} key={index}>
              <ThemedText type={"small"} bold>
                {dayLabels[workHour.day]}
                <ThemedText type={"extraSmall"}>
                  {workHour.isOpen ? ", Odprto" : ", Zaprto"}
                </ThemedText>
              </ThemedText>
              <View>
                {workHour.isOpen &&
                  workHour.shifts.map((shift, index) => (
                    <View style={{ flexDirection: "row", gap: 10 }} key={index}>
                      <ThemedText type={"extraSmall"}>
                        Od: {shift.start}
                      </ThemedText>
                      <ThemedText type={"extraSmall"}>
                        Do: {shift.end}
                      </ThemedText>
                    </View>
                  ))}
              </View>
            </View>
          ))}
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
    paddingTop: 8,
    gap: 5,
  },
});
