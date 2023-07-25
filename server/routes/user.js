const { Router } = require("express");

const userController = require("../controllers/user");

const authenticator = require("../middleware/authenticator");

const userRouter = Router();

userRouter.post("/register", userController.register);

userRouter.post("/login", userController.login);

userRouter.delete("/logout", userController.logout);

userRouter.get("/", userController.index);

userRouter.get("/:id", userController.show);

userRouter.post("/", userController.create);

userRouter.patch("/:id", userController.update);

userRouter.delete("/:id", userController.destroy);

module.exports = userRouter;
