import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/connectDB.js";
import router from "./router/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// api endpoints
app.get("/", (req, res) => {
    res.json({
        message: "Hello World",
    });
});
app.use("/api", router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
