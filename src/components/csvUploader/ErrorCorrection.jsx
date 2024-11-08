import React from "react";

const ErrorCorrection = ({ errorRecords }) => {
  return (
    <div>
    {errorRecords.length > 0 && (
      <div>
        <h2>Registros erróneos: {errorRecords.length}</h2>
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Fila</th>
              <th className="border border-gray-300 px-4 py-2">Campo</th>
              <th className="border border-gray-300 px-4 py-2">Mensaje de Error</th>
              <th className="border border-gray-300 px-4 py-2">Corrección</th>
            </tr>
          </thead>
          <tbody>
            {errorRecords.map((error, index) => (
              <React.Fragment key={index}>
                {Object.entries(error.details).map(([field, message], i) => (
                  <tr key={`${index}-${i}`}>
                    <td className="border border-gray-300 px-4 py-2 text-center">{error.row}</td>
                    <td className="border border-gray-300 px-4 py-2">{field}</td>
                    <td className="border border-gray-300 px-4 py-2 text-red-600">{message}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        className="w-full px-2 py-1 border rounded"
                        value={error.details[field]}
                        onChange={(e) => {
                          const newErrorRecords = [...errorRecords];
                          newErrorRecords[index].details[field] = e.target.value;
                          setErrorRecords(newErrorRecords);
                        }}
                      />
                    </td>
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
