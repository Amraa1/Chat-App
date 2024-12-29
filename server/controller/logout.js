export async function logout(req, res) {
    try {
        const cookieOptions = {
            maxAge: 3600000, // cookie expires in 1 hour
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        };
        return res.cookie("token", "", cookieOptions).status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            error: true,
        });
    }
}
