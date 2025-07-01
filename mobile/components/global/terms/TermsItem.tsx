import { StyleSheet } from "react-native";
import { router } from "expo-router";
import ThemedButton from "@/components/global/themed/ThemedButton";

interface Props {
  id: number;
  title: string;
}

export default function TermsItem({ id, title }: Props) {
  const handlePress = () => {
    router.push(`../terms/items/${id}`);
  };

  return (
    <ThemedButton
      buttonType={"option-change"}
      buttonText={title}
      onPress={handlePress}
      buttonStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "flex-start",
  },
});
