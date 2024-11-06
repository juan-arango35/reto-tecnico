// src/api/upload.js
export const uploadCSV = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          data: {
            success: [
              { id: 1, name: "Juan Perez", email: "juan.perez@example.com", age: 28 },
        
            ],
            errors: [
              {
                row: 4,
                details: {
                  name: "El campo 'name' no puede estar vacío.",
                  email: "El formato del campo 'email' es inválido.",
                  age: "El campo 'age' debe ser un número positivo.",
                },
              },
              // Otros registros con errores...
            ],
          },
        });
      }, 1000); // Simula un retardo de 1 segundo
    });
  };
  