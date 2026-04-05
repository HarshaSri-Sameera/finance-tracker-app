import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Register from "./pages/Register";
import logo from "../src/components/ui/logo.png";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isLoginPage, setIsLoginPage] = useState(true);

  const [page, setPage] = useState("dashboard");

  if (!isLoggedIn) {
    return isLoginPage ? (
      <Login setIsLoggedIn={setIsLoggedIn} setIsLoginPage={setIsLoginPage} />
    ) : (
      <Register setIsLoginPage={setIsLoginPage} />
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <div className="absolute inset-0 z-0">{/* <DotBackground /> */}</div>
      <div className="relative z-10 flex flex-col items-center p-8 rounded-lg border border-white/20">
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-90 h-20 object-contain" />
          </div>

          <div className="flex gap-4">
            <button
              className="text-sm font-semibold text-gray-600 hover:text-black transition"
              onClick={() => setPage("dashboard")}
            >
              Loans
            </button>
            <button
              className="text-sm font-semibold text-gray-600 hover:text-black transition"
              onClick={() => setPage("history")}
            >
              History
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="text-xs border border-red-500 text-red-500 px-2 ml-3 py-1 rounded-full hover:bg-red-50 transition"
          >
            Logout
          </button>
        </nav>

        {page === "dashboard" && <Dashboard />}
        {page === "history" && <History />}
      </div>
    </div>
  );
}

export default App;
