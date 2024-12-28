import { getUserDetailFromToken } from "../helpers/getUserDetailFromToken.js";

export async function userDetail(req, res) {
    try {
        const token = req.cookies?.token;

        const user = await getUserDetailFromToken(token);
        if (!user) {
            return res.status(401).json({
                message: "Session out",
                logout: true,
            });
        }
        return res.status(200).json({
            message: "User details",
            data: user,
            success: true,
        });
    } catch (error) {
        console.log("userDetail -> error", error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
        });
    }
}
