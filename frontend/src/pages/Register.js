import { useState } from "react";
import API from "../services/api";
import { cn } from "../lib/utils";
import GridSmallBackground from "../components/ui/GridSmallBackground";
import logo from "../components/ui/logo.png";

function Register({ setIsLoginPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        username,
        password,
      });

      setSuccess("User created! Please Login.");
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <GridSmallBackground />
      </div>
      <div className="relative z-10 flex flex-col items-center p-8 rounded-lg border border-white/20 backdrop backdrop-blur-lg shadow-lg">
        <img src={logo} alt="logo" width="300" height="300" className="mb-2" />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <input
          className="form-control mb-3"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn btn-dark w-100 mb-2 hover:bg-white-700 transition"
          onClick={handleRegister}
        >
          Register
        </button>
        <button className="btn btn-link" onClick={() => setIsLoginPage(true)}>
          Already have account? Login
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

export default Register;
