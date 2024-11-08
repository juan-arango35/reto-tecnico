import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null)
  const [isFormComplete, setIsFormComplete] = useState(false)
  const navigate = useNavigate();

  //funcion para ver que el formulario este lleno: useEffect(() => {
    useEffect(() => {
      setIsFormComplete(email.trim() !== "" && password.trim() !== "");
    }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const success = await login(email, password);
    if (success) {
      navigate("/");
    } else {
      setError("Credenciales inválidas");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex  flex-col  justify-center items-center h-screen bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 border-2 p-7  rounded-2xl">
        <h1 className="text-3xl text-center hover:text-sky-950">Iniciar Sesión</h1>
       
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          required
        />
        <label htmlFor="email" className="hover:text-sky-950"> Correo Electrónico</label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <label htmlFor="password" className="hover:text-sky-950">Contraseña</label>

        <button
        disabled={!isFormComplete}
        type="submit" className={`px-4 py-2 font-bold text-white rounded ${
            
            isFormComplete ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}>Iniciar Sesión</button>
      </form>
     {error && isFormComplete && (<p className="text-red-500 mt-5">{error}</p> )}
    </div>
  );
};

export default Login;
