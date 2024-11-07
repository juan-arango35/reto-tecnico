import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { uploadCsv } from "../../services/api";
import Papa from "papaparse";
import ResultDisplay from "../../components/csvUploader/ResultDisplay";
import ErrorCorrection from "../../components/csvUploader/ErrorCorrection";

const Principal = () => {
  const [file, setFile] = useState(null); // estado para el archivo
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
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  //validar datos de csv
  const validateData = (data) => {
    const errors = [];
    data.forEach((row, index)=>{
      const rowErrors = {};
      if(!row.name) rowErrors.name = "El campo 'name' no puede estar vacío.";
      if (!/^\S+@\S+\.\S+$/.test(row.email)) rowErrors.email = "El formato del campo 'email' es inválido.";
      if (isNaN(row.age) || row.age <= 0) rowErrors.age = "El campo 'age' debe ser un número positivo.";
      if (Object.keys(rowErrors).length > 0) {
        errors.push({ row: index + 2, details: rowErrors });
      }

    })
    return errors;
  }

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
    /*  try {
      const response = await uploadCsv(file);
      setSuccessRecords(response.data.success);
      setErrorRecords(response.data.errors);
      console.log(response);
    } catch (error) {
      setError("Error al cargar el archivo :", error.message);
    } finally {
      setIsLoading(false); // finalizamos la carga
    } */

    Papa.parse(file, {
      complete: (result) => {
        const records = result.data; // obtenemos los datos procesados del archivovo
        const validRecords = []; //arreglo para almacenar los registros validos
        const errorList = []; //arreglo para almacenar los registros erroneos
        //iteramos sobre acda registro dela rchvo para validarlos

        records.forEach((record, index) => {
          if (record.name && record.email && record.age) {
            validRecords.push(record);
          } else {
            errorList.push({
              index,
              record,
              error: "Faltan los campos requeridos"});
          }
        });
        setSuccessRecords(validRecords);
        setErrorRecords(errorList);
      },
      error:(err)=>{
        setError("Error al cargar el archivo :", err.message);
      }
    });
    setIsLoading(false);
  };
  return (
    <div>
      <h1 className="bg-red-500">pagina donde se hara la descargas</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".csv" onChange={handleFileChange} />{" "}
        {/* //para
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
