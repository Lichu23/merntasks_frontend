import {useState} from "react"
import { Link } from "react-router-dom" 
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"


const Registrar = () => {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repetirPassword, setRepetirPassword] = useState("")
  const [alerta, setAlerta] = useState({})
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error:true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg:"Los password no son iguales",
        error:true
      })
      return
    }

    if(password.length < 6 ) {
      setAlerta({
        msg:"El password es muy corto, agrega minimo 6 caracteres",
        error:true
      })
      return
    }
    setAlerta({})

    //Crear el usuario en la Api
    
    try {
      const {data} = await clienteAxios.post(`/usuarios`, {nombre, 
            email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre("")
      setEmail(""),
      setPassword(""),
      setRepetirPassword("")
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
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea Tu Cuenta Y Administra Tus {" "}
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
                htmlFor="nombre">
            Nombre:
          </label>
          <input 
          id="nombre"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">

          <label 
                className="uppercase font-bold text-gray-600 block"
                htmlFor="email">
            Email:
          </label>
          <input 
          id="email"
            type="email"
            placeholder="correo@correo.com"
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

        <div className="my-5">

          <label 
                className="uppercase font-bold text-gray-600 block"
                htmlFor="password2">
            Repetir Password:
          </label>
          <input 
          id="password2"
            type="password"
            placeholder="Repetir Tu Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-800 text-white mb-5 w-full p-2 rounded
           font-bold uppercase hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />

      </form>

      <nav>
        <Link
        className="block text-center my-5 text-sky-500 text-sm" 
            to="/"
        >
        ¿Ya Tienes Una Cuenta?  Inicia Sesion
        </Link>
      </nav>
    </>
  )
}

export default Registrar