import { Router } from "express";
import {
  getAllUsers,     // Controller to fetch all users
  userLogin,       // Controller to handle user login
  userLogout,      // Controller to handle user logout
  userSignup,      // Controller to handle user signup
  verifyUser,      // Controller to verify user authentication
} from "../controllers/user-controllers.js";

import {
  loginValidator,    // Validation rules for login data
  signupValidator,   // Validation rules for signup data
  validate,          // Middleware to apply validation rules
} from "../utils/validators.js";

import { verifyToken } from "../utils/token-manager.js";

// Initialize a new router instance for user-related routes
const userRoutes = Router();

// Route to get all users, handled by the getAllUsers controller
userRoutes.get("/", getAllUsers);

// Route to sign up a new user; validates data before passing to userSignup controller
userRoutes.post("/signup", validate(signupValidator), userSignup);

// Route to log in a user; validates data before passing to userLogin controller
userRoutes.post("/login", validate(loginValidator), userLogin);

// Route to check user authentication status, verifies token and calls verifyUser
userRoutes.get("/auth-status", verifyToken, verifyUser);

// Route to log out a user; verifies token before passing to userLogout controller
userRoutes.get("/logout", verifyToken, userLogout);

// Export the router for use in other parts of the application
export default userRoutes;

