import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import productRoutes from './routes/product.route.js';


const app=express();
app.use(express.json());

dotenv.config()
const PORT=process.env.PORT


app.use("/api/products",productRoutes);










app.listen(PORT||5000,()=>{
    connectDB();
    console.log(`Server running on Port ${PORT}`);
})
