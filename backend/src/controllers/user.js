const userService = require("../services/user");

const userController = {
  async me(req, res, next) {
    try {
      console.log("User self fetch req: ", req.body);
      const user = await userService.getUserByEmailAndEnabled(req.user.email);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async disable(req, res, next) {
    try {
      console.log("User disable req: ", req.body);
      await userService.disableByEmailAndEnabled(req.user.email);
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
