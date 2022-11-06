const express = require("express");
const passport=require('passport');
const router = express.Router();
const homeController=require('../controllers/home_controller');
const toDoController=require('../controllers/toDo_controller');

router.post('/signin',homeController.createSession );
router.post("/signup", homeController.register);

router.post(
  "/create-todo",
  passport.authenticate("jwt", { session: false }),
  toDoController.createToDo
);

router.patch(
  "/update-todo/:id",
  passport.authenticate("jwt", { session: false }),
  toDoController.updateToDo
);

router.delete(
  "/todo/:id",
  passport.authenticate("jwt", { session: false }),
  toDoController.deleteToDo
);

module.exports = router;
