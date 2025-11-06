// src/features/career/CareerCard.jsx
import React from "react";

const CareerCard = ({ career }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-xl transition cursor-pointer">
      <h3 className="text-xl font-bold mb-2">{career.title}</h3>
      <p className="text-gray-700 mb-2">{career.description}</p>
      <span className="text-sm text-gray-500">Field: {career.field}</span>
    </div>
  );
};

export default CareerCard;
