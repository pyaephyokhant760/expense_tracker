const express = require('express');
const router = express.Router();


router.post('/register', async (req, res) => {
    res.send('User registration endpoint');
});


module.exports = router;