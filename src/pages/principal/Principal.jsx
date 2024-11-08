import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Papa from "papaparse";
import ResultDisplay from "../../components/csvUploader/ResultDisplay";
import ErrorCorrection from "../../components/csvUploader/ErrorCorrection";

const Principal = () => {
  const [file, setFile] = useState(null); // estado para el archivo
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successRecords, setSuccessRecords] = useState([]); //estado para los reguistros exitosos
  const [errorRecords, setErrorRecords] = useState([]); //estado para los registros erroneos
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  //comprobamos si esta autenticado
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  //maneja ela cmabio de archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  //validar datos de csv
  const validateCsvData = (data) => {
    const errors = [];
    data.forEach((row, index) => {
      const rowErrors = {};
      if (!row.name) rowErrors.name = "El campo 'name' no puede estar vacío.";
      if (!/^\S+@\S+\.\S+$/.test(row.email))
        rowErrors.email = "El formato del campo 'email' es inválido.";
      if (isNaN(row.age) || row.age <= 0)
        rowErrors.age = "El campo 'age' debe ser un número positivo.";
      if (Object.keys(rowErrors).length > 0) {
        errors.push({ row: index + 2, details: rowErrors });
      }
    });
    return errors;
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
    setSuccessRecords([]); //limpiamos lo valores previos
    setErrorRecords([]); //limpiamos lo errores previos

    Papa.parse(file, {
      complete: (results) => {
        setIsLoading(false);
        const errors = validateCsvData(results.data);
        const successfulRecords = results.data
          .filter(
            (_, index) => !errors.some((error) => error.row === index + 2)
          )
          .map((record, index) => ({
            id: index + 1,
            ...record,
          }));

          setSuccessRecords(successfulRecords);
          setErrorRecords(errors);
          localStorage.setItem("csvUploadResult", JSON.stringify({
            success: successfulRecords,
            errors:errors
          }))
        },
      

      header: true,
      skipEmptyLines: true,
      error: (error) => {
        setIsLoading(false);
        setError("Error al procesar el archivo: " + error.message);
      },
    });
  };
  return (
    <div className="h-screen bg-yellow-200">
      <h1 className="bg-white h-36 flex justify-center items-center text-3xl">Sistema de Carga de Datos</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !file}
          className={`px-4 py-2 font-bold text-white rounded ${
            isLoading || !file
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Procesando..." : "Cargar CSV"}
        </button>
      </form>

      {/*   mostrar los errores si existen */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {(setSuccessRecords.length > 0 || errorRecords.length > 0) && (
        <div>
         
          <ResultDisplay successRecords={successRecords} />
          <ErrorCorrection errorRecords={errorRecords} />
        </div>
      )}

    
    </div>
  );
};

export default Principal;
