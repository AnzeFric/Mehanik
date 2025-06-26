const notificationService = require("../services/notification");

const notificationController = {
  async savePushToken(req, res, next) {
    try {
      console.log("Save notification token. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;
      const token = req.body.pushToken;
      const platform = req.body.platform;

      if (!token) throw new Error("Token is not provided");
      if (!platform) throw new Error("Platform data is not provided");

      const allowedPlatforms = ["android", "ios"];
      if (!allowedPlatforms.includes(platform)) {
        throw new Error("Platform data is not allowed");
      }

      const foundToken =
        await notificationService.getPushTokenByUserUuid(userUuid);

      // If user has not token or if the user changed phone
      if (!foundToken || token != foundToken) {
        await notificationService.savePushTokenByUserUuid(
          userUuid,
          token,
          platform
        );
      }

      return res.status(200).json({
        success: true,
        message: "Notification push token saved successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = notificationController;
