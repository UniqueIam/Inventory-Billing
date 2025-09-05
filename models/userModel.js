import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    }
},{timestamps:true})

const User = mongoose.model('User',UserSchema);

export default User;