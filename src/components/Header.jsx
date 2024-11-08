import { Link } from "react-router-dom";
import { BsFiletypeCsv } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { logout, isAuthenticated} = useContext(AuthContext);
  return (
    <div className="flex justify-end items-center gap-5 mr-3 bg-sky-400 w-full pr-4 h-12">
      <div className="ml-6">
        <BsFiletypeCsv className="text-3xl" />
      </div>
      <ul className="flex justify-end items-center gap-5 mr-3 pr-4 w-full">
       
      {isAuthenticated && (
            <li>
              <Link to="/" className="hover:text-blue-200">Carga tu Archivo</Link>
            </li>
          )}
      {
        !isAuthenticated && (

        <li>
          <Link to="/login">Inicia Sesión</Link>
        </li>
        )
      }
        <li>
          <Link to="/api/upload">VRC</Link>
        </li>
        <li>
          <Link to="/api/login">VRL</Link>
        </li>
        <li>
          <button onClick={() => logout()}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
