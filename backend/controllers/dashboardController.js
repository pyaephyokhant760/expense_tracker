const express = require("express");

const Expense = require("../models/Expense");
const Income = require("../models/Income");
const User = require('../models/User');
const { isValidObjectId , Types } = require("mongoose");

exports.getDashboardData = async (req, res, next) => {
    
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await Income.aggregate([
            {$match: {userId: userObjectId}},
            { $group : {_id: null , total : { $sum : "$amount" } } }
        ]);
        console.log("totalIncome", { totalIncome , usserId: isValidObjectId(userId)});
        const totalExprense = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            { $group : {_id: null , total : { $sum : "$amount" } } }
        ]);

        //Get income transactions for last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60*24*60*60*1000) }
        }).sort({ date: -1 });

        //Get total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum , transaction) => sum + transaction.amount , 0
        );

        //Get expense transactions for last 60 days
        const last60DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        //Get total expense for last 30 days
        const expenseLast30Days = last60DaysExpenseTransactions.reduce(
            (sum , transaction) => sum + transaction.amount , 0
        );

        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({ ...txn.toObject(), type: "income" })
            ),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({ ...txn.toObject(), type: "expense" })
            )
        ].sort((a ,b) => b.date - a.date);
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0) - (totalExprense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExprense[0]?.total || 0,
            last30DaysExpnese : {
                total : expenseLast30Days,
                transactions : last60DaysExpenseTransactions
            },
            last60DaysIncome : {
                total : incomeLast60Days,
                transactions : last60DaysIncomeTransactions
            },
            lrecentTransactions : lastTransactions
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}