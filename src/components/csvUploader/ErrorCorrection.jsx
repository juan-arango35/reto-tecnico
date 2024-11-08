import React, { useState } from "react";

const ErrorCorrection = ({ errorRecords,handleRetry }) => {
  const [editRecord, setEditRecord] = useState(errorRecords)

  const handleInputChange=(rowIndex, field, value)=>{
    const newEditRecord=[...editRecord]
    newEditRecord[rowIndex].details[field]=value
    setEditRecord(newEditRecord)
  }

  const hamdleRetryFn=(rowIndex)=>{
    const correctedRecord = editRecord[rowIndex];
    handleRetry(correctedRecord, rowIndex)
  }

  return (
    <div>
    {editRecord.length > 0 && (
      <div>
        <h2 className="text-xl font-bold mb-4">Registros erróneos: {editRecord.length}</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Fila</th>
              <th className="border border-gray-300 px-4 py-2">Campo</th>
              <th className="border border-gray-300 px-4 py-2">Mensaje de Error</th>
              <th className="border border-gray-300 px-4 py-2">Corrección</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {editRecord.map((error, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {Object.entries(error.details).map(([field, message], i) => (
                  <tr key={`${rowIndex}-${i}`}>
                    {i === 0 && (
                      <td rowSpan={Object.keys(error.details).length} className="border border-gray-300 px-4 py-2 text-center">
                        {error.row}
                      </td>
                    )}
                    <td className="border border-gray-300 px-4 py-2">{field}</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600">{message}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border rounded"
                        value={error.details[field]}
                        onChange={(e) => handleInputChange(rowIndex, field, e.target.value)}
                      />
                    </td>
                    {i === 0 && (
                      <td rowSpan={Object.keys(error.details).length} className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleRetry(rowIndex)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Reintentar
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};

export default ErrorCorrection;
