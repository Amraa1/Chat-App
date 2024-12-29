import express from "express";
import { registerUser } from "../controller/registerUser.js";
import { checkEmail } from "../controller/checkEmail.js";
import { checkPassword } from "../controller/checkPassword.js";
import { userDetail } from "../controller/userDetail.js";
import { logout } from "../controller/logout.js";
import { updateUser } from "../controller/updateUser.js";
const router = express.Router();

// create user apis
router.post("/register", registerUser);
// check user email
router.post("/email", checkEmail);
// check password
router.post("/password", checkPassword);
// login user details
router.get("/user_details", userDetail);
// logout user
router.get("/logout", logout);
// update user
router.put("/update-user", updateUser);

export default router;
