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
          <Stack.Screen name="customer/[id]" options={{ headerShown: false }} />
          <Stack.Screen
            name="customer/edit/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="repair/index" options={{ headerShown: false }} />
          <Stack.Screen name="repair/edit" options={{ headerShown: false }} />
          <Stack.Screen
            name="repair/add/[id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
