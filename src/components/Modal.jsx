import { useState, useEffect } from "react"
import cerrarBtn from "../img/cerrar.svg"

const Modal = ({
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    gastos,
    setGastos,
    setGastoEditar,
}) => {

    const [nombre,setNombre] = useState('');
    const [cantidad,setCantidad] = useState('');
    const [categoria,setCategoria] = useState('');

    useEffect(()=>{
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
        }
    },[])

    const swalAlerta = (mensaje,tipo) => {
        Swal.fire({
            position: 'center',
            icon: `${tipo}`,
            title: `${mensaje}`,
            showConfirmButton: false,
            iconColor:  '#3b82f6',
            timer: 2000
          })
    }

    const ocultarModal = () => {
        setAnimarModal(false);
        setTimeout(() => {
            setModal(false);
        }, 400);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if([nombre,cantidad,categoria].includes('')){
            swalAlerta('Todos los campos son obligatorios.','error')
            return;
        }

        const objetoGasto = {
            nombre,
            cantidad,
            categoria,
        }

        if(gastoEditar.id){
            console.log('Editando....');
            objetoGasto.fecha = gastoEditar.fecha;
            objetoGasto.id = gastoEditar.id;
            const listaActualizada = gastos.map(e=>{return e.id === gastoEditar.id ? objetoGasto : e});
            setGastos(listaActualizada);
            console.log(gastos);
            setGastoEditar({});
        }else{
            objetoGasto.id = crypto.randomUUID(),
            guardarGasto(objetoGasto);
            console.log('Guardando...')
        }

        setModal(false);
        setAnimarModal(false);
    }
    



  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal}/>
        </div>
        <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : ''}`}>
            <legend>{gastoEditar.id ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input type="text" id="nombre" placeholder="Añade el nombre del Gasto" value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" id="cantidad" placeholder="ejm. 500" value={cantidad} onChange={(e)=>setCantidad(Number(e.target.value))}/>
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoría</label>
                <select name="" id="categoria" value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">suscripciones</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.id ? 'Guardar Cambios' : 'Añadir Gasto'}/>
                        
        </form>
    </div>
  )
}

export default Modal