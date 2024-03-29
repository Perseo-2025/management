import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import useAuth from "../hooks/useAuth"


export default function OlvidePassword() {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})

  const {auth} = useAuth()
  console.log(auth)

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6){
      setAlerta({msg: 'El Email es Obligatorio', error: true});
      return
    }

    try{
      const {data} = await clienteAxios.post('/veterinarios/olvide-password', {email})

      console.log(data)

      setAlerta({msg: data.msg})
    }catch(error){
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta 

  return (
    <>
      
      <div>
          <h1 className="text-indigo-600 font-black text-6xl">
            Recupera el Acceso y no Pierdas {""}
          <span className="text-black"> tus  Pacientes</span>
          </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        {msg && <Alerta
          alerta={alerta}
        />}
        
        <form
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input type="email" id="email" placeholder="Email de Registro" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            value={email}
            onChange={e => setEmail(e.target.value)}
            />
          </div>

          <input 
              type="submit" 
              value="Enviar instrucciones"
              className="bg-indigo-700 rounded-xl py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link to="/" className="block text-center my-5 text-gray-500">¿Ya tienes una cuenta?  Inicia Sesión</Link>
          <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta?  Regístrate</Link>
        </nav>
      </div>
    </>
  )
}
