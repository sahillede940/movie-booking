import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (event) => {
    // use axios
    event.preventDefault();
    try {
      const response = await axios.post(API_URL + "/api/signup", {
        name,
        email,
        password,
      });
      if (response.data.user) {
        alert("Registration successful");
        navigate("/login");
      } else {
        alert("Please check your details");
      }
    } catch (error) {
      alert("Please check your details");
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
        <Link to="/login">Login</Link>
      </form>
    </div>
  );
}

export default App;
