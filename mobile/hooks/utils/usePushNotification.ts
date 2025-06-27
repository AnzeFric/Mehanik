import { API_BASE_URL } from "@/constants/config";
import useAuthStore from "@/stores/accounts/useAuthStore";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

export function usePushNotification() {
  const { jwt } = useAuthStore();

  const savePushToken = async (pushToken: string) => {
    try {
      const data = await fetch(`${API_BASE_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
        body: JSON.stringify({
          pushToken: pushToken,
          platform: Platform.OS,
        }),
      }).then((response) => response.json());

      if (data.success) {
        return true;
      }
      console.log("Error saving push token: ", data.message);
      return false;
    } catch (error) {
      console.error("Error while saving push token: ", error);
      return false;
    }
  };

  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (!Device.isDevice) {
      console.warn("Must use physical device for push notifications");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.warn(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      console.warn("Project ID not found");
    }

    try {
      const pushToken = await Notifications.getExpoPushTokenAsync({
        projectId,
      });
      return pushToken.data;
    } catch (error) {
      console.error("Error while registering push token: ", error);
    }
  };

  const initializeNotifications = async () => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldShowAlert: true,
      }),
    });
    const pushToken = await registerForPushNotificationsAsync();
    if (pushToken) {
      await savePushToken(pushToken);
    }
  };

  return {
    savePushToken,
    initializeNotifications,
  };
}
