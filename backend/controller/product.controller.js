import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts=async(req,res)=>{
    try{
        const allproducts=await Product.find({});
        res.status(200).json({success:true,data:allproducts});


    }
    catch(error){
        console.log("error in fetching products",error.message)
        res.status(500).json({success:false,message:"server error"})
    }

}

export const createProduct=async (req,res)=>{
    const product=req.body;
    if(!product.name|| !product.price || !product.image){
        res.status(400).json({success:false,message:"missing fields"});
    }
    const newproduct=new Product(product);
    try{
        await newproduct.save();
        res.status(200).json({success:true,message:"product added successfully",data:newproduct})
    }
    catch(error){
        console.error("Error adding product",error.message);
        res.status(500).json({success:false ,message:"Server error"});
    }


}

export const updateProduct=async (req,res)=>{
    const {id}=req.params;
    const product=req.body
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid product id"})
    }


    try{
        const updatedproduct=await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true,data:updatedproduct})

    }
    catch(error){
        res.status(500).json({success:false,message:"server error"})
    }
   
}

export const deleteProduct=async (req,res)=>{
    const {id}=req.params;
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"product deleted successfully"})


    }
    catch(error){
        res.status(400).json({success:false,message:"item not found "})
    }
}