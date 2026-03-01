import React, { createContext, useContext, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../utils/cookies";

// Define types for user and login response
interface User {
  pk: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
}

interface AuthContextType {
  accessToken: string | null;
  userInfo: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  getUserInfo: () => Promise<User | null>;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    // Initialize from cookie on mount
    return getCookie("accessToken") || null;
  });
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const login = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Login failed:", errorData);
        return false;
      }

      const data: LoginResponse = await response.json();
      setAccessToken(data.access);
      setUserInfo(data.user);
      setCookie("accessToken", data.access, 7); // 7 days expiry
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUserInfo(null);
    removeCookie("accessToken");
  };

  const getUserInfo = async (): Promise<User | null> => {
    if (userInfo) return userInfo;

    const storedToken = accessToken || getCookie("accessToken");
    if (!storedToken) return null;

    try {
      const response = await fetch("/api/auth/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        const data: User = await response.json();
        setUserInfo(data);
        setAccessToken(storedToken);
        return data;
      } else {
        // Token is invalid, clear it
        logout();
        return null;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, userInfo, login, logout, getUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Usage Example
/*
import { AuthProvider, useAuth } from './AuthProvider';

function App() {
  return (
    <AuthProvider>
      <YourApp />
    </AuthProvider>
  );
}

function YourComponent() {
  const { login, logout, userInfo } = useAuth();

  const handleLogin = async () => {
    const success = await login('admin', 'password123');
    if (success) {
      console.log('Logged in as:', userInfo);
    } else {
      console.error('Login failed');
    }
  };

  const handleLogout = () => {
    logout();
    console.log('Logged out');
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
*/
