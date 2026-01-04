require("dotenv").config();
const express = require("express");
const cors = require('cors');
const path = require("path");
const { connect } = require("http2");
const connectDB = require("./config/db");
const AuthRouter = require("./routes/AuthRoutes");
const IncomeRouter = require("./routes/IncomeRoutes");
const logger = require("./log/logger");

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
app.use("/api/income", IncomeRouter);


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 8000;

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});