const express = require('express');
const router = express.Router();
const { addIncome, getIncomes, deleteIncome , downloadExcel} = require('../controllers/incomeController');
const { portect } = require('../middleware/AuithMiddleware');


router.post('/create', portect, addIncome);
router.get('/', portect, getIncomes);
router.get('/downloadExcel', portect, downloadExcel);
router.delete('/:id', portect, deleteIncome);

module.exports = router;