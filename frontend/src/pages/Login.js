import { useState } from "react";
import API from "../services/api";
import GridSmallBackground from "../components/ui/GridSmallBackground";
import logo from "../components/ui/logo.png";

function Login({ setIsLoggedIn, setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <GridSmallBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop backdrop-blur-lg shadow-lg">
        <img src={logo} alt="logo" width="300" height="300" className="mb-2" />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-dark w-100 mb-2 hover:bg-white-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>

        <button className="btn btn-link" onClick={() => setIsLoginPage(false)}>
          Create a New account
        </button>
      </div>
      <footer className="absolute bottom-4 w-full text-center z-20">
        <p className="text-gray-500 text-sm font-light">
          Made with love by Sameera❤️
        </p>
      </footer>
    </div>
  );
}

export default Login;
