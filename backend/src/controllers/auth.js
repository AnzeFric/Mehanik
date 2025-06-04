const authService = require("../services/auth");

const authController = {
  async register(req, res, next) {
    try {
      console.log("Register. Req from: ", req.user);
      console.log("Body: ", req.body);

      const { email, password, firstName, lastName, accountType } = req.body;

      // Validate account type
      if (!["user", "mechanic"].includes(accountType)) {
        return res.status(400).send({
          success: false,
          message: "Invalid account type",
        });
      }

      const registeredEmail = await authService.register(
        email,
        password,
        firstName,
        lastName,
        accountType
      );

      return res.status(201).send({
        success: true,
        message: "Registration successful",
        email: registeredEmail,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      console.log("Login. Req from: ", req.user);
      console.log("Body: ", req.body);

      const { email, password } = req.body;
      const token = await authService.login(email, password);
      return res.status(200).send({
        success: true,
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
