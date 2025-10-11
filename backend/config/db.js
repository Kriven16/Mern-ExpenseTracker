import mongoose  from "mongoose";

export const connectDB =async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successfull")
        
    } catch (error) {
        console.log('connection failed :',error)
        process.exit(1)
        
    }
}