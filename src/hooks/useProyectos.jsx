import { useContext } from "react";

import ProyectosContext from "../context/ProyectosProvider";

const useProyectos = ( ) => {
    return useContext(ProyectosContext) //te permite acceder a ese state o las funciones
}

export default useProyectos