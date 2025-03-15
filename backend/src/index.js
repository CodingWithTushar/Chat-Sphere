import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import { Connectdb } from "./lib/db.js";
import cookieParser from "cookie-parser";
import MessageRouter from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/auth", AuthRouter);
app.use("/api/message", MessageRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..frontend/dist")))

  app.get("*" , (req , res) => {
    res.sendFile(path.join(__dirname , "..frontend" , "dist" , "index.html"))
  })
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  Connectdb();
});
