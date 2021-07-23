import PatientList from "./PatientList";
import useFetch from "./useFetch";
import React , {useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Pagination2 from "./Pagination";



const Pacientes = () => {
  const {data : patients, isPending , error} =useFetch('/list_patients');

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 7;

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    setActive(pageNumber);
  }

  const [active, setActive] = useState(1);
  
  const handleNext = () => {
    const totalDate = patients.patients.length;
    if (currentPage !== Math.ceil(totalDate / patientsPerPage)){
      setCurrentPage(currentPage + 1);
      setActive(active + 1);
    }
  }

  const handlePrevious = () => {
    if (currentPage !== 1){
      setCurrentPage(currentPage - 1);
      setActive(active - 1);
    }
  }
  
  return (
    <div>
        {error && <div>{ error }</div>}
        {isPending && <div>A carregar os pacientes</div> }
        {patients && <PatientList patients =  {patients.patients.slice(indexOfFirstPatient,indexOfLastPatient)} title="Pacientes" />}
        {patients && <Pagination > <Pagination.Prev onClick={handlePrevious}/> <Pagination2 dataPerPage={patientsPerPage} totalData={patients.patients.length} paginate={paginate} active={active} /> <Pagination.Next onClick={handleNext}/> </Pagination> } 
    </div>
  );
}
 
export default Pacientes;