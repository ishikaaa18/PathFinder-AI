// src/features/career/career.service.js
export const getCareerRecommendations = async () => {
  // Mock API response
  return [
    {
      id: 1,
      title: "Data Scientist",
      description: "Analyze data to uncover insights and drive decisions.",
      field: "AI & Data",
    },
    {
      id: 2,
      title: "Frontend Developer",
      description: "Build interactive and responsive web applications.",
      field: "Web Development",
    },
    {
      id: 3,
      title: "UX Designer",
      description: "Design user-friendly and engaging interfaces.",
      field: "Design",
    },
  ];
};
