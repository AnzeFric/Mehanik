import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import { AppStyles } from "@/constants/Styles";
import ThemedView from "../global/themed/ThemedView";
import ThemedText from "../global/themed/ThemedText";
import ThemedIcon from "../global/themed/ThemedIcon";

interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
}

export default function TitleRow({ title, hasBackButton, menuButton }: Props) {
  return (
    <ThemedView style={styles.container}>
      {hasBackButton && (
        <ThemedIcon
          name={"arrow-back"}
          size={28}
          style={styles.backArrow}
          onPress={() => {
            router.back();
          }}
        />
      )}
      <ThemedText
        style={[
          AppStyles.bigTitle,
          styles.titleText,
          hasBackButton && { paddingLeft: 40 },
        ]}
      >
        {title}
      </ThemedText>
      {menuButton && <View style={styles.menuIcon}>{menuButton}</View>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 20,
    paddingHorizontal: 25,
  },
  backArrow: {
    alignSelf: "center",
  },
  titleText: {
    flex: 1,
    textAlign: "left",
  },
  menuIcon: {
    justifyContent: "center",
  },
});
