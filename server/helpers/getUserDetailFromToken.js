import jwt from "jsonwebtoken";
import userModel from "../models/UserModel.js";

export const getUserDetailFromToken = async (token) => {
    if (!token) {
        return false;
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decode.id).select("-password");

    return user;
};
