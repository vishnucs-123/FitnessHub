import React, { useState, useEffect } from "react";
import "./FitnessPlans.css";

function FitnessPlans({ updateProgress }) {
  const [goal, setGoal] = useState("weight loss");
  const today = new Date().toISOString().split("T")[0]; // Get today's date
  const [completedExercises, setCompletedExercises] = useState(() => {
    return JSON.parse(localStorage.getItem("completedExercises")) || {
      [today]: { "weight loss": [], "weight gain": [], "general fitness": [] }
    };
  });

  useEffect(() => {
    localStorage.setItem("completedExercises", JSON.stringify(completedExercises));
    updateProgress(completedExercises[today]?.[goal]?.length || 0, goal);
  }, [completedExercises, updateProgress, goal]);

  const workouts = {
    "weight loss": [
      { name: "Jumping Jacks", sets: "3 sets of 30 sec", video: "https://www.youtube.com/watch?v=iSSAk4XCsRA" },
      { name: "Burpees", sets: "3 sets of 12 reps", video: "https://www.youtube.com/watch?v=TU8QYVW0gDU" },
      { name: "Squats", sets: "3 sets of 15 reps", video: "https://www.youtube.com/watch?v=aclHkVaku9U" },
      { name: "Push-ups", sets: "3 sets of 12 reps", video: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
      { name: "Lunges", sets: "3 sets of 12 reps per leg", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
      { name: "Plank", sets: "3 sets of 30-60 sec", video: "https://www.youtube.com/watch?v=Fcbw82ykBvY" },
      { name: "Mountain Climbers", sets: "3 sets of 40 sec", video: "https://www.youtube.com/watch?v=nmwgirgXLYM" },
      { name: "High Knees", sets: "3 sets of 30 sec", video: "https://www.youtube.com/watch?v=OAJ_J3EZkdY" },
      { name: "Jump Rope", sets: "3 sets of 60 sec", video: "https://www.youtube.com/watch?v=YBWhjK2ADrI" },
      { name: "Russian Twists", sets: "3 sets of 20 reps", video: "https://www.youtube.com/watch?v=wkD8rjkodUI" }
    ],
    "weight gain": [
      { name: "Bench Press", sets: "3 sets of 10 reps", video: "https://www.youtube.com/watch?v=SCVCLChPQFY" },
      { name: "Deadlifts", sets: "3 sets of 10 reps", video: "https://www.youtube.com/watch?v=r4MzxtBKyNE" },
      { name: "Pull-ups", sets: "3 sets of 8 reps", video: "https://www.youtube.com/watch?v=eGo4IYlbE5g" },
      { name: "Bicep Curls", sets: "3 sets of 15 reps", video: "https://www.youtube.com/watch?v=ykJmrZ5v0Oo" },
      { name: "Triceps Dips", sets: "3 sets of 10 reps", video: "https://www.youtube.com/watch?v=0326dy_-CzM" },
      { name: "Dumbbell Rows", sets: "3 sets of 10 reps", video: "https://www.youtube.com/watch?v=pYcpY20QaE8" },
      { name: "Calf Raises", sets: "3 sets of 20 reps", video: "https://www.youtube.com/watch?v=7FfK4sZlxWA" },
      { name: "Squats", sets: "3 sets of 12 reps", video: "https://www.youtube.com/watch?v=aclHkVaku9U" },
      { name: "Lunges", sets: "3 sets of 12 reps per leg", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
      { name: "Push-ups", sets: "3 sets of 15 reps", video: "https://www.youtube.com/watch?v=IODxDxX7oi4" }
    ],
    "general fitness": [
      { name: "Bodyweight Squats", sets: "3 sets of 15 reps", video: "https://www.youtube.com/watch?v=aclHkVaku9U" },
      { name: "Lunges", sets: "3 sets of 12 reps per leg", video: "https://www.youtube.com/watch?v=QOVaHwm-Q6U" },
      { name: "Push-ups", sets: "3 sets of 15 reps", video: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
      { name: "Plank", sets: "3 sets of 30-60 sec", video: "https://www.youtube.com/watch?v=Fcbw82ykBvY" },
      { name: "Jump Rope", sets: "3 sets of 60 sec", video: "https://www.youtube.com/watch?v=YBWhjK2ADrI" },
      { name: "Wall Sit", sets: "3 sets of 30 sec", video: "https://www.youtube.com/watch?v=-cdph8hv0O0" },
      { name: "Russian Twists", sets: "3 sets of 20 reps", video: "https://www.youtube.com/watch?v=wkD8rjkodUI" },
      { name: "High Knees", sets: "3 sets of 30 sec", video: "https://www.youtube.com/watch?v=OAJ_J3EZkdY" },
      { name: "Side Plank", sets: "3 sets of 30 sec per side", video: "https://www.youtube.com/watch?v=Yw-UlRw7vCU" },
      { name: "Arm Circles", sets: "3 sets of 20 reps", video: "https://www.youtube.com/watch?v=0MhElxUq4zI" }
    ]
  };

  const markAsDone = (exerciseName) => {
    if (!completedExercises[today]?.[goal]?.includes(exerciseName)) {
      const updatedExercises = {
        ...completedExercises,
        [today]: {
          ...completedExercises[today],
          [goal]: [...(completedExercises[today]?.[goal] || []), exerciseName]
        }
      };
      setCompletedExercises(updatedExercises);
    }
  };

  return (
    <div className="fitness-container">
      <h2>🏋️ Personalized Workout Plan</h2>
      <div className="goal-container">
        <label>Select Your Goal:</label>
        <select value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="weight loss">Weight Loss</option>
          <option value="weight gain">Weight Gain</option>
          <option value="general fitness">General Fitness</option>
        </select>
      </div>
      <h3>📌 Workout Plan for {goal.replace("-", " ")}</h3>
      <ul className="exercise-list">
        {workouts[goal].map((exercise, index) => (
          <li key={index} className={`exercise-card ${completedExercises[today]?.[goal]?.includes(exercise.name) ? "completed" : ""}`}>
            <strong>🔹 {exercise.name}</strong>
            <h4>{exercise.sets}</h4>
            <a href={exercise.video} target="_blank" rel="noopener noreferrer">
              <button className="watch-btn">🎥 Watch Video</button>
            </a>
            <button className="done-btn" onClick={() => markAsDone(exercise.name)}>✅ Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FitnessPlans;
