import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password",
                error: true,
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
            http: true,
            secure: true,
        };

        return res.cookie("token", token, cookieOptions).status(200).json({
            message: "Logged in successfully",
            token: token,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: true,
        });
    }
}
