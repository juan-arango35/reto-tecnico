import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isAuthenticated} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    
    if(isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="flex  flex-col  justify-center items-center h-screen bg-slate-400">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h1>Iniciar Sesión</h1>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <label htmlFor="email"> Correo Electrónico</label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <label htmlFor="password">Contraseña</label>

        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
