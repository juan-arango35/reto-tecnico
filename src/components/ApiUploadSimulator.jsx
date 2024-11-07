import React, { useEffect, useState } from 'react'

const ApiUploadSimulator = () => {
    const [apiResponse, setApiResponse] = useState(null);//estado para la respuesta simulada
    useEffect(() => {
    //simulamos la aobtencion de datos del almacenamiento local
    const storeData = localStorage.getItem("csvUploadResult")
    if(storeData){
        const parsedData = JSON.parse(storeData)
        setApiResponse({
            ok: true,
            data: parsedData
        })
    } else {
        setApiResponse({
            ok: false,
            error:"No se han cargado los datos csv aún"
        })
    }
    }, [])

  return (
    <div>
        <h2>Simulacion de la respuesta /api/upload</h2>
        <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
    </div>
  )
}

export default ApiUploadSimulator