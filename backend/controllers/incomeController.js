const Income = require("../models/Income");
const User = require("../models/User");
const XLSX = require("xlsx");


exports.addIncome = async (req, res , next) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;
        if(!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const income = new Income({
            userId,
            icon,
            source,
            amount,
            date
        });
        await income.save();
        return res.status(201).json({ message: "Income added successfully", income
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.getIncomes = async (req, res , next) => {
    const userId = req.user.id;

    try{
        const income = await Income.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json({ income });
    }catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

exports.updateIncome = async (req, res , next) => {

}

exports.deleteIncome = async (req, res , next) => {
    const userId = req.user.id;
    try {
        await Income.findOneAndDelete({ _id: req.params.id });
        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.downloadExcel = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ createdAt: -1 });
        const data = imcome.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "Incomes.xlsx");
        res.download("Incomes.xlsx");
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}