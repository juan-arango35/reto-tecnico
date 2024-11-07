import React, { useState } from 'react'

const ErrorCorrection = ({errorRecords}) => {
    const [updateErrors, setUpdateErrors] = useState(errorRecords) //estado para manejar los errores

    // funcion para manejar la correcion de errores
    const handleRetry = ( index)=>{
        const newErrors = [...updateErrors];
        newErrors[index].details = {};
        setUpdateErrors(newErrors);
    }

  return (
    <div>
        <h2>Error de la carga</h2>
        {
            updateErrors.length > 0 ? (
                <ul>
                {updateErrors.map((error, index) => (
                  <li key={index}> {/* Agregamos la clave para mejorar el rendimiento */}
                    <p>{`Fila: ${error.row}`}</p> {/* Mostramos la fila donde ocurrió el error */}
                    <ul>
                      {/* Verificamos que error.details no sea null ni undefined antes de iterar */}
                      {error.details && Object.entries(error.details).length > 0 ? (
                        Object.entries(error.details).map(([field, message], i) => (
                          <li key={i}>  {/* Agregamos la clave para cada error */}
                            <strong>{field}</strong>: {message}
                          </li>
                        ))
                      ) : (
                        <li>No hay detalles disponibles.</li>
                      )}
                    </ul>
                    <button onClick={() => handleRetry(index)}>Reintentar</button>
                  </li>
                ))}
              </ul>
            ):(
                <p>No hay errores por corregir.</p>
            )
        }
    </div>
  )
}

export default ErrorCorrection