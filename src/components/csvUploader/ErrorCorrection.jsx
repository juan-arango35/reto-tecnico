import React, { useState } from "react";

const ErrorCorrection = ({ errorRecords }) => {
  return (
    <div>
      <h2>Registros erroneos:</h2>
      {errorRecords.length === 0 ? (
        <p>No se encontraron errores</p>
      ) : (
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
      )}
    </div>
  );
};

export default ErrorCorrection;
