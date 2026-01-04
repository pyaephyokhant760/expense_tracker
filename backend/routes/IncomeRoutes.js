const express = require('express');
const router = express.Router();
const { addIncome, getIncomes, updateIncome, deleteIncome , downloadExcel} = require('../controllers/incomeController');
const { portect } = require('../middleware/AuithMiddleware');


router.post('/', portect, addIncome);
router.get('/', portect, getIncomes);
router.get('/downloadExcel', portect, downloadExcel);
router.put('/:id', portect, updateIncome);
router.delete('/:id', portect, deleteIncome);

module.exports = router;