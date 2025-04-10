import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (userId, res) => {
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //It Is In MiliSeconds That's Why We Created This Big Calculation
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    sameSite: "strict",//cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development"
  });

  return token
};
