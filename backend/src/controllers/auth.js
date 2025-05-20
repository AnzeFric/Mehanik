const authService = require("../services/auth");
const sendResponse = require("../utils/responseHandler");
const ApiResponse = require("../utils/ApiResponse");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password, name, accountType } = req.body;
      const registeredEmail = await authService.register(
        email,
        password,
        name,
        accountType
      );
      return sendResponse(
        res,
        ApiResponse.success("Registration successful!", registeredEmail)
      );
    } catch (error) {
      next(error);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const token = await authService.login(email, password);
      return sendResponse(res, ApiResponse.success("Login successful!", token));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
