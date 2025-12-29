const jwt = require('jsonwebtoken');
const User = require("../models/User")

exports.portect = async(req , res , next ) => {
    const token = req.header.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: "No token, authorization denied." });
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid." });
    }
}