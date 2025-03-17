import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FitnessPlans from "./pages/FitnessPlans";
import DietPlans from "./pages/DietPlans";
import ProgressTracker from "./pages/ProgressTracker";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [auth, setAuth] = useState(localStorage.getItem("user") ? true : false);
  const [progress, setProgress] = useState(() => {
    return JSON.parse(localStorage.getItem("completedExercises"))?.length || 0;
  });

  const updateProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <Router>
      <Navbar auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitness-plans" element={auth ? <FitnessPlans updateProgress={updateProgress} /> : <Navigate to="/login" />} />
        <Route path="/diet-plans" element={auth ? <DietPlans /> : <Navigate to="/login" />} />
        <Route path="/progress-tracker" element={auth ? <ProgressTracker progress={progress} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
