import TestList from "./TestList";
import useFetch from "./useFetch";
import React , {useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Pagination2 from "./Pagination";


const Testes = () => {
  const {data : tests, isPending , error} =useFetch('/list_exams')
    
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 7;

  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const [active, setActive] = useState(1);

  const handleNext = () => {
    const totalDate = tests.exams.length
    if (currentPage !== Math.ceil(totalDate / testsPerPage)){
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
    <div >
        {error && <div>{ error }</div>}
        {isPending && <div>A carregar os testes</div> }
        {tests && <TestList tests =  {tests.exams.slice(indexOfFirstTest,indexOfLastTest)} title="Testes" />}
        {tests && <Pagination > <Pagination.Prev onClick={handlePrevious}/> <Pagination2 dataPerPage={testsPerPage} totalData={tests.exams.length} paginate={paginate} active={active}/> <Pagination.Next onClick={handleNext}/> </Pagination> } 
    </div>
  );
}
 
export default Testes;