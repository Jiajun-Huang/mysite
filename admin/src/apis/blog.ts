import { getCookie } from "../utils/cookies";

interface BlogData {
  id: number;
  title: string;
  views: number;
  likes: number;
  created_at: string;
}

export const fetchDashboardStats = async () => {
  const response = await fetch("/api/blog/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const blogs: BlogData[] = await response.json();
  
  const tagsResponse = await fetch("/api/tag/");
  const tags = await tagsResponse.json();
  
  const categoriesResponse = await fetch("/api/category/");
  const categories = await categoriesResponse.json();
  
  return {
    totalBlogs: blogs.length,
    totalTags: tags.length,
    totalCategories: categories.length,
    totalViews: blogs.reduce((sum: number, blog: BlogData) => sum + blog.views, 0),
    totalLikes: blogs.reduce((sum: number, blog: BlogData) => sum + blog.likes, 0),
    recentBlogs: blogs.slice(0, 5),
  };
};

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

export const createTag = async (name: string) => {
  const token = getCookie("accessToken");
  const response = await fetch("/api/tag/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create tag");
  }
  return response.json();
};

export const updateTag = async (id: number, name: string) => {
  const token = getCookie("accessToken");
  const response = await fetch(`/api/tag/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to update tag");
  }
  return response.json();
};

export const deleteTag = async (id: number) => {
  const token = getCookie("accessToken");
  const response = await fetch(`/api/tag/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete tag");
  }
};

export const createCategory = async (name: string) => {
  const token = getCookie("accessToken");
  const response = await fetch("/api/category/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create category");
  }
  return response.json();
};

export const updateCategory = async (id: number, name: string) => {
  const token = getCookie("accessToken");
  const response = await fetch(`/api/category/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to update category");
  }
  return response.json();
};

export const deleteCategory = async (id: number) => {
  const token = getCookie("accessToken");
  const response = await fetch(`/api/category/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
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
