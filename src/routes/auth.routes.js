import {Router} from "express"
import {SignUp, Login, Logout} from "../controllers/auth.controller.js"
import {isLoggedIn} from "../middleware/auth.middleware.js"


const router = Router();

router.post("/signup", SignUp)
router.post("/login", Login)
router.get("/logout", Logout)

router.get("/profile", isLoggedIn , getProfile)

export default router;