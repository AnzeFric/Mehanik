import { API_BASE_URL } from "@/constants/Config";
import useAuthStore from "@/stores/accounts/useAuthStore";

export function usePushNotification() {
  const { jwt } = useAuthStore();

  const savePushToken = async (pushToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          pushToken: pushToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        return true;
      }
      console.log("Error saving push token: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving push token: ", error);
    }
  };

  return {
    savePushToken,
  };
}
