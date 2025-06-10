import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
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
  );
}
