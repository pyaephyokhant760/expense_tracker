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
    const {email , password} = req.body;
    if(!email || !password){
        return res.status(400).json({ message: "Please provide all required fields." });
    }
    try {
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) { 
            return res.status(400).json({ message: "Invalid email or password." });
        }
        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,  
                profileImage: user.profileImage,
            },
            token: generateToken(user._id),
        });
        
    } catch (error) {
       return res.status(500).json({ message: error.message }); 
    }
}

exports.getUser = async (req ,res ) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ user });
    }catch (error) {
        return res.status(500).json({ message: error.message });
    }
}