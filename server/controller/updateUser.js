import userModel from "../models/UserModel.js";
import { getUserDetailFromToken } from "../helpers/getUserDetailFromToken.js";

export async function updateUser(req, res) {
    try {
        const token = req.cookies?.token;

        const user = await getUserDetailFromToken(token);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
            });
        }

        const { name, profile_pic, email, password } = req.body;

        const updatedUser = await userModel.updateOne(
            {
                _id: user._id,
            },
            {
                name,
                profile_pic,
                email,
                password,
            }
        );

        const updatedUserDetail = await userModel.findById(user._id);

        return res.status(200).json({
            message: "User updated",
            data: updatedUserDetail,
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
        });
    }
}
