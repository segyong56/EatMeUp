const { Router } = require("express");
const {
  addFood,
  getFood,
  modFood,
  delFood,
} = require("../controllers/myFoodController");
const { auth } = require("../utils/checkAuth");

const foodRouter = Router();

foodRouter.route("/info").all(auth).post(addFood).get(getFood);

foodRouter.route("/info/:id").all(auth).put(modFood).delete(delFood);

module.exports = foodRouter;
