import { useState,useEffect } from 'react'
import Filtros from './components/Filtros';
import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos,setGastos] = useState([]);
  const [gastoEditar,setGastoEditar] = useState({});
  const [filtro,setFiltro] = useState('todos');

  useEffect(()=>{
    //obtener los state's
    const gastosLS = JSON.parse(localStorage.getItem('gastos')) ?? [];
    const presupuestoLS = JSON.parse(localStorage.getItem('presupuesto')) ?? 0;

    if(presupuestoLS>0){
      setIsValidPresupuesto(true);
    }

    setGastos(gastosLS);
    setPresupuesto(presupuestoLS);

  },[]);

  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos));
  },[gastos])

  useEffect(()=>{
    localStorage.setItem('presupuesto',JSON.stringify(presupuesto));
  },[presupuesto])


  const handleNuevoGasto = () => {
    setGastoEditar({})
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 400);
  }

  const eliminarGasto = (id) => {
    const listaActualizada = gastos.filter(e=>e.id !== id);
    setGastos(listaActualizada);
  }

  const guardarGasto = (gasto) => {
    gasto.fecha = Date.now();
    setGastos([...gastos,gasto]);
  }

  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 400);
    }
  },[gastoEditar])

  return (
    <>
      <div className={modal ? 'fijar' : ''}>
         <Header presupuesto={presupuesto} setPresupuesto={setPresupuesto} isValidPresupuesto={isValidPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto} gastos={gastos} setGastos={setGastos}></Header>

         {isValidPresupuesto && (
             <>
              <main>
                <Filtros filtro={filtro} setFiltro={setFiltro}></Filtros>


                <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro}></ListadoGastos>
              </main>
              <div className="nuevo-gasto">
                  <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
              </div>
            </>
         )}

         {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} gastos={gastos} setGastos={setGastos} setGastoEditar={setGastoEditar}></Modal>}

      </div>
    </>
  )
}

export default App
