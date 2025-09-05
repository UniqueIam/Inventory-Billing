import mongoose from "mongoose";

export const dbConnection = async() =>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}