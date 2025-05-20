const authService = require("../services/auth");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password, name, accountType } = req.body;

      await authService.register({
        email,
        password,
        name,
        accountType,
      });

      res.status(201).json({
        message: "Registration successful",
      });
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.json({
        message: "Login successful",
        user: result.user,
        session: result.session,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
