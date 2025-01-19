export const fetchTags = async () => {
  const response = await fetch("api/tag/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("api/category/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
