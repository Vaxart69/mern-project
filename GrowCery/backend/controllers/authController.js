import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { useReducer } from "react";

export const login = async (req, res) => {
  try {
    // get the email and password from the request body
    const { email, password } = req.body;

    // check if both the email and password are provided.
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // if provided, check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // compare hashed pass
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate token if success
    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {

    // get the login infos after post
    const { firstName, middleName, lastName, email, password } = req.body;

    // if data is missing, return error
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // try to find if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }


    // else hash the password and create a new user and store the credentials
    const hashedPw = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      password: hashedPw,
      userType: "customer",
    });

    await newUser.save();

    // make a token for the new user
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, userType: newUser.userType },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
