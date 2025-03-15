import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSideBar, sendMessages } from "../controllers/message.controllers.js";

const MessageRouter = express.Router();

MessageRouter.get("/users" , protectRoute , getUsersForSideBar)

MessageRouter.get("/:id" , protectRoute, getMessages)

MessageRouter.post("/send/:id" , protectRoute , sendMessages)

export default MessageRouter