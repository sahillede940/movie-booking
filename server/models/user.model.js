import mongoose from "mongoose";
const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "user-data" }
);

User.set("timestamps", true);

const model = mongoose.model("User", User);
export { model };
export default model;
