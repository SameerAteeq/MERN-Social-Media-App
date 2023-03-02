import { useSelector } from "react-redux";
import { Navigate, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/login";
import SignUp from "./pages/Auth/SignUp";
import Chat from "./pages/Chat/Chat";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "18%", right: 0 }}></div>
      <div className="blur" style={{ top: "32%", left: "-8rem" }}></div>

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth/login" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth/login" />}
        />
        <Route
          path="/auth/login"
          element={user ? <Navigate to="../home" /> : <Login />}
        />
        <Route
          path="/auth/signup"
          element={user ? <Navigate to="../home" /> : <SignUp />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/auth/login" />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="/auth/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
