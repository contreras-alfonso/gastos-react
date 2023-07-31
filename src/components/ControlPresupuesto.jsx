import { useState, useEffect } from "react"
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto,setPresupuesto,gastos,setGastos,setIsValidPresupuesto}) => {

    const [porcentaje,setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(()=>{
        const TotalGastado = gastos.reduce((total,gasto)=> gasto.cantidad + total,0)
        const totalDisponible = presupuesto-TotalGastado
        //calcular el porcentaje gastado

        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2);

        setPorcentaje(nuevoPorcentaje);
        setGastado(TotalGastado);
        setDisponible(totalDisponible)
    },[gastos])

    const convertirCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'USD',
        })
    }

    const handleResetApp = ()=>{
        setGastos([]);
        setPresupuesto(0);
        setIsValidPresupuesto(false);

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
                pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            })}
            ></CircularProgressbar>
        </div>
        <div className="contenido-presupuesto">

            <button className="reset-app" type="button" onClick={handleResetApp}>
                Resetear App
            </button>

            <p>
                <span>Presupuesto:</span> {convertirCantidad(presupuesto)}
            </p>

            <p className={disponible<0 ? 'negativo' : ''}>
                <span>Disponible:</span> {convertirCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span> {convertirCantidad(gastado)}
            </p>

        </div>
    </div>
  )
}

export default ControlPresupuesto