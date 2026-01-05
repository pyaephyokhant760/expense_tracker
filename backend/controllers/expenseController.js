const Expense = require("../models/Expense");
const User = require('../models/User');
const xlsx = require('xlsx');

exports.addExpense = async (req , res , next ) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;
        if(!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const expense = new Expense({
            userId,
            icon,
            category,
            amount,
            date
        });
        await expense.save();
        return res.status(201).json({ message: "Income added successfully", expense})
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getExpense = async (req , res , nexr ) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ expense });
    }catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

exports.deleteExpense = async (req , res , next ) => {
    const userId = req.user.id;
    try {
        await Expense.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
