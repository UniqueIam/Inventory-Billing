import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import { addProduct, deleteProduct, getProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.post('/addProduct',verifyToken,addProduct);
router.get('/getProduct/:productName',verifyToken,getProduct);
router.put('/updateProduct',verifyToken,updateProduct);
router.delete('/deleteProduct',verifyToken,deleteProduct);

export default router;