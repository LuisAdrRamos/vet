import { createContext, useState } from "react";
import axios from 'axios'

const TratamientosContext = createContext()

const TratamientosProvider = ({ children }) => {
    const [modal, setModal] = useState(false)

    const {tratamientos, setTratamientos} = useState([])

    const handleModal = () => {
        setModal(!modal);
    }

    const registrarTratamientos = async (datos) => {
        const token = localStorage.getItem("token")
        try {
            const url = `http://localhost:3000/api/tratamiento/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url,datos,options)
            setTratamientos([respuesta.data.tratamientos, ...tratamientos])
            
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <TratamientosContext.Provider value={
            {
                modal,
                setModal, 
                handleModal,
                tratamientos,
                setTratamientos,
                registrarTratamientos
            }
        }>
            {children}

        </TratamientosContext.Provider>
    )
}
export {
    TratamientosProvider
}

export default TratamientosContext