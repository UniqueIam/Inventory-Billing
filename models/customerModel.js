import mongoose from "mongoose";
import { trim } from "zod";
import { required } from "zod/mini";

const customerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        trim:true
    },
    address:{
        type:String
    },
    customerType:{
        type: String,
        enum: ['customer', 'vendor'],
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Customer = mongoose.model('Customer',customerSchema);

export default Customer;