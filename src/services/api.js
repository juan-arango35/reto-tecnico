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

