// src/pages/Dashboard.jsx
import React from "react";
import CareerRecommendations from "../features/career/CareerRecommendations";

const Dashboard = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-700">Your personalized career recommendations will appear here.</p>
      <CareerRecommendations />
    </div>
  );
};

export default Dashboard;
