import express from "express";
import {getTransactionsReport,getInventoryReport} from "../controllers/reportController.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = express.Router();

router.get("/transactions", verifyToken, getTransactionsReport);
router.get("/inventory", verifyToken, getInventoryReport);

export default router;
