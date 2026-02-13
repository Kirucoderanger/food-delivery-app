

import { useState } from "react";
import axios from "../api/api";

export const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", { email, password });
    const userData = res.data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    const User = JSON.parse(localStorage.getItem("user"));
    //const isAdmin = User.role === "admin";

    // ✅ Dispatch custom event so CartContext reloads
    window.dispatchEvent(new Event("userLoggedIn"));

    return userData;
  };

  const register = async (name, email, password) => {
    const res = await axios.post("/auth/register", { name, email, password });
    const userData = res.data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);

    // ✅ Dispatch custom event so CartContext reloads
    window.dispatchEvent(new Event("userLoggedIn"));

    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // ✅ Dispatch custom event so CartContext clears
    window.dispatchEvent(new Event("userLoggedOut"));
  };

  return { user, login, register, logout };
};
