import userModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

export async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;
        const checkEmail = await userModel.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ error: "Email exists already" });
        }
        const salt = await bcryptjs.genSaltSync(10);
        const hashedPassword = await bcryptjs.hashSync(password, salt);
        const payload = {
            name,
            email,
            password: hashedPassword,
            profile_pic,
        };
        const user = await userModel.create(payload);

        return res.status(201).json({
            message: "User created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
