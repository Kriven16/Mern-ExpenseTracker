import express from "express";
import {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} from "../controllers/expenseController.js"; // Note the .js extension
import { protect } from "../middleware/authMiddleware.js"; // Note the .js extension

const router = express.Router();

// 💡 NOTE: The original code had a likely typo on the /add route, 
// using getAllExpense as the handler for POST /add. This is corrected below.

router.post("/add", protect, addExpense);               // POST to add a new expense
router.get("/get", protect, getAllExpense);             // GET all expenses
router.get("/downloadexcel", protect, downloadExpenseExcel); // GET to download expense data
router.delete("/:id", protect, deleteExpense);          // DELETE a specific expense

export default router; // ES Module export