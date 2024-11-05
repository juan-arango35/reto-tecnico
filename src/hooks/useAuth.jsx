import { useContext } from "react";
import AuthContext  from "../context/Proveedor";

const useAuth = () => {
    const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe de estar dentro de un AuthProvider");
  }
  return context;
};
export default useAuth;
