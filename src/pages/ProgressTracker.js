import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./ProgressTracker.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProgressTracker() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const date = new Date();
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const totalExercises = 10; // Fixed total exercises for simplicity

  const [dailyProgress, setDailyProgress] = useState(() => {
    return JSON.parse(localStorage.getItem("completedExercises")) || {};
  });

  useEffect(() => {
    setDailyProgress(JSON.parse(localStorage.getItem("completedExercises")) || {});
  }, []);

  // Prepare Monthly Data for Graph
  const monthlyData = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const dateKey = new Date(date.getFullYear(), date.getMonth(), day).toISOString().split("T")[0];

    let totalCompleted = 0;
    if (dailyProgress[dateKey]) {
      Object.values(dailyProgress[dateKey]).forEach(category => {
        totalCompleted += category.length;
      });
    }
    return totalCompleted;
  });

  const chartData = {
    labels: Array.from({ length: daysInMonth }, (_, i) => i + 1), // Days of the month
    datasets: [
      {
        label: "Daily Completed Exercises",
        data: monthlyData,
        backgroundColor: "rgba(52, 152, 219, 0.7)",
        borderColor: "rgba(41, 128, 185, 1)",
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="progress-container">
      <h2>📊 Today's Progress - {today}</h2>
      {dailyProgress[today] ? (
        Object.keys(dailyProgress[today]).map((category, index) => (
          <div key={index} className="progress-category">
            <h3>{category.replace("-", " ")} Progress</h3>
            <p>Completed Exercises: <strong>{dailyProgress[today][category].length} / {totalExercises}</strong></p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(dailyProgress[today][category].length / totalExercises) * 100}%` }}></div>
            </div>
          </div>
        ))
      ) : (
        <p>No exercises completed today. Start your workout now! 💪</p>
      )}

      {/* Monthly Progress Graph */}
      <h3>📊 Monthly Progress Overview</h3>
      <div className="chart-container">
        <Bar data={chartData} />
      </div>
    </div>
  );
}

export default ProgressTracker;
