import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Principal = () => {
  const {logout} = useContext(AuthContext);
  return (
    <div>
      <h1 className="bg-red-500">pagina donde se hara la descargas</h1>
      <p>
        Easta la ruta donde se hacen las descargas y solo cuando es admin se
        muestra, ademas necesita un permiso
      </p>
      <button onClick={()=>logout()}>logout</button>
    </div>
  );
};

export default Principal;
