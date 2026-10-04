import { useState, useEffect, createContext } from "react";
import api from "../utils/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //Get User from localstorage or Token
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //Register Or Signup

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data);
      console.log("registeration Successfull");
      return data;
    } catch (err) {
      console.log("registeration error:", err.response?.data);
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      setUser(data);
      console.log("login successfull");
      return data;
    } catch (err) {
      console.log("Login Error: ", err);
    }
  };

  // Update Password
  const updatePassword = async (
    newPassword,
    currentPassword,
    confirmPassword,
  ) => {
    try {
      const { data } = await api.put(`/auth/updatepassword/${user.id}`, {
        newPassword,
        currentPassword,
        confirmPassword,
      });
      console.log("data updated");
      return data;
    } catch (err) {
      console.log("password Updation error", err.response?.data);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };
  const DeleteAccount = async (currentPassword) => {
    try {
      const { data } = await api.delete(`/auth/deleteaccount/${user.id}`, {
        data: {
          currentPassword,
        },
      });
      console.log("Deletion Successfull");
      // Remove login data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Remove user from AuthContext
      setUser(null);

      return data;
    } catch (err) {
      console.log("Deletion account Error: ", err.response?.data);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, register, login, updatePassword, logout, DeleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
