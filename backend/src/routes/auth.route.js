import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);

AuthRouter.put("/update-profile" , protectRoute , updateProfile)

AuthRouter.get("/check", protectRoute ,checkAuth)

export default AuthRouter;
