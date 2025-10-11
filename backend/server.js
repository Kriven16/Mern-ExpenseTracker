import dotenv from 'dotenv';
import express, { urlencoded } from "express";
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';

import authRoutes from "./routes/authRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import { connectDB } from './config/db.js';



dotenv.config()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const PORT = process.env.PORT

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/income",incomeRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/dashboard",dashboardRoutes)


//server uploads folder
app.use("/uploads",express.static(path.join(__dirname,'uploads')))


app.listen(PORT,()=>{
console.log(`Server is running on port :${PORT}`)
connectDB()
})


