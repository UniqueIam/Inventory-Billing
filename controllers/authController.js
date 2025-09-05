import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { registerSchema } from "../validators/registerValidator.js";
import { loginSchema } from "../validators/loginValidator.js";
import { success } from "zod";

export const registerUser = async (req, res) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const formattedErrors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      });
    }

    const { email, password, phoneNumber } = result.data;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        error: {
          message: "User already exists",
        },
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      phoneNumber,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check user exits or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "user not exists with this email",
      });
    }
    //match password
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res.status(409).json({
        message: "Invalid/wrong password",
      });
    }
    //generate jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({
        success:true,
        message:'User logged in successfully',
        token
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logged out successfully. Please clear your token on client."
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
