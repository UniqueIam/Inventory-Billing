import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:Number
    },
    category:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }
},{timestamp:true})

const Product = mongoose.model('Product',productSchema);

export default Product;