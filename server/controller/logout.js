export async function logout(req, res) {
    try {
        const cookieOptions = {
            http: true,
            secure: true,
        };
        return res.cookie("token", "", cookieOptions).status(200).json({
            message: "Logged out successfully",
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
