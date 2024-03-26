import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    seats: [
      {
        seatNumber: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { collection: "movie", timestamps: true }
);

MovieSchema.pre("save", async function (next) {
  if (this.isNew) {
    // Only initialize seats when creating a new movie
    for (let i = 1; i <= 50; i++) {
      this.seats.push({ seatNumber: `A${i}`, userId: null }); // Adjust seat numbering as needed
    }
  }
  next();
});

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
