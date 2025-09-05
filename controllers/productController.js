import mongoose from "mongoose";
import Product from "../models/productModel.js";
import { success } from "zod";

export const addProduct = async (req, res) => {
  try {
    const { id } = req.user; 
    console.log("user:", id);

    const { productName, description, price, stock, category } = req.body;

    // validate input
    if (!productName || !description || !price || !stock || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to add product",
      });
    }

    const userId = id;
        // check if this product already exists for the same user
       let product = await Product.findOne({
        userId:new mongoose.Types.ObjectId(userId),
        name:productName
       });

    console.log("product:",product);
    if (product) {
      // update stock if product already exists
      product.stock += Number(stock); 
      await product.save();

      return res.status(200).json({
        success: true,
        message: "Product stock updated successfully",
        product,
      });
    }

    // if not exists, create new product
    product = await Product.create({
      name:productName,
      description,
      price,
      stock,
      category,
      userId: id,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getProduct = async(req,res) =>{
    const { id } = req.user;
    const { productName } = req.params;
    console.log("productName:",productName);
    try {
        if(!productName){
            return res.status(404).json({
                message:'Product name is required to get the product detils'
            })
        }
        //checking user has the access or not to get the product
       const productAccess = await Product.findOne({
            userId:new mongoose.Types.ObjectId(id),
            name:productName
        })
        if(!productAccess){
            return res.status(409).json({
                message:`Don't have access to get this product or product not found`
            })
        }
        return res.status(200).json({
            success:true,
            message:'Successfully fetched products',
            product:productAccess
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);   
    }
}

export const updateProduct = async(req,res) =>{
    const { id } = req.user;
    const { productId,productName,stock,description,price,category } = req.body;
    try { 
        if(!productId){
            return res.status(404).json({
                message:'Product Id is required to update the product'
            })
        }
        const product = await Product.findOne({
            userId:new mongoose.Types.ObjectId(id),
            _id:new mongoose.Types.ObjectId(productId)
        })
        if(!product){
            return res.status(404).json({
                message:'Product is not found or user have not access to update this product'
            })
        }
        //update the product
        if (productName) product.name = productName;
        if (stock !== undefined) product.stock = stock;
        if (description) product.description = description;
        if (price !== undefined) product.price = price;
        if (category) product.category = category;

        await product.save();

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:'Internal server error',
            error:error.message
        })
    }
}

export const deleteProduct = async(req,res) =>{
    const {id} = req.user;
    const { productId } = req.body;

    try {
        if(!productId){
            return res.status(404).json({
                message:'Product Id is required to delete the product'
            })
        }

        const product = await Product.findOne({
            userId:new mongoose.Types.ObjectId(id),
            _id:new mongoose.Types.ObjectId(productId)
        })
        if(!product){
            return res.status(409).json({
                message:'Product not found or user has not access to delete this product'
            })
        }
        // delete product
        await Product.deleteOne({ _id: productId });

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
    });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}