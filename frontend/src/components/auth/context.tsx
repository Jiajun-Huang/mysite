import { User } from "@/types/";
import React, { createContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  login: (token: string | null) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: null,
  login: (token) => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    console.log("Logged out");
    setUser(null);
  };

  const login = (token: string | null) => {
    console.log("Token:", token);
    if (!token) return;
    localStorage.setItem("token", token);
    setToken(token);
  };

  useEffect(() => {
    // get user data
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      fetch("/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          // alert("Something went wrong, please log in again" + error);
        });
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
