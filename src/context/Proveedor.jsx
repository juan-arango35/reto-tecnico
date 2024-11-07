import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { mockLogin } from "../services/api";

const Proveedor = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await mockLogin(email, password);
      console.log(response)
      if (response.ok) {
        setIsAuthenticated(true);

        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
   
    localStorage.removeItem("token"); //limpiar el localstorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Proveedor;
