import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/user.routes.js";
import movieRoutes from "./routes/movie.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/movie", movieRoutes)

// if no routes are matched 
app.post("*", (req, res) => {
  return res.json({
    message: "page not found",
  });
});

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected...");
    app.listen(process.env.PORT, () => {
      console.log(`Server started on ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
    process.exit(1); // Terminate the application
  });
