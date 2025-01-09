import axios from 'axios'
import { useEffect, useState } from 'react'
import { createContext } from 'react'

const AuthContext = createContext()

    const [auth, setAuth] = useState({})

    const perfil = async (token) => {
        try {
            const url = `http://localhost:3000/api/perfil`
            const options = {
                Headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            setAuth(respuesta.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token){
            perfil(token)
        }
    }, [])
    
const AuthProvider = ({children}) => {
    return <AuthContext.Provider value={
        {
            auth, setAuth
        }
    }/>
}

export{
    AuthProvider
}

export default AuthContext