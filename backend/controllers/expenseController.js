import Expense from "../models/Expense.js"; // Import the Mongoose model
import xlsx from "xlsx"
export const addExpense = async (req, res) => {
  // userId is attached to req.user.id by the 'protect' middleware
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation: Check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new expense instance
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date), // Ensure date is stored as a Date object
    });

    // Save the expense to the database
    await newExpense.save();

    // Respond with the newly created expense
    res.status(200).json(newExpense);
  } catch (error) {
    console.error("Error adding expense:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllExpense = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteExpense = async (req, res) => {
  try {
    const deleteExpense = await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: deleteExpense });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const downloadExpenseExcel =async(req,res)=>{
    const userId = req.user.id;
    
    

    try {
        const expense = await Expense.find({userId}).sort({date:-1})

        const data = expense.map((item)=>({ 
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }))
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb,ws,"Expense")
        xlsx.writeFile(wb,"expense_details.xlsx")
        res.download("expense_details.xlsx")
        
    } catch (error) {

        console.log(error.message) 
        res.status(500).json({message:"Server Error"})
        
    }


}