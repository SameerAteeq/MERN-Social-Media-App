import express from "express";
import {
  createChat,
  findChat,
  getChats,
  usersChat,
} from "../Controllers/ChatController.js";

const router = express.Router();

router.post("/", createChat);
router.post("/getChats", getChats);
router.get("/:userId", usersChat);
router.get("/find/:firstId/:secondId", findChat);

export default router;
