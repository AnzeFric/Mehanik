const userService = require("../../services/accounts/user");

const userController = {
  async getUser(req, res, next) {
    try {
      console.log("Get user. Req from: ", req.user);
      console.log("Body: ", req.body);

      const user = await userService.getUserByEmailAndEnabled(req.user.email);
      return res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async patchUser(req, res, next) {
    try {
      console.log("Patch user. Req from: ", req.user);
      console.log("Body: ", req.body);

      const userData = req.body.userData;
      if (!userData) throw new Error("User data is not provided");

      const updateData = {};
      if (userData.firstName !== undefined) {
        updateData.first_name = userData.firstName;
      }
      if (userData.lastName !== undefined) {
        updateData.last_name = userData.lastName;
      }

      await checkInput(userData);
      await userService.updateByEmailAndEnabled(req.user.email, updateData);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async disableUser(req, res, next) {
    try {
      console.log("Disable user. Req from: ", req.user);
      console.log("Body: ", req.body);

      await userService.disableByEmailAndEnabled(req.user.email);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

async function checkInput(userData) {
  const allowedFields = ["firstName", "lastName"];

  const forbiddenField = Object.keys(userData).find(
    (field) => !allowedFields.includes(field)
  );
  if (forbiddenField) {
    const error = new Error(`Field '${forbiddenField}' is not allowed`);
    error.status = 403;
    throw error;
  }
}

module.exports = userController;
