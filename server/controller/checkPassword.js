import userModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: "Not found",
            });
        }

        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        const cookieOptions = {
            maxAge: 3600000, // cookie expires in 1 hour
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        };

        return res.cookie("token", token, cookieOptions).status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        console.log(`Error while checking password: ${error.message || error}`);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}
