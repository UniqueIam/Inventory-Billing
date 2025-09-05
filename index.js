import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {dbConnection} from './db/db.js';
import authRoutes from './routes/authRoute.js';
import productRoutes from './routes/productRoute.js';
import customerRoutes from './routes/customerRoute.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(
    cors({
        origin:"*",         //frontend url,for now using * means publicily accessible from any where
        Credentials:"true"
    })
)
//database connection
dbConnection();

app.get('/',async(req,res)=>{
    res.send('Hii backend');
})

app.use(express.json());

//routes
app.use('/auth',authRoutes);
app.use('/api',productRoutes);
app.use('/api',customerRoutes);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})