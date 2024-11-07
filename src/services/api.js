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
                       token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"

                    }
                })
            }else{
                reject(new Error("Credenciales invalidas"))
            }
        }, 1000)
    })
}

