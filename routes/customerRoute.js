import express from 'express';
import { verifyToken } from '../middleware/verifyUser.js';
import { addCustomer, deleteCustomer, getCustomer, updateCustomer } from '../controllers/customerController.js';

const router = express.Router();

router.post('/addCustomer',verifyToken,addCustomer);
router.get('/getCustomer/:phone',verifyToken,getCustomer);
router.put('/updateCustomer/:phone',verifyToken,updateCustomer);
router.delete('/deleteCustomer',verifyToken,deleteCustomer);

export default router;