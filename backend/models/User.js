const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: null },
  },
  { timestamps: true }
);


UserSchema.pre("save" , async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
    next();
})
