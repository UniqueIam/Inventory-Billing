import Transaction from "../models/transactionModel.js";
import Product from "../models/productModel.js";

export const getTransactionsReport = async (req, res) => {
  try {
    const { transactionType, startDate, endDate } = req.query;
    const { id } = req.user;
    const query = id;

    if (transactionType) query.transactionType = transactionType;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query)
      .populate("customerOrVendorId", "name email phone")
      .populate("products.productId", "name category");

    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getInventoryReport = async (req, res) => {
    const { id } = req.user;
  try {
    const products = await Product.find({
        userId:new mongoose.Types.ObjectId(id)
    });

    res.json({
      success: true,
      data: products.map((p) => ({
        productId: p._id,
        name: p.name,
        category: p.category,
        stock: p.stock,
        price: p.price,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

