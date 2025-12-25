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

}

exports.login = async (req ,res ) => {

}

exports.getUser = async (req ,res ) => {
    
}