const mechanicService = require("../services/mechanic");

const mechanicController = {
  async getMechanics(req, res, next) {
    try {
      console.log("All mechanics fetch: ", req.user);
      const mechanics = await mechanicService.getMechanics();
      res.status(200).send({
        success: true,
        message: "Mechanics fetch successful",
        mechanics: mechanics,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = mechanicController;
