import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    // remove password from user object
    user.password = undefined;
    res.json({
      user: user,
      message: "User created successfully",
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", message: "Duplicate email" });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid login" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    return res.json({ status: "ok", token: token, user: user });
  } else {
    return res.json({ status: "error", user: false });
  }
};
