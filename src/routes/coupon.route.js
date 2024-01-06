import {Router} from "express"
import { AddCoupon, deleteCoupon, UpdateCoupon, getAllCoupon, DisableCoupon } from "../controllers/coupon.controller.js"
import {isLoggedIn, authorize} from "../middleware/auth.middleware.js"
import AuthRoles from "../utils/authRoles.js"

const router = Router();

router.post('/', isLoggedIn, authorize(AuthRoles.ADMIN), AddCoupon)
router.post('/:id', isLoggedIn, authorize(AuthRoles.ADMIN || AuthRoles.MODERATOR), deleteCoupon )
router.put('/action/:id', isLoggedIn, authorize(AuthRoles.ADMIN || AuthRoles.MODERATOR), UpdateCoupon)
router.get('/', isLoggedIn, getAllCoupon)

export default router