export const mockLogin=(email, password)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            if(email === "admin@email.com" && password === "supersecret"){
                resolve({
                    ok:true,
                    data:{
                        email:"admin@email.com",
                        mane:"Sr. Admin",
                        role:"admin",
                        token:"dummy-token",

                    }
                })
            }else{
                reject(new Error("Credenciales invalidas"))
            }
        }, 1000)
    })
}

export const uploadCsv = (file) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!file) {
          reject(new Error("No file selected"));
          return;
        }
        resolve({
          ok: true,
          data: {
            success: [
              { id: 1, name: "Juan Perez", email: "juan.perez@example.com", age: 28 },
              { id: 2, name: "Maria Garcia", email: "maria.garcia@example.com", age: 35 },
            ],
            errors: [
              {
                row: 4,
                details: {
                  name: "El campo 'name' no puede estar vacío.",
                  email: "El formato del campo 'email' es inválido.",
                  age: "El campo 'age' debe ser un número positivo.",
                }
              }
            ]
          }
        });
      }, 2000);  // Simula un retraso de 2 segundos en la respuesta
    });
  };