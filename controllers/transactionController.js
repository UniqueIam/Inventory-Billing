import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";
import Product from "../models/productModel.js";

export const addTransaction = async (req, res) => {
  try {
    const { id } = req.user; 
    const { transactionType, customerOrVendorId, products } = req.body;

    if (!transactionType || !["sale", "purchase"].includes(transactionType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing transactionType (must be 'sale' or 'purchase')",
      });
    }

    if (!customerOrVendorId || !mongoose.Types.ObjectId.isValid(customerOrVendorId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing customer/vendor ID",
      });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product is required in the transaction",
      });
    }

    let totalAmount = 0;
    const validatedProducts = [];

    for (const item of products) {
      if (
        !item.productId ||
        !mongoose.Types.ObjectId.isValid(item.productId) ||
        !item.quantity ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product entry (productId and quantity required)",
        });
      }

      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.productId} not found`,
        });
      }

      const price = item.price || product.price; 
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      validatedProducts.push({
        productId: item.productId,
        quantity: item.quantity,
        price,
      });
    }

    const transaction = await Transaction.create({
      transactionType,
      customerOrVendorId,
      products: validatedProducts,
      totalAmount,
      userId: id,
    });

    return res.status(201).json({
      success: true,
      message: "Transaction added successfully",
      transaction,
    });
  } catch (error) {
    console.error("Error in addTransaction:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getTransactions = async (req, res) => {
  const { id } = req.user;

  try {
    const transactions = await Transaction.find({ userId: id })
      .populate("customerOrVendorId", "name email phone")  
      .populate("products.productId", "productName price"); 

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No transactions found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error in getTransactions:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
