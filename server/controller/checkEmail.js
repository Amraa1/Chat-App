import userModel from "../models/UserModel.js";

export async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        const checkEmail = await userModel.findOne({ email }).select("_id");

        if (!checkEmail) {
            return res.status(404).json({
                error: "Not found",
            });
        }

        return res.status(200).json({
            message: "Email exists",
            data: checkEmail,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
