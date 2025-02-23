import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Install: npm install jwt-decode
import { useNavigate } from "react-router-dom";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token); // ✅ Decode user info from token
        setUser(decodedUser);
      } catch (error) {
        console.error("❌ Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to use user data easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};