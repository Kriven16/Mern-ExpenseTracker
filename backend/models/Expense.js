import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    icon: { 
        type: String 
    },
    category: { // Example: Food, Rent, Groceries
        type: String, 
        required: true 
    }, 
    amount: { 
        type: Number, 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
}, { timestamps: true });

// Export the Mongoose Model
export default mongoose.model("Expense", ExpenseSchema);