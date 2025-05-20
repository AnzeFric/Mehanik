const authService = require("../services/auth");

const authController = {
  async register(req, res, next) {
    try {
      console.log("User register req: ", req.body);
      const { email, password, firstName, lastName, accountType } = req.body;
      const registeredEmail = await authService.register(
        email,
        password,
        firstName,
        lastName,
        accountType
      );
      res.status(200).send({
        success: true,
        message: `Registration successful`,
        email: registeredEmail,
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      res
        .status(200)
        .send({ success: true, message: "Login successful", token: token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
