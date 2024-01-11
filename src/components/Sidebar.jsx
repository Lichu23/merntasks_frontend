import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"


const Sidebar = () => {

  const {auth} = useAuth()

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl text-gray-600">Hola: 
        <span className="font-bold"> {auth.nombre}</span></p>

        <Link 
            to="crear-proyecto"
            className="text-white bg-sky-600 w-full p-2 hover:bg-sky-500
                    uppercase font-bold block mt-5 text-center rounded-lg"
        >Nuevo Proyecto</Link>
    </aside>
  )
}

export default Sidebar