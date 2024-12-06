import express from "express";
const { 
    checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail 
} =
require("../controller/userController");
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

// Route for authentication check
router.get("/check-auth", isAuthenticated, checkAuth);

// User-related routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

// Email verification and password recovery routes
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Profile management
router.put("/profile/update", isAuthenticated, updateProfile);

export default router;
