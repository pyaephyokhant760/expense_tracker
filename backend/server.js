require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");
const AuthRouter = require("./routes/AuthRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods : ["GET","POST","PUT","DELETE"],
        allowedHeaders : ["Content-Type","Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/users", AuthRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is Running ${port}`));