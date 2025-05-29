import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/Token.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // Extended to 1 year
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: `Sign up error: ${error.message}` });
  }
};

export const LogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 365 * 24 * 60 * 60 * 1000, // Extended to 1 year
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

export const LogOut = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};
