import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import ResultDisplay from "../../components/csvUploader/ResultDisplay";
import ErrorCorrection from "../../components/csvUploader/ErrorCorrection"; // Add this import

const Principal = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successRecords, setSuccessRecords] = useState([]);
  const [errorRecords, setErrorRecords] = useState([]);
  const { isAuthenticated, showForm, hiddenForm, showFormFn } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      const saveState = JSON.parse(
        sessionStorage.getItem("estadoComponentePrincipal")
      );
      console.log(saveState);
      if (saveState) {
        setSuccessRecords(saveState.successRecords);
        setErrorRecords(saveState.errorRecords);
      }
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const stateToSave = {
      successRecords,
      errorRecords,
    };
    sessionStorage.setItem(
      "estadoComponentePrincipal",
      JSON.stringify(stateToSave)
    );
    // Actualizar localStorage para ApiUploadSimulator
    localStorage.setItem(
      "csvUploadResult",
      JSON.stringify({
        success: successRecords,
        errors: errorRecords,
      })
    );
  }, [successRecords, errorRecords]);

  const clearRecords = () => {
    setSuccessRecords([]);
    setErrorRecords([]);
    sessionStorage.removeItem("estadoComponentePrincipal");
    localStorage.removeItem("csvUploadResult");
  };

  const handleRetry = (correctedRecord, rowIndex) => {
    const errors = validateCsvData([correctedRecord]);
    if (errors.length === 0) {
      setSuccessRecords((prev) => {
        const newSuccessRecords = [...prev, correctedRecord];
        const newErrorRecords = errorRecords.filter(
          (_, index) => index !== rowIndex
        );

        // Actualizar localStorage
        localStorage.setItem(
          "csvUploadResult",
          JSON.stringify({
            success: newSuccessRecords,
            errors: newErrorRecords,
          })
        );

        return newSuccessRecords;
      });
      setErrorRecords((prev) => prev.filter((_, index) => index !== rowIndex));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Por favor, selecciona un archivo CSV");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessRecords([]);
    setErrorRecords([]);

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
        localStorage.setItem(
          "csvUploadResult",
          JSON.stringify({
            success: successfulRecords,
            errors: errors,
          })
        );
        hiddenForm(); // Hide the form after loading
      },
      header: true,
      skipEmptyLines: true,
      error: (error) => {
        setIsLoading(false);
        setError("Error al procesar el archivo: " + error.message);
      },
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="min-h-screen bg-white p-4">
        <h1 className="bg-white h-36 flex justify-center items-center text-3xl mb-6">
          Sistema de Carga de Datos
        </h1>
        <hr className="mb-6" />

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-white p-4 rounded-lg shadow-md"
          >
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
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {(successRecords.length > 0 || errorRecords.length > 0) && (
          <div className="flex justify-center flex-col items-center">
            <ResultDisplay
              successRecords={successRecords}
              clearRecords={clearRecords}
              showFormFn={showFormFn}
            />
            <ErrorCorrection
              errorRecords={errorRecords}
              handleRetry={handleRetry}
            />
          </div>
        )}

        {!showForm &&
          successRecords.length === 0 &&
          errorRecords.length === 0 && (
            <button
              onClick={showFormFn}
              className="px-4 py-2 font-bold text-white rounded bg-blue-500 hover:bg-blue-700"
            >
              Cargar nuevo archivo
            </button>
          )}
      </div>
    </div>
  );
};

export default Principal;
