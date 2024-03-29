import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"
import clienteAxios from "../config/axios"

export default function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alerta, setAlerta] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([email, password].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            return
        }

        try {
            const { data } = await clienteAxios.post('/veterinarios/login', {email, password})
            localStorage.setItem('token', data.token)

            navigate('/admin')
        } catch (error) {
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
            <h1 className="text-indigo-600 font-black text-6xl">Iniciar Sesión y Administra tus 
            <span className="text-black"> pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        
        {msg && 
          <Alerta
            alerta={alerta}
          />
        }

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="text-gray-600 block text-xl font-bold mt-3">
                        Email
                    </label>
                    <input type="text" 
                        id="email"
                        placeholder="Tu email"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="text-gray-600 block text-xl font-bold mt-3">
                        Password
                    </label>
                    <input type="password" 
                        id="password"
                        placeholder="********"
                        className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-indigo-700 rounded-xl py-3 px-10 text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form>

            <nav className="mt-10 lg:flex lg:justify-between">
                <Link to="/registrar" className="block text-center my-5 text-gray-500">¿No tienes una cuenta?  Regístrate</Link>
                <Link to="/olvide-password" className="block text-center my-5 text-gray-500">Olvide mi Password</Link>
            </nav>
        </div>

    
    </>
  )
}
