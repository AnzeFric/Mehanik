const userService = require("../../services/accounts/user");
const mechanicService = require("../../services/accounts/mechanic");

const userController = {
  async getUser(req, res, next) {
    try {
      console.log("Get user. Req from: ", req.user);
      console.log("Body: ", req.body);

      if (req.user.mechanicUuid) {
        const foundMechanic = await userService.getMechanicByUserUuidAndEnabled(
          req.user.userUuid
        );
        var user = {
          firstName: foundMechanic.first_name,
          lastName: foundMechanic.last_name,
          email: foundMechanic.email,
          accountType: foundMechanic.account_type,
          info: {
            phone: foundMechanic.mechanics[0].phone,
            address: foundMechanic.mechanics[0].address,
            city: foundMechanic.mechanics[0].city,
            prices: foundMechanic.mechanics[0].prices,
          },
        };
      } else {
        const foundUser = await userService.getUserByUuidAndEnabled(
          req.user.userUuid
        );
        var user = {
          firstName: foundUser.first_name,
          lastName: foundUser.last_name,
          email: foundUser.email,
          accountType: foundUser.account_type,
        };
      }

      return res.status(200).json({
        success: true,
        message: "User fetch successful",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  async patchUser(req, res, next) {
    try {
      console.log("Patch user. Req from: ", req.user);
      console.log("Body: ", JSON.stringify(req.body));

      const userData = req.body.userData;
      const mechanicData = req.body.mechanicData;

      if (!userData) throw new Error("User data is not provided");
      if (userData.accountType === "mechanic")
        if (!mechanicData) throw new Error("Mechanic data is not provided");

      const userFields = {
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        account_type: userData.accountType,
      };

      await checkInput(userData);
      await userService.updateUserByUuidAndEnabled(
        req.user.userUuid,
        userFields
      );

      if (mechanicData) {
        const mechanicFields = {
          address: mechanicData.address,
          city: mechanicData.city,
          image: mechanicData.image,
          phone: mechanicData.phone,
          prices: mechanicData.prices,
        };
        await mechanicService.updateMechanicByUuid(
          req.user.mechanicUuid,
          mechanicFields
        );
      }

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
  const allowedFields = [
    "firstName",
    "lastName",
    "address",
    "city",
    "image",
    "phone",
    "prices",
  ];

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
