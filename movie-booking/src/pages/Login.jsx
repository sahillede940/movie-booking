import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();

    await axios
      .post(API_URL + "/api/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user))
          alert("Login successful");
          navigate("/dashboard");
        } else {
          alert("Please check your details");
        }
      })
      .catch((error) => {
        alert("error");
      });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <input type="submit" value="Login" />
        <Link to="/register">Register</Link>
      </form>
    </div>
  );
}

export default App;
