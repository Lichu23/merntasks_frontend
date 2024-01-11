import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

 function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState({})

  const { setAuth} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes("")) {
      setAlerta({
        msg:"Todos los campos son obligatorios",
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post("/usuarios/login", 
      {email, password} )
      
      setAlerta({})

      localStorage.setItem("token", data.token)
      setAuth(data)
      navigate("/proyectos")
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
      <h1 className="text-sky-600 font-black text-6xl">
        Inicia Sesion Y Administra Tus 
        <span className="text-slate-800"> Proyectos </span>
      </h1>

      {alerta && <Alerta alerta={alerta}/>}

      <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
            >
        
        <div className="my-5">

          <label 
                className="uppercase font-bold text-gray-600 block"
                htmlFor="email">
            Email:
          </label>
          <input 
          id="email"
            type="email"
            placeholder="Ej: correo@correo.com"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">

          <label 
                className="uppercase font-bold text-gray-600 block"
                htmlFor="password">
            Password:
          </label>
          <input 
          id="password"
            type="password"
            placeholder="Escribir Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-800 text-white mb-5 w-full p-2 rounded
           font-bold uppercase hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
        className="block text-center my-5 text-sky-500 text-sm" 
            to="/registrar"
        >
        ¿No Tienes Una Cuenta? Registrate 
        </Link>

        <Link
        className="block text-center my-5 text-sky-500 text-sm"
            to="olvide-password"
        >
        Olvide Mi Password
        </Link>
      </nav>
    </>
  )
}
export default Login