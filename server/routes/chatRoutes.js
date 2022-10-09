import express from "express";
import {ascessChat,fetchChat,createGroupChat,renameGroup,removeFromGroup,addToGroup} from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect,ascessChat);
router.route("/").get(protect,fetchChat);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupremove").put(protect,removeFromGroup);
router.route("/groupadd").put(protect,addToGroup);

export default router;