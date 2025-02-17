import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

const loadFonts = async () => {
  await Font.loadAsync({
    "Jaldi-Regular": require("@/assets/fonts/Jaldi-Regular.ttf"),
    "Jaldi-Bold": require("@/assets/fonts/Jaldi-Bold.ttf"),
  });
};

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs-user)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs-mechanic)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}
