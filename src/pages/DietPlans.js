import React, { useState } from "react";
import "./DietPlans.css";

function DietPlans() {
  const [goal, setGoal] = useState("weight loss");
  const [search, setSearch] = useState("");
  const [mealPlan, setMealPlan] = useState([]);

  // Daily calorie intake recommendations
  const calorieIntake = {
    "weight loss": "1200-1800 kcal/day",
    "muscle gain": "2500-3500 kcal/day",
    "general fitness": "2000-2500 kcal/day",
  };

  // 200+ Indian Foods (Calories per 100g)
  const healthyFoods = [
    // Indian Meals
    { name: "Rice", calories: 130, protein: 2.7, fats: 0.3 },
    { name: "Roti", calories: 104, protein: 3.0, fats: 0.4 },
    { name: "Dal (Lentils)", calories: 116, protein: 9.0, fats: 0.4 },
    { name: "Paneer", calories: 265, protein: 18.0, fats: 21.0 },
    { name: "Idli", calories: 39, protein: 2.0, fats: 0.2 },
    { name: "Dosa", calories: 168, protein: 3.9, fats: 4.0 },
    { name: "Upma", calories: 132, protein: 3.5, fats: 3.0 },
    { name: "Poha", calories: 110, protein: 2.4, fats: 1.0 },
    { name: "Sambar", calories: 90, protein: 3.5, fats: 3.2 },
    { name: "Palak Paneer", calories: 200, protein: 12, fats: 15 },
    { name: "Rajma", calories: 127, protein: 9, fats: 0.5 },
    { name: "Chole (Chickpeas)", calories: 164, protein: 8.9, fats: 2.6 },
    { name: "Chicken Curry", calories: 250, protein: 25, fats: 15 },
    { name: "Fish Curry", calories: 190, protein: 22, fats: 8 },
    { name: "Egg Bhurji", calories: 140, protein: 10, fats: 10 },
    { name: "Khichdi", calories: 120, protein: 4.8, fats: 2.0 },

    // Indian Fruits
    { name: "Mango", calories: 60, protein: 0.8, fats: 0.4 },
    { name: "Banana", calories: 89, protein: 1.1, fats: 0.3 },
    { name: "Papaya", calories: 43, protein: 0.5, fats: 0.3 },
    { name: "Apple", calories: 52, protein: 0.3, fats: 0.2 },
    { name: "Orange", calories: 47, protein: 0.9, fats: 0.1 },
    { name: "Pineapple", calories: 50, protein: 0.5, fats: 0.1 },
    { name: "Watermelon", calories: 30, protein: 0.6, fats: 0.2 },

    // Indian Dry Fruits & Nuts
    { name: "Almonds", calories: 579, protein: 21, fats: 50 },
    { name: "Cashews", calories: 553, protein: 18, fats: 44 },
    { name: "Walnuts", calories: 654, protein: 15, fats: 65 },
    { name: "Pistachios", calories: 562, protein: 20, fats: 45 },

    // Drinks
    { name: "Milk", calories: 42, protein: 3.4, fats: 1.0 },
    { name: "Lassi", calories: 150, protein: 5.0, fats: 6.0 },
    { name: "Buttermilk", calories: 40, protein: 3.0, fats: 1.0 },

    // Add more foods here
  ];

  // Filter foods based on search input
  const filteredFoods = healthyFoods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add food to meal plan
  const addToMealPlan = (food) => {
    setMealPlan([...mealPlan, food]);
  };

  // Remove food from meal plan
  const removeFromMealPlan = (index) => {
    const updatedMealPlan = [...mealPlan];
    updatedMealPlan.splice(index, 1);
    setMealPlan(updatedMealPlan);
  };

  // Calculate total nutrition from the meal plan
  const totalCalories = mealPlan.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = mealPlan.reduce((sum, food) => sum + food.protein, 0);
  const totalFats = mealPlan.reduce((sum, food) => sum + food.fats, 0);

  return (
    <div className="diet-container">
      <h2>🥗 Diet & Nutrition Planner</h2>

      <div className="goal-container">
        <label>Select Your Goal:</label>
        <select onChange={(e) => setGoal(e.target.value)}>
          <option value="weight loss">Weight Loss</option>
          <option value="muscle gain">Muscle Gain</option>
          <option value="general fitness">General Fitness</option>
        </select>
        <p className="calorie-intake">🔹 Recommended: {calorieIntake[goal]}</p>
      </div>

      <input
        type="text"
        placeholder="🔍 Search for a food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <h3>🍽️ Healthy Foods (Per 100g)</h3>
      <table className="food-table">
        <thead>
          <tr>
            <th>Food</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Fats (g)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.map((food, index) => (
            <tr key={index}>
              <td>{food.name}</td>
              <td>{food.calories} kcal</td>
              <td>{food.protein}</td>
              <td>{food.fats}</td>
              <td>
                <button className="add-btn" onClick={() => addToMealPlan(food)}>➕ Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>📋 My Meal Plan</h3>
      {mealPlan.length > 0 ? (
        <>
          <p><strong>Total Calories:</strong> {totalCalories} kcal</p>
          <p><strong>Total Protein:</strong> {totalProtein.toFixed(1)} g</p>
          <p><strong>Total Fats:</strong> {totalFats.toFixed(1)} g</p>
        </>
      ) : (
        <p>No foods added to meal plan.</p>
      )}
    </div>
  );
}

export default DietPlans;
