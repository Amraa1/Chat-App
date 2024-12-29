import { getUserDetailFromToken } from "../helpers/getUserDetailFromToken.js";

export async function userDetail(req, res) {
    try {
        const token = req.cookies?.token;

        const user = await getUserDetailFromToken(token);
        if (!user) {
            return res.status(401).json({
                error: "Unauthorized",
                message: "Session expired. Please log in again.",
                logout: true,
            });
        }
        return res.status(200).json({
            message: "User details",
            data: user,
        });
    } catch (error) {
        console.log("userDetail -> error", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
