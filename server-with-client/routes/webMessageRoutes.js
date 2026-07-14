import express from "express";
import {
  createMessage,
  deleteWebMessage,
  getAllMessages,
  replyToMessage,
} from "../controllers/webMessageController.js";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
const router = express.Router();

router.post("/create", createMessage);
router.get("/get-all", userAuth, isAdmin, getAllMessages);
router.patch("/reply/:id", userAuth, isAdmin, replyToMessage);
router.delete("/delete/:id", userAuth, isAdmin, deleteWebMessage);

export default router;