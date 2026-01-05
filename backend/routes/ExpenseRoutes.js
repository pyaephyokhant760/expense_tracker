const express = require("express");
const router = express.Router();
const {addExpense , getExpense , deleteExpense , ExceDownload} = require("../controllers/expenseController");
const { portect } = require('../middleware/AuithMiddleware');

Router.get('/', portect, getExpense);
router.post('/create', portect, addExpense);
router.delete('/:id', portect, deleteExpense);
router.get('/downloadExcel', portect, ExceDownload);

module.exports = router;