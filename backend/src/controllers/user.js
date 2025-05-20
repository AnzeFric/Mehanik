const userService = require("../services/user");

const userController = {
  async me(req, res, next) {
    try {
      const user = await userService.getUserByEmail(req.user.email);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
