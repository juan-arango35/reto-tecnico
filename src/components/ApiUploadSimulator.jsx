import React, { useEffect, useState } from 'react'

const ApiUploadSimulator = () => {
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(() => {
        const updateApiResponse = () => {
            const storeData = localStorage.getItem("csvUploadResult");
            if (storeData) {
                const parsedData = JSON.parse(storeData);
                setApiResponse({
                    ok: true,
                    data: parsedData
                });
            } else {
                setApiResponse({
                    ok: false,
                    error: "No se han cargado los datos CSV aún"
                });
            }
        };

        // Actualizar la respuesta inicial
        updateApiResponse();

        // Escuchar cambios en el almacenamiento local
        window.addEventListener('storage', updateApiResponse);

        // Limpiar el evento listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('storage', updateApiResponse);
        };
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Simulación de la respuesta /api/upload</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
                {JSON.stringify(apiResponse, null, 2)}
            </pre>
        </div>
    )
}

export default ApiUploadSimulator