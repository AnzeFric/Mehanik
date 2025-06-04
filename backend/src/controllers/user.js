const userService = require("../services/user");

const userController = {
  async getUser(req, res, next) {
    try {
      console.log(`Get user. Req from: ${req.user}, data: ${req.body}`);
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
      console.log(`Patch user. Req from: ${req.user}, data: ${req.body}`);
      const allowedFields = [
        "firstName",
        "lastName",
        "first_name",
        "last_name",
      ];

      const forbiddenField = Object.keys(req.body).find(
        (field) => !allowedFields.includes(field)
      );
      if (forbiddenField) {
        return res.status(403).json({
          success: false,
          message: `Field '${forbiddenField}' is not allowed`,
        });
      }

      const fieldMappings = {
        firstName: "first_name",
        first_name: "first_name",
        lastName: "last_name",
        last_name: "last_name",
      };

      const updateData = {};
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined && req.body[field] !== null) {
          updateData[fieldMappings[field]] = req.body[field];
        }
      });

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
      console.log(`Disable user. Req from: ${req.user}, data: ${req.body}`);
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

module.exports = userController;
