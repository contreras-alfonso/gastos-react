import React from 'react'
import { useState } from 'react';

const NuevoPresupuesto = ({presupuesto,setPresupuesto,setIsValidPresupuesto}) => {

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

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if(!(presupuesto) || (presupuesto)<0){
            swalAlerta('Ingrese un presupuesto válido.','error');
            return;
        }
        setIsValidPresupuesto(true);
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="number" 
                    className='nuevo-presupuesto'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto} 
                    onChange={(e)=>{setPresupuesto(Number(e.target.value))}}
                />
                <input 
                    type="submit"
                    value="Añadir" 
                />
            </div>
        </form>
    </div>
  )
}

export default NuevoPresupuesto