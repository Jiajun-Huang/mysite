import React, { createContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser1] = useState<User | null>(null);
  const [token, setToken1] = useState<string | null>(null);

  const setUser = (user: User | null) => {
    if (!user) {
      setToken1(null);
    }
  };

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken1(token);
  };

  useEffect(() => {
    // get user data
    const token = localStorage.getItem("token");
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
          } else {
            alert("Something went wrong, please log in again");
          }
        })
        .then((data) => {
          setUser1(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Something went wrong, please log in again" + error);
        });
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
