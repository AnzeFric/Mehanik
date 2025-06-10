import { Stack } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="settings" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="terms/index" />
        <Stack.Screen name="terms/items/[id]" />
      </Stack>
    </View>
  );
}
