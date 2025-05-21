import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/global/LoadingScreen";

export default function HomeScreen() {
  const { accountType, getUser } = useUser();
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
            handleLogout();
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
    return <LoadingScreen />;
  }

  return isLoggined ? (
    accountType === "user" ? (
      <Redirect href="/(tabs-user)" />
    ) : (
      <Redirect href="/(tabs-mechanic)" />
    )
  ) : (
    <Redirect href="/(auth)/login" />
  );
}
