//imports
import express from "express";
import validator from "../middleware/validator.js";
import userController from "../controllers/userController.js";
import authenticator from "../middleware/Authenticator.js";

const router = express.Router();

// Public routes (no auth required)
router.post(
  "/signup",
  validator.validateUser.createUserValidation,
  userController.createUser
);
router.post(
  "/login",
  validator.validateUser.loginUserValidation,
  userController.loginUser
);
router.post(
  "/verify",
  validator.validateUser.verifyUniqueValidation,
  userController.verifyUnique
);

// Protected routes (require auth)
router.use(authenticator); // Apply authenticator middleware to all routes below this line
// Add protected user routes here
// For example: profile, settings, etc.

export default router;
