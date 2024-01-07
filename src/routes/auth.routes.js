import {Router} from "express"
import {SignUp, Login, Logout, getProfile, forgotPassword, resetPassword} from "../controllers/auth.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js"


const router = Router();

router.post("/signup", SignUp)
router.post("/login", Login)
router.get("/logout", Logout)
router.post("/password/forgot", forgotPassword)
router.post("/password/reset/:token", resetPassword)

router.get("/profile", isLoggedIn , getProfile)

export default router;