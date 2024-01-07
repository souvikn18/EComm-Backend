import { Router } from "express"
import { createCollection, updateCollection, deleteCollection, getAllCollection } from "../controllers/collection.controller.js"
import { isLoggedIn, authorize } from "../middleware/auth.middleware.js"
import AuthRoles from "../utils/authRoles.js"

const router = Router()

router.post("/", isLoggedIn, authorize(AuthRoles.ADMIN), createCollection)
router.put("/:id", isLoggedIn, authorize(AuthRoles.ADMIN || AuthRoles.MODERATOR), updateCollection)
router.delete("/:id", isLoggedIn, authorize(AuthRoles.ADMIN || AuthRoles.MODERATOR), deleteCollection)
router.get("/", getAllCollection)

export default router