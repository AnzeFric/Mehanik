const notificationService = require("../services/notification");

const notificationController = {
  async savePushToken(req, res, next) {
    try {
      console.log("Save notification token. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userUuid = req.user.userUuid;
      const token = req.body.pushToken;

      await notificationService.savePushTokenByUserUuid(userUuid, token);

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
