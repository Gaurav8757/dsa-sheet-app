import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      // Set default axios header
      axios.defaults.headers.common["Authorization"] = `Bearer ${
        JSON.parse(userInfo).token
      }`;
    }
    setLoading(false);

    // Add a response interceptor to handle invalid/expired token from backend
    const resInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        const resp = error.response;
        // If backend returns 401 with specific token-failed message, force logout and redirect to login
        if (
          resp &&
          resp.status === 401 &&
          resp.data &&
          typeof resp.data.message === "string" &&
          resp.data.message.toLowerCase().includes("token failed")
        ) {
          // clear stored user info and axios header
          localStorage.removeItem("userInfo");
          delete axios.defaults.headers.common["Authorization"];
          setUser(null);
          // navigate to login page by changing location (AuthProvider is outside Router)
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // eject interceptor on unmount
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem("userInfo", JSON.stringify(userData));
    axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
