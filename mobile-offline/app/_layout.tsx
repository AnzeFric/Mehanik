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
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="customer/add" options={{ headerShown: false }} />
          <Stack.Screen
            name="customer/detail"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="customer/edit" options={{ headerShown: false }} />
          <Stack.Screen name="repair/detail" options={{ headerShown: false }} />
          <Stack.Screen name="repair/edit" options={{ headerShown: false }} />
          <Stack.Screen name="repair/add" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
