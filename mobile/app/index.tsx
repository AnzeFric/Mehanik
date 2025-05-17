import { Redirect } from "expo-router";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export default function HomeScreen() {
  const { accountType } = useUser();
  const { isLoggined } = useAuth();

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
