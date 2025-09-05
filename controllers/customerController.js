import mongoose from "mongoose";
import Customer from "../models/customerModel.js";
import e from "express";

export const addCustomer = async(req,res) =>{
    const { id } = req.user;
    const { name,phone,email,address,customerType } = req.body;
    try {
        if(!name||!phone|| !address ||!customerType){
            return res.status(404).json({
                message:'All fields are required'
            })
        }
        const customer = await Customer.findOne({phone});
        if(customer){
            return res.status(409).json({
                message:'Customer already exists'
            })
        }
        //add customer
        const newCustomer = new Customer({
            name,
            phone,
            email,
            address,
            customerType,
            userId:id
        })
        await newCustomer.save();
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const getCustomer = async(req,res) =>{
    const { id } = req.user;
    const { phone } = req.params;
    try {
        if(!phone){
            return res.status(404).json({
                message:'Customer phone number is requried'
            })
        }
        const customer = await Customer.findOne({
            userId:new mongoose.Types.ObjectId(id),
            phone
        })
        if(!customer){
            return res.status(409).json({
                message:'Customer not found or user not have access'
            })
        }
        return res.status(200).json({
            message:'successfully fetched the customer data',
            customer
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
} 

export const updateCustomer = async(req,res) =>{
    const { id } = req.user;
    const { phone } = req.params;
    const {name,newPhoneNumber,email,customerType,address } = req.body;
    try {
        const customer = await Customer.findOne({
            userId:new mongoose.Types.ObjectId(id),
            phone
        })
        if(!customer){
            return res.status(404).json({
                message:'customer not found or user not have access to this'
            })
        }
        //update customer
        if(name) customer.name = name;
        if(newPhoneNumber) customer.phone = newPhoneNumber;
        if(email) customer.email = email;
        if(customerType) customer.customerType = customerType;
        if(address) customer.address = address

        await customer.save()

        return res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            customer,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}

export const deleteCustomer = async(req,res) =>{
    const { id } = req.user;
    const { phone } = req.body;
    try {
        if(!phone){
            return res.status(404).json({
                message:'Phone number is required'
            })
        }
        const customer = await Customer.findOne({
            userId:new mongoose.Types.ObjectId(id),
            phone
        })
        if(!customer){
            return res.status(409).json({
                message:'Customer not found or user not have access'
            })
        }
        await Customer.deleteOne({ _id: customer._id });
        return res.status(200).json({
            message:'successfully deleted the customer'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
}