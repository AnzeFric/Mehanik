const userService = require("../services/user");

const userController = {
  async me(req, res, next) {
    try {
      console.log("User self fetch req: ", req.user);
      const user = await userService.getUserByEmailAndEnabled(req.user.email);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      console.log("User update req: ", req.user);
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
      res.status(200).json({
        success: true,
        message: "User updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async disable(req, res, next) {
    try {
      console.log("User disable req: ", req.user);
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
