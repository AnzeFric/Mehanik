import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemedStatusBar from "@/components/global/themed/ThemedStatusBar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ThemedStatusBar />
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="customer/add" options={{ headerShown: false }} />
          <Stack.Screen
            name="customer/[uuid]"
            options={{ headerShown: false }}
          />
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
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
