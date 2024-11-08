import React from "react";

const ErrorCorrection = ({ errorRecords }) => {
  return (
    <div>
      {errorRecords.length > 0 &&(
        <div>
          <h2>Registros erroneos:</h2>

          <ul>
            {errorRecords.map((error, index) => (
              <li key={index}>
                Fila {error.row}:
                <ul>
                  {Object.entries(error.details).map(([filed, message]) => (
                    <li>
                      {filed}: {message}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ErrorCorrection;
