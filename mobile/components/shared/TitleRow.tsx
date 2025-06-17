import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { router } from "expo-router";
import ThemedView from "../global/themed/ThemedView";
import ThemedText from "../global/themed/ThemedText";
import ThemedIcon from "../global/themed/ThemedIcon";

interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function TitleRow({
  title,
  hasBackButton,
  menuButton,
  style,
}: Props) {
  return (
    <ThemedView type={"background"} style={[styles.container, style]}>
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
        type={"bigTitle"}
        style={[styles.titleText, hasBackButton && { paddingLeft: 40 }]}
        animatedTheme
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
