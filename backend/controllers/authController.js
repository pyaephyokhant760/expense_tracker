const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
}

exports.register = async (req , res ) => {
    const { fullName, email, password, profileImage } = req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({ message: "Please provide all required fields." });
    }
    try {
        const existringer = await User.findOne({ email });
        if(existringer) {
            return res.status(400).json({ message: "User already exists." });
        }
        const user = await User.create({
            fullName,
            email,
            password,
            profileImage,
        });
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                profileImage: user.profileImage,
            },
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.login = async (req ,res ) => {

}

exports.getUser = async (req ,res ) => {
    
}