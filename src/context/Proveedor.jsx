import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { mockLogin } from "../services/api";

const Proveedor = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Aquí podrías hacer una llamada a la API para obtener los datos del usuario
      // Por ahora, simularemos que tenemos los datos
      setUser({
        email: "admin@mail.com",
        name: "Mr. Admin",
        role: "admin",
      });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await mockLogin(email, password);
      if (response.ok) {
        setIsAuthenticated(true);
        setUser(response.data);
        localStorage.setItem("token", response.data.token);
        return true;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login,user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Proveedor;
