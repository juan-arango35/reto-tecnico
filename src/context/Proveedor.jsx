import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";


const Proveedor = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = (email, password) => {
        if (email === "admin@email.com" && password === "supersecret") {
          setIsAuthenticated(true);
          setUser({ email, name: "admin", role: "admin" });
          localStorage.setItem("token", "dummy-token");
        } else {
          alert("Credenciales invalidas");
        }
      };

      const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("token");//limpiar el localstorage
      };

      useEffect(() => {
        const storaged = localStorage.getItem("token");
        if(storaged){
         setIsAuthenticated(true);
         setUser({ email: "admin@email.com", name: "admin", role: "admin" });
        }
       }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        {children}

    </AuthContext.Provider>
  )
}

export default Proveedor