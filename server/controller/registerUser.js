import userModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

export async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;
        const checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
            return res
                .status(400)
                .json({ message: "Email already exists", error: true });
        }
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);
        const payload = {
            name,
            email,
            password: hashedPassword,
            profile_pic,
        };
        const user = await userModel.create(payload);

        return res.status(201).json({
            message: "User created successfully",
            data: user,
            error: false,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Internal server error", error: true });
    }
}
