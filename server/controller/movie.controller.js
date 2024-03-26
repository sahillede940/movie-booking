import Movie from "../models/movie.model.js";

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      name: req.body.name,
      description: req.body.description,
      premiereDate: req.body.premiereDate,
      endDate: req.body.endDate,
      price: req.body.price,
    });
    res.json({
      movie: movie,
      message: "Movie created successfully",
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

export const getMovieInfo = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json({
      movie: movie,
      message: "Movie found successfully",
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

export const bookSeat = async (req, res) => {
  try {
    const { movieId, seats, creator } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.json({ status: "error", message: "Movie not found" });
    }

    for (let i = 0; i < seats.length; i++) {
      movie.seats.id(seats[i]).userId = creator;
    }

    await movie.save();
    res.json({
      movie: movie,
      message: "Seat booked successfully",
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};

export const cancelSeat = async (req, res) => {
  try {
    const { movieId, seats } = req.body;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      res.json({ status: "error", message: "Movie not found" });
    }

    for (let i = 0; i < seats.length; i++) {
      movie.seats.id(seats[i]).userId = null;
    }

    await movie.save();
    res.json({
      movie: movie,
      message: "Seats cancelled successfully",
      status: "ok",
    });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
};
