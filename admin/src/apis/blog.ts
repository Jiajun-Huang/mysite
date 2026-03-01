import { getCookie } from "../utils/cookies";

export const fetchTags = async () => {
  const response = await fetch("/api/tag/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch("/api/category/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const deleteBlog = async (id: string) => {
  const token = getCookie("accessToken");
  const response = await fetch(`/api/blog/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchBlogs = async () => {
  const response = await fetch("/api/blog/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchBlog = async (id: string) => {
  const response = await fetch(`/api/blog/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchBlogMarkdown = async (id: string) => {
  const response = await fetch(`/api/blog/file/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.text();
};

export const updateBlog = async (
  id: string,
  formData: FormData,
  token: string,
) => {
  const response = await fetch(`/api/blog/${id}/`, {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update blog");
  }
  return response.json();
};
