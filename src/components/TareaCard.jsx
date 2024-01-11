import { formatearFecha } from "../helpers/formatearFecha"
import useProyectos from "../hooks/useProyectos"
import useAdmin from "../hooks/useAdmin"

const CrearTarea = ({tarea}) => {

    const {handleModalEditarTarea, handleModalEliminarTarea, completarTarea} = useProyectos()

    const {nombre, descripcion, prioridad, fechaEntrega, _id, estado} = tarea

    const admin = useAdmin()

  return (
    <div className="border-b p-5 flex 
         justify-between items-center">

            <div className="flex flex-col items-start">
                <p className="mb-2 text-2xl font-bold">{nombre}</p>
                <p className="mb-2 text-xl text-gray-500 uppercase">{descripcion}</p>
                <p className="mb-2 text-l uppercase font-bold">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-2 text-gray-600">Prioridad:{prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase 
                text-white p-1 rounded-lg">Completada por: {tarea.completado.nombre}</p>}
            </div>

        <div className="flex flex-col lg:flex-row gap-2">
        {admin && (
                    <button 
                        onClick={() => handleModalEditarTarea(tarea)}                    
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">
                        Editar
                    </button>
                )}


                <button 
                className={`${estado ? "bg-green-600" : "bg-gray-400" }  px-4 py-3 text-white uppercase 
                font-bold text-sm rounded-lg`}
                onClick={() => completarTarea(_id)}
            >
                {estado ? "Completa" : "Incompleta" }</button>

            {admin && (
                <button 
                    className="bg-red-800 px-4 py-3 text-white uppercase
                        font-bold text-sm rounded-lg"
                        onClick={() => handleModalEliminarTarea(tarea)}
                >Eliminar</button>
            )}
            
        </div>
    </div>
  )
}

export default CrearTarea