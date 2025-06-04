const mechanicService = require("../services/mechanic");

const mechanicController = {
  async getMechanics(req, res, next) {
    try {
      console.log("Get mechanics. Req from: ", req.user);
      console.log("Body: ", req.body);

      const mechanics = await mechanicService.getMechanics();
      return res.status(200).send({
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
