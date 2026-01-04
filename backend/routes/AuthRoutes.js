const express = require('express');
const router = express.Router();
const { register, login , getUser} = require('../controllers/authController');
const { portect } = require('../middleware/AuithMiddleware');
const upload = require('../middleware/UploadMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/me', portect, getUser);

router.post("/upload_image" , upload.single("image") , ( req ,res) => {
    if(!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(200).json({ message: "File uploaded successfully.", imageUrl });
})
module.exports = router;