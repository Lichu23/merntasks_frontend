import {useState} from "react"
import { Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"


const OlvidePassword = () => {

  const [email, setEmail] = useState("")
  const [alerta, setAlerta] = useState({})
  const handleSubmit = async e => {
    e.preventDefault()

    if(email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error:true,
      })
      return
    }

      try {
        const {data} = await clienteAxios.post(`usuarios/olvide-password`,{email})

        setAlerta({
          msg: data.msg,
          error: false
        })

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
        Recupera Tu
         Acceso Y No Pierdas Tus<span className="text-slate-800"> Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}      

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

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-800 text-white mb-5 w-full p-2 rounded
           font-bold uppercase hover:cursor-pointer hover:bg-sky-700 transition-colors"
        />

      </form>

      <nav className="lg:flex lg:justify-between">
      
        <Link
        className="block text-center my-5 text-sky-500 text-sm" 
            to="/"
        >
        ¿Ya Tienes Una Cuenta?  Inicia Sesion
        </Link>
      

        <Link
        className="block text-center my-5 text-sky-500 text-sm" 
            to="/registrar"
        >
        ¿No Tienes Una Cuenta? Registrate 
        </Link>
      </nav>
    </>
  )
}

export default OlvidePassword