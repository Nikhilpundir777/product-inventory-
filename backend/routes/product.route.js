import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controller/product.controller.js';



const router=express.Router();

router.post("/",createProduct);

router.delete("/:id",deleteProduct);

router.get("/",getProducts);

router.put("/:id",updateProduct);




export default router;