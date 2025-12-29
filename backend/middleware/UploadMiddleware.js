const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'uploads/');
    },
    filename : (req ,file , cd ) => {
        cb(null , `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req , file , cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null , true);
    }else{
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
    }
}

const upload = multer({storage , fileFilter });

module.exports = upload;
