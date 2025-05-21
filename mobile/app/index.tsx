import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/global/LoadingScreen";

export default function HomeScreen() {
  const { accountType } = useUser();
  const { isLoggined, expiredTimestamp, handleLogout } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = Date.now();
    const tokenExpiresAt = expiredTimestamp * 1000; // Convert to milliseconds

    const timeRemaining = tokenExpiresAt - now;
    const threshold = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds

    if (timeRemaining < threshold) {
      handleLogout();
    }
    setLoading(false);
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
