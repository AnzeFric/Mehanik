const supabase = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const notificationService = {
  async savePushTokenByUserUuid(userUuid, token, platform) {
    const uuid = uuidv4();

    const { error } = await supabase.from("notifications").insert({
      uuid: uuid,
      token: token,
      active: true,
      fk_user: userUuid,
      platform: platform,
    });

    if (error) throw new Error(`(Save token) Database error: ${error.message}`);

    return true;
  },

  async sendPushNotification(expoPushToken, title, body) {
    const expoAccessToken = process.env.EXPO_PUBLIC_ACCESS_TOKEN;

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + expoAccessToken,
      },
      body: JSON.stringify({
        to: expoPushToken,
        sound: "default",
        title: title,
        body: body,
      }),
    });
  },
};

module.exports = notificationService;
