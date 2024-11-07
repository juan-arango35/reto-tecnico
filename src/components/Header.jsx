import { Link } from "react-router-dom";

const Header = () => {
  return (
    <ul className="flex justify-end gap-5 mr-3">
      <li>
        <Link to="/">Carga tu Archivo</Link>
      </li>
      <li>
        <Link to="/login">Inicia Sesión</Link>
      </li>
      <li>
        <Link to="/api/upload" >
          Ver Respuesta API
        </Link>
      </li>
      <li>
        <Link to="/api/login" >
          Ver Respuesta login
        </Link>
      </li>
    </ul>
  );
};

export default Header;
