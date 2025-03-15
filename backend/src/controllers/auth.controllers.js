import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, password, fullName } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).json({
        message: "Email Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const users = await UserModel.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
    });

    if (!users) {
      res.status(400).json({
        message: "Please Enter Details",
      });
    }
    if (users) {
      generateToken(users._id, res);
      await users.save();

      res.status(201).json({
        _id: users._id,
        fullName: users.fullName,
        email: users.email,
        profilePic: users.profilePic,
      });
    } else {
      res.status(400).json({
        message: "InValid  Credentails",
      });
    }
  } catch (e) {
    console.error;
    console.log(e);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({
      email: email,
    });

    if (!user) {
      res.status(400).json({
        message: "User does not Found!",
      });
    }
    //First Password Is Sent By The User And Second One Is That We Have In Our DataBase
    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!comparedPassword) {
      res.status(400).json({
        message: "InValid Credentails ",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (e) {
    console.error;
    console.log(e);
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({
      message: "Logged Out Successfully",
    });
  } catch (e) {
    console.error;
    console.log(e);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      res.status(400).json({
        message: "Profile Pic is Required",
      });
    }

    const response = await cloudinary.uploader.upload(profilePic);
    const Updateduser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: response.secure_url },
      { new: true }
    );

    res.status(200).json(Updateduser);
  } catch (e) {
    console.error;
    console.log(e);
  }
};


export const checkAuth = (req ,res) => {
    try {
        res.status(200).json(req.user)
    } catch (e) {
        console.error
        console.log(`Error in checkAuth controller ${e.message }`)
    }
}