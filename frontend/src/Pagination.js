import React from 'react';
import Pagination from 'react-bootstrap/Pagination';



const Pagination2 = ({ dataPerPage, totalData, paginate, active }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(<Pagination.Item key={i} active={i === active} onClick={() => paginate(i)}>
      {i}
    </Pagination.Item>,);
  }

  return pageNumbers;
};

export default Pagination2;