import express from "express";
import { authUser, registerUser ,allusers} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(protect,allusers);
router.post("/login",authUser);



export default router;