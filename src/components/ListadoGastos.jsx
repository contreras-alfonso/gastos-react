import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({gastos,setGastoEditar,eliminarGasto,filtro}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aún'}</h2>
        {gastos.map(gasto=>{

            if(filtro==='todos'){
              return(
                <Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}></Gasto>
            )
            }

            if(gasto.categoria===filtro){
              return(
                <Gasto key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}></Gasto>
            )
            }
        })}
    </div>
  )
}

export default ListadoGastos