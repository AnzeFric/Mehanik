const userService = require("../../services/accounts/user");

const userController = {
  async getUser(req, res, next) {
    try {
      console.log("Get user. Req from: ", req.user);
      console.log("Body: ", req.body);

      const user = await userService.getUserByUuidAndEnabled(req.user.userUuid);
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
      await userService.updateByUuidAndEnabled(req.user.userUuid, updateData);

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

      await userService.disableByUuidAndEnabled(req.user.userUuid);
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async getMechanics(req, res, next) {
    try {
      console.log("Fetch mechanics. Req from: ", req.user);
      console.log("Body: ", req.body);

      const mechanics = await userService.getEnabledMechanics();
      const parsedData = (mechanics || []).map((mechanic) => ({
        firstName: mechanic.first_name,
        lastName: mechanic.last_name,
        email: mechanic.email,
        info: {
          phone: mechanic.mechanics[0].phone,
          address: mechanic.mechanics[0].address,
          city: mechanic.mechanics[0].city,
          prices: mechanic.mechanics[0].prices,
        },
      }));

      return res.status(200).json({
        success: true,
        message: "Mechanics fetched successfully",
        mechanics: parsedData,
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
