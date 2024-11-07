import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ApiLoginSimulator = () => {
  const { isAuthenticated, user } = useContext(AuthContext);

  const apiResponse = isAuthenticated
    ? {
        ok: true,
        data: {
          email: user.email,
          name: user.name,
          role: user.role,
          token: localStorage.getItem('token')
        }
      }
    : {
        ok: false,
        error: "No se ha iniciado sesión."
      };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Simulación de respuesta /api/login</h2>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
        {JSON.stringify(apiResponse, null, 2)}
      </pre>
    </div>
  );
};