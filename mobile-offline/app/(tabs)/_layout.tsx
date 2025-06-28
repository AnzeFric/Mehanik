import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StackLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="customer/add" options={{ headerShown: false }} />
        <Stack.Screen name="customer/[uuid]" options={{ headerShown: false }} />
        <Stack.Screen
          name="customer/edit/[uuid]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="repair/[uuid]" options={{ headerShown: false }} />
        <Stack.Screen
          name="repair/add/[uuid]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="repair/edit/[uuid]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SafeAreaView>
  );
}
