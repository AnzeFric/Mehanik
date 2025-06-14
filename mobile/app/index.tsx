import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/global/LoadingScreen";
import useUserStore from "@/stores/useUserStore";
import ThemedView from "@/components/global/themed/ThemedView";

export default function HomeScreen() {
  const { getUser } = useUser();
  const { currentUser } = useUserStore();
  const { isLoggined, expiredTimestamp, handleLogout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        if (isLoggined) {
          const now = Date.now();
          const tokenExpiresAt = new Date(expiredTimestamp * 1000);
          const timeRemaining = tokenExpiresAt.getTime() - now;
          const threshold = 4 * 24 * 60 * 60 * 1000; // 4 days

          if (timeRemaining < threshold) {
            // Timeout to ensure router is ready before logout
            setTimeout(() => {
              handleLogout();
            }, 100);
            setLoading(false);
            return;
          }

          await getUser();
        }
        setLoading(false);
      } catch (error) {
        console.error("Initialization error:", error);
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (loading) {
    return <LoadingScreen type={"full"} text={"Nalaganje..."} />;
  }

  return (
    <ThemedView type={"background"} style={{ flex: 1 }}>
      {isLoggined ? (
        currentUser.accountType === "user" ? (
          <Redirect href="/(tabs-user)" />
        ) : (
          <Redirect href="/(tabs-mechanic)" />
        )
      ) : (
        <Redirect href="/(auth)/login" />
      )}
    </ThemedView>
  );
}
