import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppStyles } from "@/constants/Styles";

interface Props {
  title: string;
  hasBackButton: boolean;
  menuButton?: React.ReactNode;
}

export default function TitleRow({ title, hasBackButton, menuButton }: Props) {
  return (
    <View style={styles.container}>
      {hasBackButton && (
        <Ionicons
          name={"arrow-back"}
          size={28}
          style={styles.backArrow}
          onPress={() => {
            router.back();
          }}
        />
      )}
      <Text
        style={[
          AppStyles.bigTitle,
          styles.titleText,
          hasBackButton && { paddingLeft: 40 },
        ]}
      >
        {title}
      </Text>
      {menuButton && <View style={styles.menuIcon}>{menuButton}</View>}
    </View>
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
    color: "#000000",
  },
  titleText: {
    flex: 1,
    textAlign: "left",
  },
  menuIcon: {
    justifyContent: "center",
  },
});
