import express from "express";
import { signup, login } from "../controller/user.controller.js";

const router = express.Router();

// user routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
