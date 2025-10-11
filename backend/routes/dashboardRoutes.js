import express from "express";
import { protect } from "../middleware/authMiddleware.js"; // Note the .js extension
import { getDashboardData } from "../controllers/dashboardController.js"; // Note the .js extension

const router = express.Router();

router.get("/", protect, getDashboardData);

export default router; // ES Module export