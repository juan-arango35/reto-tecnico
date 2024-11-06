import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadCsv } from "../../services/api";
import ResultDisplay from "../../components/csvUploader/ResultDisplay";
import ErrorCorrection from "../../components/csvUploader/ErrorCorrection";
import { set } from "react-hook-form";

const Principal = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successRecords, setSuccessRecords] = useState([]); //estado para los reguistros exitosos
  const [errorRecords, setErrorRecords] = useState([]); //estado para los registros erroneos
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  //comprobamos si esta autenticado
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  //maneja ela cmabio de archivo
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("El archivo debe ser un CSV");
    }
  };

  //maneja el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecciona un archivo CSV");
      return; // si no hay un archvo no hacer nada
    }

    setIsLoading(true); // cargando
    setError(""); // no hay errores
    try {
      const response = await uploadCsv(file);
      setSuccessRecords(response.data.success);
      setErrorRecords(response.data.errors);
      console.log(response);
    } catch (error) {
      setError("Error al cargar el archivo :", error.message);
    } finally {
      setIsLoading(false); // finalizamos la carga
    }
  };
  return (
    <div>
      <h1 className="bg-red-500">pagina donde se hara la descargas</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} /> {/* //para
        selecionar archivos csv */}
        {file && <p>Archivo seleccionado: {file.name}</p>}{" "}
        {/* Muestra el nombre del archivo */}
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Muestra el error si existe */}
        <button type="submit" disabled={!file || isLoading}>
          {isLoading ? "Cargando..." : "Subir Archivo"}{" "}
          {/* Texto dependiendo del estado de carga */}
        </button>
      </form>

      {/*   mostrar los errores si existen */}
      {setSuccessRecords.length > 0 && (
        <ResultDisplay successRecords={successRecords} />
      )}
      {errorRecords.length > 0 && (
        <ErrorCorrection errorRecords={errorRecords} />
      )}

      {/* boton de salir de la session */}
      <button onClick={() => logout()}>logout</button>
    </div>
  );
};

export default Principal;
