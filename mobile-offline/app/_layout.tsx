import { Stack } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemedStatusBar from "@/components/global/themed/ThemedStatusBar";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { View } from "react-native";
import ThemedView from "@/components/global/themed/ThemedView";

function RootLayoutContent() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    NavigationBar.setVisibilityAsync("hidden");
  }, []);

  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <ThemedView
        type={"background"}
        style={{ flex: 1, paddingTop: insets.top }}
      >
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
      </ThemedView>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RootLayoutContent />
    </SafeAreaProvider>
  );
}
