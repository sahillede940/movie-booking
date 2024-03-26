import React, { useEffect, useState } from "react";
import axios from "axios";
import Switch from "react-switch";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [movie, setMovie] = React.useState({
    _id: "",
    name: "",
    seats: [],
  });
  const [selected, setSelected] = useState([]);
  const [tocancel, setTocancel] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = "6602ff84719f9dfa546a8323";
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  const username = JSON.parse(localStorage.getItem("user")).name;
  console.log(userId);
  const navigate = useNavigate();

  const fetchMovie = async () => {
    setLoading(true);
    await axios
      .get(API_URL + "/api/movie/info/" + id)
      .then((response) => {
        setMovie(response.data.movie);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleBookSeat = async () => {
    setLoading(true);
    await axios
      .post(API_URL + "/api/movie/book", {
        movieId: id,
        seats: selected,
        creator: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((res) => {
        alert("Seats Booked successfully");
        fetchMovie();
      });
  };

  const handleCancelSeat = async () => {
    setLoading(true);

    await axios
      .post(API_URL + "/api/movie/cancel", {
        creator: JSON.parse(localStorage.getItem("user"))._id,
        movieId: id,
        seats: tocancel,
      })
      .then((res) => {
        alert("Seats Canceled Successfully");
        fetchMovie();
      });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div>
      <div className="containter">
        <p>User Name: {username}</p>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <p>Movie Name: {movie?.name}</p>
      <p>Movie ID: {movie?._id}</p>
      <label>Toggle to cancel seat</label>
      <Switch
        checked={toggle}
        onChange={() => {
          setToggle(!toggle);
          setSelected([]);
          setTocancel([]);
        }}
      />

      <div className="containter">
        <div className="seat myseat">Your Seat</div>
        <div className="seat todelete">For canceling</div>
        <div className="seat selected">Selected</div>
        <div className="seat already">Already Booked</div>
      </div>

      <div className="containter">
        {movie?.seats?.map((seat, index) => {
          const alreadyBooked = seat.userId !== userId && seat.userId != null;
          const isSelected = selected.includes(seat._id);
          const myseat = seat.userId === userId;
          const iscancel = tocancel.includes(seat._id);

          return (
            <div
              onClick={() => {
                if (toggle) {
                  if (myseat) setTocancel([...tocancel, seat._id]);
                } else {
                  if(!myseat && !alreadyBooked)
                  setSelected([...selected, seat._id]);
                }
              }}
              className={`seat ${
                myseat
                  ? `myseat ${iscancel ? "todelete" : ""}`
                  : `${
                      alreadyBooked
                        ? "already"
                        : `${isSelected ? "selected" : ""}`
                    }`
              }`}
              key={seat._id}
            >
              {seat.seatNumber}
            </div>
          );
        })}
      </div>
      {toggle ? (
        <button onClick={handleCancelSeat}>Cancel Seats</button>
      ) : (
        <button onClick={handleBookSeat}>Book My Seats</button>
      )}
    </div>
  );
};

export default Dashboard;
