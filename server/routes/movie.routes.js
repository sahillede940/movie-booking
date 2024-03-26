import express from "express";
import { bookSeat, createMovie, getMovieInfo, cancelSeat } from "../controller/movie.controller.js";

const router = express.Router();

// movie routes
router.post("/create", createMovie);
router.post("/book", bookSeat);
router.get("/info/:id", getMovieInfo);
router.post("/cancel", cancelSeat);

export default router;
