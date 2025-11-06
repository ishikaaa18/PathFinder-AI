// src/features/career/CareerRecommendations.jsx
import React, { useEffect, useState } from "react";
import CareerCard from "./CareerCard";
import { getCareerRecommendations } from "./career.service";

const CareerRecommendations = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      const data = await getCareerRecommendations();
      setCareers(data);
    };
    fetchCareers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended Careers for You</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {careers.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>
    </div>
  );
};

export default CareerRecommendations;
