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
                    {updateErrors.map((error, index)=>(
                        <li>
                            <p>{`Fila : ${error.row}`}</p>
                            <ul>
                                {
                                    Object.entries(error.details).map(([field, message], i)=>( <li>
                                        <strong>{field}</strong> : {message}
                                    </li>))
                                }
                            </ul>
                            <button onClick={()=>handleRetry(index)}>Reintentar</button>
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