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
};

module.exports = notificationService;
