import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.post('/addTransaction',verifyToken,addTransaction);
router.get('/getTransaction',verifyToken,getTransactions);

export default router;