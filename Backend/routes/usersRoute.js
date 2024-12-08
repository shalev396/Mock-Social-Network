//imports
import express from "express";
import validator from "../middleware/validator.js";
import userController from "../controllers/userController.js";
import authenticator from "../middleware/Authenticator.js";

const router = express.Router();

// Public routes (no auth required)

//Post

//Create user
router.post(
  "/signup",
  validator.validateUser.createUserValidation,
  userController.createUser
);

//Login user
router.post(
  "/login",
  validator.validateUser.loginUserValidation,
  userController.loginUser
);

//verify if detail are uniq
router.post(
  "/verify",
  validator.validateUser.verifyUniqueValidation,
  userController.verifyUnique
);

// Protected routes (require auth)
router.use(authenticator);

//Get
//Get the user details of the user who made the request
router.get("/self", userController.getSelf);

//Get array of users by the username
router.get(
  "/search/:username",
  validator.validateUser.getUsersByUsernameValidation,
  userController.getUsersByUsername
);

//get user by id
router.get(
  "/:id",
  validator.validateUser.getUserByIdValidation,
  userController.getUserById
);

//Post
//edit user
router.post(
  "/edit",
  validator.validateUser.editUserValidation,
  userController.editUser
);
//follow user by id
router.post(
  "/follow/:id",
  validator.validateUser.followUserByIdValidation,
  userController.followUserById
);

export default router;
