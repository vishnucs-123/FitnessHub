import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="overlay"></div> {/* Background overlay for effect */}
      <div className="home-content">
        <h1>Welcome to <span>FitLife Hub</span></h1>
        <p>Your personalized fitness & health tracking platform!</p>

        <div className="home-buttons">
          <Link to="/fitness-plans">
            <button className="home-btn">💪 Start Your Workout</button>
          </Link>
          <Link to="/diet-plans">
            <button className="home-btn">🥗 Get a Diet Plan</button>
          </Link>
          <Link to="/progress-tracker">
            <button className="home-btn">📊 Track Progress</button>
          </Link>
        </div>

        <div className="feature-boxes">
          <div className="feature">
            <h3>📅 Daily Workout Plans</h3>
            <p>Get customized workout routines tailored for your fitness goals.</p>
          </div>
          <div className="feature">
            <h3>🍎 Personalized Diet Plans</h3>
            <p>Receive meal suggestions based on your body type and fitness goals.</p>
          </div>
          <div className="feature">
            <h3>📈 Track Your Progress</h3>
            <p>Monitor your daily, weekly, and monthly fitness progress.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
